import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Calendar, Phone, Mail, BookOpen, Award } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  roll_no: string;
  dob: string;
  college: string;
  year: string;
  branch: string;
  skills: string[];
  achievements: string[];
  avatar_url?: string;
}

interface ProfileProps {
  currentUserId: string;
  isAdmin: boolean;
}

const Profile = ({ currentUserId, isAdmin }: ProfileProps) => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  useEffect(() => {
    fetchProfile();
  }, [currentUserId]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUserId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim() || !profile) return;

    const updatedSkills = [...profile.skills, newSkill.trim()];
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ skills: updatedSkills })
        .eq('id', currentUserId);

      if (error) throw error;

      setProfile({ ...profile, skills: updatedSkills });
      setNewSkill('');
      toast({ title: 'Skill added successfully' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleAddAchievement = async () => {
    if (!newAchievement.trim() || !profile) return;

    const updatedAchievements = [...profile.achievements, newAchievement.trim()];
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ achievements: updatedAchievements })
        .eq('id', currentUserId);

      if (error) throw error;

      setProfile({ ...profile, achievements: updatedAchievements });
      setNewAchievement('');
      toast({ title: 'Achievement added successfully' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-muted-foreground">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button onClick={() => setEditing(!editing)}>
          {editing ? 'View Mode' : 'Edit Mode'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Name</Label>
              <p className="font-medium">{profile.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email {!isAdmin && <Badge variant="outline">Admin Only</Badge>}
              </Label>
              <p className="font-medium">{isAdmin ? profile.email : '••••••••@••••.com'}</p>
            </div>
            <div>
              <Label className="text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone {!isAdmin && <Badge variant="outline">Admin Only</Badge>}
              </Label>
              <p className="font-medium">{isAdmin ? profile.phone : '+91 •••••• ••••'}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Roll Number {!isAdmin && <Badge variant="outline">Admin Only</Badge>}</Label>
              <p className="font-medium">{isAdmin ? profile.roll_no : '••••••••'}</p>
            </div>
            <div>
              <Label className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date of Birth {!isAdmin && <Badge variant="outline">Admin Only</Badge>}
              </Label>
              <p className="font-medium">{isAdmin ? new Date(profile.dob).toLocaleDateString() : '••/••/••••'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-muted-foreground">College</Label>
              <p className="font-medium">{profile.college}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Year</Label>
              <p className="font-medium">{profile.year}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Branch</Label>
              <p className="font-medium">{profile.branch}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">{skill}</Badge>
            ))}
          </div>
          {editing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <Button onClick={handleAddSkill}>Add</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {profile.achievements.map((achievement, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Award className="h-4 w-4 mt-1 text-primary" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
          {editing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add an achievement"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
              />
              <Button onClick={handleAddAchievement}>Add</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;