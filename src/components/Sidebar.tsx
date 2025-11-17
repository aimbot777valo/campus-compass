import { Home, MessageCircle, Store, HelpCircle, BookOpen, Building, Ban, Star, Trophy, Megaphone, User, GraduationCap, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  userName?: string;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'chat', label: 'General Chat', icon: MessageCircle, badge: '12' },
  { id: 'marketplace', label: 'Buy & Sell', icon: Store },
  { id: 'qna', label: 'Q&A Forum', icon: HelpCircle },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'hostels', label: 'Hostels', icon: Building },
  { id: 'blocks', label: 'Blocks & Reports', icon: Ban },
  { id: 'ratings', label: 'Ratings', icon: Star },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'announcements', label: 'Announcements', icon: Megaphone },
  { id: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ currentPage, onPageChange, onLogout, userName = "Student" }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="font-bold text-lg text-sidebar-foreground">Student Hub</span>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{userName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start mb-1 ${
                isActive 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="w-4 h-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 mr-3" /> : <Moon className="w-4 h-4 mr-3" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-sidebar-accent"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
