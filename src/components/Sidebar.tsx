import { Home, MessageCircle, Store, HelpCircle, BookOpen, Building, Ban, Star, Trophy, Megaphone, User, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
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

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
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
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">Alex Johnson</p>
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
    </aside>
  );
}
