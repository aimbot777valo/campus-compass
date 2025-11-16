// Mock data for the Student Welfare Community app

export interface User {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  college: string;
  year: string;
  department?: string;
  interests?: string[];
  joinedDate?: string;
  onlineStatus: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  text: string;
  timestamp: number;
  reactions: { [key: string]: number };
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  sellerId: string;
  sellerName: string;
  image: string;
  location: string;
  tags: string[];
  postedDate: string;
  views: number;
}

export interface QnaPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  votes: number;
  answers: QnaAnswer[];
  timestamp: number;
}

export interface QnaAnswer {
  id: string;
  userId: string;
  content: string;
  votes: number;
  timestamp: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'visual' | 'text';
  url?: string;
  thumbnail?: string;
  tags: string[];
  rating: number;
  uploadedBy: string;
  uploadDate: string;
}

export interface Hostel {
  id: string;
  name: string;
  location: string;
  distance: string;
  avgPrice: number;
  rating: number;
  totalReviews: number;
  image: string;
  amenities: string[];
  reviews: HostelReview[];
}

export interface HostelReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  total: number;
  claimed: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
  sticky: boolean;
}

export const currentUser: User = {
  id: 'user1',
  name: 'Alex Johnson',
  avatar: '/placeholder.svg',
  email: 'alex.johnson@university.edu',
  college: 'Engineering College',
  year: '3rd Year',
  department: 'Computer Science',
  interests: ['Web Development', 'AI/ML', 'Gaming', 'Photography'],
  joinedDate: '2023-01-15',
  onlineStatus: true
};

export const users: User[] = [
  { id: 'user1', name: 'Alex Johnson', avatar: '/placeholder.svg', college: 'Engineering', year: '3rd', onlineStatus: true },
  { id: 'user2', name: 'Sarah Chen', avatar: '/placeholder.svg', college: 'Business', year: '2nd', onlineStatus: true },
  { id: 'user3', name: 'Mike Rodriguez', avatar: '/placeholder.svg', college: 'Arts', year: '4th', onlineStatus: false },
  { id: 'user4', name: 'Emma Wilson', avatar: '/placeholder.svg', college: 'Science', year: '1st', onlineStatus: true },
  { id: 'user5', name: 'David Kim', avatar: '/placeholder.svg', college: 'Engineering', year: '2nd', onlineStatus: true },
  { id: 'user6', name: 'Lisa Patel', avatar: '/placeholder.svg', college: 'Medicine', year: '3rd', onlineStatus: false },
  { id: 'user7', name: 'James Brown', avatar: '/placeholder.svg', college: 'Law', year: '4th', onlineStatus: true },
  { id: 'user8', name: 'Maria Garcia', avatar: '/placeholder.svg', college: 'Engineering', year: '2nd', onlineStatus: true },
  { id: 'user9', name: 'Tom Anderson', avatar: '/placeholder.svg', college: 'Business', year: '3rd', onlineStatus: false },
  { id: 'user10', name: 'Nina Taylor', avatar: '/placeholder.svg', college: 'Arts', year: '1st', onlineStatus: true }
];

export const initialChatMessages: ChatMessage[] = [
  { id: 'msg1', userId: 'user2', text: 'Hey everyone! Has anyone started working on the ML assignment?', timestamp: Date.now() - 3600000, reactions: { like: 3, love: 1 } },
  { id: 'msg2', userId: 'user5', text: 'Yeah, I finished it last night. The neural network part was tricky!', timestamp: Date.now() - 3300000, reactions: { like: 2 } },
  { id: 'msg3', userId: 'user4', text: 'I\'m still stuck on the data preprocessing. Any tips?', timestamp: Date.now() - 3000000, reactions: {} },
  { id: 'msg4', userId: 'user8', text: 'Make sure to normalize your features! That helped me a lot.', timestamp: Date.now() - 2700000, reactions: { like: 4 } },
  { id: 'msg5', userId: 'user2', text: 'Thanks! I\'ll try that.', timestamp: Date.now() - 2400000, reactions: { like: 1 } },
];

export const initialMarketplaceItems: MarketplaceItem[] = [
  {
    id: 'item1',
    title: 'MacBook Pro 2020',
    description: 'Excellent condition, 16GB RAM, 512GB SSD. Perfect for students.',
    price: 899,
    condition: 'Like New',
    category: 'Electronics',
    sellerId: 'user3',
    sellerName: 'Mike Rodriguez',
    image: '/placeholder.svg',
    location: 'North Campus',
    tags: ['laptop', 'apple', 'macbook'],
    postedDate: '2024-01-10',
    views: 234
  },
  {
    id: 'item2',
    title: 'Calculus Textbook Bundle',
    description: 'Complete set with solution manual. Barely used.',
    price: 45,
    condition: 'Good',
    category: 'Books',
    sellerId: 'user5',
    sellerName: 'David Kim',
    image: '/placeholder.svg',
    location: 'Library',
    tags: ['textbook', 'math', 'calculus'],
    postedDate: '2024-01-12',
    views: 156
  },
  {
    id: 'item3',
    title: 'Study Desk with Chair',
    description: 'Solid wood desk with matching chair. Great condition.',
    price: 120,
    condition: 'Good',
    category: 'Furniture',
    sellerId: 'user7',
    sellerName: 'James Brown',
    image: '/placeholder.svg',
    location: 'South Dorms',
    tags: ['furniture', 'desk', 'chair'],
    postedDate: '2024-01-08',
    views: 89
  }
];

export const initialQnaPosts: QnaPost[] = [
  {
    id: 'qna1',
    userId: 'user4',
    title: 'How to prepare for final exams effectively?',
    content: 'I have 5 exams coming up in 2 weeks. What are some effective study strategies?',
    tags: ['study-tips', 'exams'],
    votes: 12,
    answers: [
      { id: 'ans1', userId: 'user2', content: 'Start with a study schedule and stick to it. Take regular breaks!', votes: 8, timestamp: Date.now() - 86400000 },
      { id: 'ans2', userId: 'user5', content: 'Practice past papers and focus on understanding concepts, not memorization.', votes: 6, timestamp: Date.now() - 43200000 }
    ],
    timestamp: Date.now() - 172800000
  },
  {
    id: 'qna2',
    userId: 'user8',
    title: 'Best places to study on campus?',
    content: 'Looking for quiet study spots. Library is always too crowded.',
    tags: ['campus', 'study-spots'],
    votes: 8,
    answers: [
      { id: 'ans3', userId: 'user3', content: 'Try the 3rd floor of the science building. Super quiet!', votes: 5, timestamp: Date.now() - 21600000 }
    ],
    timestamp: Date.now() - 259200000
  }
];

export const initialResources: Resource[] = [
  {
    id: 'res1',
    title: 'Introduction to Machine Learning',
    description: 'Comprehensive ML course by Andrew Ng',
    type: 'visual',
    url: 'https://youtube.com',
    thumbnail: '/placeholder.svg',
    tags: ['machine-learning', 'ai', 'course'],
    rating: 4.8,
    uploadedBy: 'user2',
    uploadDate: '2024-01-05'
  },
  {
    id: 'res2',
    title: 'Data Structures Cheat Sheet',
    description: 'Quick reference for common data structures',
    type: 'text',
    thumbnail: '/placeholder.svg',
    tags: ['programming', 'data-structures'],
    rating: 4.5,
    uploadedBy: 'user5',
    uploadDate: '2024-01-10'
  }
];

export const initialHostels: Hostel[] = [
  {
    id: 'hostel1',
    name: 'Sunrise Hostel',
    location: '123 Campus Drive',
    distance: '0.5 km from campus',
    avgPrice: 450,
    rating: 4.5,
    totalReviews: 28,
    image: '/placeholder.svg',
    amenities: ['WiFi', 'Laundry', 'Kitchen', 'Study Room'],
    reviews: [
      { id: 'rev1', userId: 'user3', userName: 'Mike Rodriguez', rating: 5, comment: 'Great place, very clean and close to campus!', date: '2024-01-10' },
      { id: 'rev2', userId: 'user6', userName: 'Lisa Patel', rating: 4, comment: 'Good facilities but can be noisy sometimes.', date: '2024-01-08' }
    ]
  },
  {
    id: 'hostel2',
    name: 'Campus View Hostel',
    location: '456 University Ave',
    distance: '0.8 km from campus',
    avgPrice: 380,
    rating: 4.2,
    totalReviews: 35,
    image: '/placeholder.svg',
    amenities: ['WiFi', 'Parking', 'Gym'],
    reviews: [
      { id: 'rev3', userId: 'user7', userName: 'James Brown', rating: 4, comment: 'Affordable and decent amenities.', date: '2024-01-12' }
    ]
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'First Post',
    description: 'Created your first marketplace listing',
    icon: '🎯',
    progress: 1,
    total: 1,
    claimed: false
  },
  {
    id: 'ach2',
    title: 'Helpful Member',
    description: 'Answer 10 questions in Q&A',
    icon: '🤝',
    progress: 3,
    total: 10,
    claimed: false
  },
  {
    id: 'ach3',
    title: 'Resource Contributor',
    description: 'Upload 5 resources',
    icon: '📚',
    progress: 0,
    total: 5,
    claimed: false
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'Welcome to Student Welfare Community!',
    content: 'Join our vibrant community of students. Share, learn, and grow together!',
    author: 'Admin',
    date: '2024-01-15',
    priority: 'high',
    sticky: true
  },
  {
    id: 'ann2',
    title: 'New Study Groups Feature',
    content: 'You can now create and join study groups. Check it out in the resources section!',
    author: 'Admin',
    date: '2024-01-12',
    priority: 'medium',
    sticky: false
  }
];
