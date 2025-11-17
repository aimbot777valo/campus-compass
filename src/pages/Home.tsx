import { GraduationCap, MessageCircle, Store, Users, Shield, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

interface HomeProps {
  onNavigateToAuth: () => void;
}

export default function Home({ onNavigateToAuth }: HomeProps) {
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: MessageCircle,
      title: "General Chat",
      description: "Connect with students across your college in real-time"
    },
    {
      icon: Store,
      title: "Marketplace",
      description: "Buy and sell items with fellow students safely"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join study groups and collaborate on projects"
    },
    {
      icon: Shield,
      title: "Secure",
      description: "Verified students only with roll number authentication"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl text-foreground">Student Hub</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button onClick={onNavigateToAuth} variant="default">
              Login / Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
          Your College Community,
          <span className="text-primary"> All in One Place</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect, collaborate, and grow with verified students from your college.
          Share resources, buy & sell items, and stay updated with campus life.
        </p>
        <Button onClick={onNavigateToAuth} size="lg" className="text-lg px-8 py-6">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Everything You Need
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Join Your College Community?
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Sign up now with your college roll number and phone verification
          </p>
          <Button onClick={onNavigateToAuth} size="lg" variant="default">
            Create Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 Student Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
