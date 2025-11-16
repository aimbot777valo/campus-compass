import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Announcement } from "@/data/mockData";

interface DashboardProps {
  announcements: Announcement[];
}

export function Dashboard({ announcements }: DashboardProps) {
  const stats = [
    { label: 'Students Online', value: '2,847', icon: Users, color: 'text-primary' },
    { label: 'Active Chats', value: '156', icon: MessageSquare, color: 'text-secondary' },
    { label: 'Resources', value: '342', icon: BookOpen, color: 'text-accent' },
    { label: 'Hostel Reviews', value: '89', icon: Star, color: 'text-warning' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening in your community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
            <CardDescription>Stay updated with the latest news</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{announcement.title}</h3>
                    {announcement.sticky && (
                      <Badge variant="secondary" className="text-xs">Pinned</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Achievements</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'First Post', desc: 'Created your first listing', progress: 100, emoji: '🎯' },
              { title: 'Helpful Member', desc: 'Answer 10 questions', progress: 30, emoji: '🤝' },
              { title: 'Resource Contributor', desc: 'Upload 5 resources', progress: 0, emoji: '📚' },
            ].map((achievement) => (
              <div key={achievement.title} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{achievement.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                  </div>
                  <span className="text-xs font-medium">{achievement.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
