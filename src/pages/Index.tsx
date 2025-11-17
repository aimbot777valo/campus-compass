import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "./Dashboard";
import { Chat } from "./Chat";
import { Marketplace } from "./Marketplace";
import Profile from "./Profile";
import Auth from "./Auth";
import Home from "./Home";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  currentUser,
  initialChatMessages,
  initialMarketplaceItems,
  initialQnaPosts,
  initialResources,
  initialHostels,
  initialAchievements,
  initialAnnouncements,
  ChatMessage,
  MarketplaceItem,
  QnaPost,
  Resource,
  Hostel,
  Achievement,
  Announcement,
} from "@/data/mockData";

const Index = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>('Student');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [qnaPosts, setQnaPosts] = useState<QnaPost[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  // Check authentication
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
        fetchUserProfile(session.user.id);
      } else {
        setIsAdmin(false);
        setUserName('Student');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize data from localStorage or use initial data
  useEffect(() => {
    const loadData = () => {
      const storedChat = localStorage.getItem('chatMessages');
      const storedMarketplace = localStorage.getItem('marketplaceItems');
      const storedQna = localStorage.getItem('qnaPosts');
      const storedResources = localStorage.getItem('resources');
      const storedHostels = localStorage.getItem('hostels');
      const storedAchievements = localStorage.getItem('achievements');
      const storedAnnouncements = localStorage.getItem('announcements');

      setChatMessages(storedChat ? JSON.parse(storedChat) : initialChatMessages);
      setMarketplaceItems(storedMarketplace ? JSON.parse(storedMarketplace) : initialMarketplaceItems);
      setQnaPosts(storedQna ? JSON.parse(storedQna) : initialQnaPosts);
      setResources(storedResources ? JSON.parse(storedResources) : initialResources);
      setHostels(storedHostels ? JSON.parse(storedHostels) : initialHostels);
      setAchievements(storedAchievements ? JSON.parse(storedAchievements) : initialAchievements);
      setAnnouncements(storedAnnouncements ? JSON.parse(storedAnnouncements) : initialAnnouncements);
    };

    loadData();
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('marketplaceItems', JSON.stringify(marketplaceItems));
  }, [marketplaceItems]);

  // Mock chat simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const mockMessages = [
          "Anyone free for coffee?",
          "Just finished my assignment!",
          "Looking for study partner for finals",
          "Great lecture today!",
          "Anyone going to the game tomorrow?",
        ];
        const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
        const randomUserId = `user${Math.floor(Math.random() * 10) + 1}`;
        
        const newMessage: ChatMessage = {
          id: `msg${Date.now()}`,
          userId: randomUserId,
          text: randomMessage,
          timestamp: Date.now(),
          reactions: {}
        };
        
        setChatMessages(prev => [...prev, newMessage]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', userId)
        .maybeSingle();

      if (data && !error) {
        setUserName(data.name);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      setIsAdmin(!!data && !error);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowAuth(false);
    setCurrentPage('dashboard');
    toast({
      title: "Logged out successfully",
    });
  };

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg${Date.now()}`,
      userId: currentUser.id,
      text,
      timestamp: Date.now(),
      reactions: {}
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  const handleReactToMessage = (messageId: string) => {
    setChatMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, reactions: { ...msg.reactions, like: (msg.reactions.like || 0) + 1 } }
          : msg
      )
    );
  };

  const handleCreateListing = (item: Partial<MarketplaceItem>) => {
    setMarketplaceItems(prev => [...prev, item as MarketplaceItem]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard announcements={announcements} />;
      case 'chat':
        return (
          <Chat
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onReactToMessage={handleReactToMessage}
          />
        );
      case 'marketplace':
        return <Marketplace items={marketplaceItems} onCreateListing={handleCreateListing} />;
      case 'qna':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Q&A Forum</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'resources':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Resources</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'hostels':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Hostels</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'blocks':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Blocks & Reports</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'ratings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Ratings</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'achievements':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'announcements':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        );
      case 'profile':
        return user ? (
          <Profile currentUserId={user.id} isAdmin={isAdmin} />
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p className="text-muted-foreground">Please log in to view your profile</p>
          </div>
        );
      default:
        return <Dashboard announcements={announcements} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <ThemeProvider>
        {showAuth ? (
          <Auth onSuccess={() => setShowAuth(false)} />
        ) : (
          <Home onNavigateToAuth={() => setShowAuth(true)} />
        )}
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <header className="fixed left-64 right-0 top-0 h-14 bg-background/80 backdrop-blur border-b border-border z-10 flex items-center justify-end px-6">
        <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
      </header>
      <div className="flex min-h-screen bg-background">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
          userName={userName}
        />
        <main className="ml-64 flex-1 p-8 pt-20">
          {renderPage()}
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default Index;
