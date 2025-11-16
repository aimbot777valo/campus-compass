// Mock data for the Student Welfare Community app
// This data will be used to populate the UI and can be persisted to localStorage

const MOCK_DATA = {
    // Current user
    currentUser: {
        id: 'user1',
        name: 'Alex Johnson',
        avatar: 'assets/avatars/user.jpg',
        email: 'alex.johnson@university.edu',
        college: 'Engineering College',
        year: '3rd Year',
        department: 'Computer Science',
        interests: ['Web Development', 'AI/ML', 'Gaming', 'Photography'],
        joinedDate: '2023-01-15',
        onlineStatus: true
    },

    // Users list
    users: [
        { id: 'user1', name: 'Alex Johnson', avatar: 'assets/avatars/user1.jpg', college: 'Engineering', year: '3rd', onlineStatus: true },
        { id: 'user2', name: 'Sarah Chen', avatar: 'assets/avatars/user2.jpg', college: 'Business', year: '2nd', onlineStatus: true },
        { id: 'user3', name: 'Mike Rodriguez', avatar: 'assets/avatars/user3.jpg', college: 'Arts', year: '4th', onlineStatus: false },
        { id: 'user4', name: 'Emma Wilson', avatar: 'assets/avatars/user4.jpg', college: 'Science', year: '1st', onlineStatus: true },
        { id: 'user5', name: 'David Kim', avatar: 'assets/avatars/user5.jpg', college: 'Engineering', year: '2nd', onlineStatus: true },
        { id: 'user6', name: 'Lisa Patel', avatar: 'assets/avatars/user6.jpg', college: 'Medicine', year: '3rd', onlineStatus: false },
        { id: 'user7', name: 'James Brown', avatar: 'assets/avatars/user7.jpg', college: 'Law', year: '4th', onlineStatus: true },
        { id: 'user8', name: 'Maria Garcia', avatar: 'assets/avatars/user8.jpg', college: 'Engineering', year: '2nd', onlineStatus: true },
        { id: 'user9', name: 'Tom Anderson', avatar: 'assets/avatars/user9.jpg', college: 'Business', year: '3rd', onlineStatus: false },
        { id: 'user10', name: 'Nina Taylor', avatar: 'assets/avatars/user10.jpg', college: 'Arts', year: '1st', onlineStatus: true }
    ],

    // Chat messages
    chatMessages: [
        { id: 'msg1', userId: 'user2', text: 'Hey everyone! Has anyone started working on the ML assignment?', timestamp: Date.now() - 3600000, reactions: { like: 3, love: 1 } },
        { id: 'msg2', userId: 'user5', text: 'Yeah, I finished it last night. The neural network part was tricky!', timestamp: Date.now() - 3300000, reactions: { like: 2 } },
        { id: 'msg3', userId: 'user4', text: 'I\'m still stuck on the data preprocessing. Any tips?', timestamp: Date.now() - 3000000, reactions: {} },
        { id: 'msg4', userId: 'user8', text: 'Make sure to normalize your features! That helped me a lot.', timestamp: Date.now() - 2700000, reactions: { like: 4 } },
        { id: 'msg5', userId: 'user2', text: 'Thanks! I\'ll try that.', timestamp: Date.now() - 2400000, reactions: { like: 1 } },
        { id: 'msg6', userId: 'user7', text: 'Anyone going to the tech talk tomorrow?', timestamp: Date.now() - 2100000, reactions: { like: 2 } },
        { id: 'msg7', userId: 'user10', text: 'Yes! Really excited about the AI ethics discussion.', timestamp: Date.now() - 1800000, reactions: { love: 3 } },
        { id: 'msg8', userId: 'user3', text: 'Does anyone know when the library closes today?', timestamp: Date.now() - 1500000, reactions: {} },
        { id: 'msg9', userId: 'user6', text: 'It closes at 10 PM on weekdays.', timestamp: Date.now() - 1200000, reactions: { like: 1 } },
        { id: 'msg10', userId: 'user9', text: 'Perfect, thanks!', timestamp: Date.now() - 900000, reactions: {} }
    ],

    // Marketplace items
    marketplaceItems: [
        {
            id: 'item1',
            title: 'MacBook Pro 2020',
            description: 'Excellent condition, 16GB RAM, 512GB SSD. Perfect for students. Comes with charger and case.',
            price: 899,
            condition: 'Like New',
            category: 'Electronics',
            sellerId: 'user3',
            sellerName: 'Mike Rodriguez',
            image: 'assets/marketplace/laptop.jpg',
            location: 'North Campus',
            tags: ['laptop', 'apple', 'macbook'],
            postedDate: '2024-01-10',
            views: 234
        },
        {
            id: 'item2',
            title: 'Calculus Textbook Bundle',
            description: 'Complete set of calculus books for engineering students. Barely used, includes solution manual.',
            price: 75,
            condition: 'Good',
            category: 'Books',
            sellerId: 'user5',
            sellerName: 'David Kim',
            image: 'assets/marketplace/books.jpg',
            location: 'South Campus',
            tags: ['textbooks', 'math', 'engineering'],
            postedDate: '2024-01-12',
            views: 156
        },
        {
            id: 'item3',
            title: 'Mountain Bike',
            description: 'Trek mountain bike, 21-speed, great for campus commute or weekend trails. Well maintained.',
            price: 250,
            condition: 'Good',
            category: 'Sports',
            sellerId: 'user7',
            sellerName: 'James Brown',
            image: 'assets/marketplace/bike.jpg',
            location: 'West Campus',
            tags: ['bike', 'sports', 'transport'],
            postedDate: '2024-01-08',
            views: 189
        },
        {
            id: 'item4',
            title: 'Gaming Chair',
            description: 'Ergonomic gaming chair with lumbar support. Black and red design. Perfect for long study sessions.',
            price: 120,
            condition: 'Like New',
            category: 'Furniture',
            sellerId: 'user2',
            sellerName: 'Sarah Chen',
            image: 'assets/marketplace/chair.jpg',
            location: 'East Campus',
            tags: ['furniture', 'gaming', 'chair'],
            postedDate: '2024-01-15',
            views: 201
        },
        {
            id: 'item5',
            title: 'iPhone 12 Pro',
            description: '128GB, Pacific Blue. Battery health 92%. No scratches, always used with case and screen protector.',
            price: 550,
            condition: 'Excellent',
            category: 'Electronics',
            sellerId: 'user8',
            sellerName: 'Maria Garcia',
            image: 'assets/marketplace/phone.jpg',
            location: 'North Campus',
            tags: ['phone', 'apple', 'iphone'],
            postedDate: '2024-01-14',
            views: 312
        },
        {
            id: 'item6',
            title: 'Mini Fridge',
            description: 'Compact refrigerator perfect for dorm rooms. Quiet and energy efficient. 1.7 cubic feet.',
            price: 60,
            condition: 'Good',
            category: 'Appliances',
            sellerId: 'user4',
            sellerName: 'Emma Wilson',
            image: 'assets/marketplace/fridge.jpg',
            location: 'South Campus',
            tags: ['appliance', 'dorm', 'fridge'],
            postedDate: '2024-01-11',
            views: 145
        }
    ],

    // Q&A posts
    qnaPosts: [
        {
            id: 'q1',
            userId: 'user2',
            userName: 'Sarah Chen',
            userAvatar: 'assets/avatars/user2.jpg',
            title: 'How to prepare for Data Structures final exam?',
            content: 'I\'m struggling with trees and graphs. What resources would you recommend? Looking for practice problems and conceptual explanations.',
            tags: ['computer-science', 'exam-prep', 'data-structures'],
            votes: 24,
            answerCount: 8,
            views: 456,
            postedDate: Date.now() - 172800000,
            answers: [
                {
                    id: 'a1',
                    userId: 'user5',
                    userName: 'David Kim',
                    userAvatar: 'assets/avatars/user5.jpg',
                    content: 'I found **LeetCode** and **HackerRank** extremely helpful for practice problems. For concepts, check out Abdul Bari\'s YouTube channel - his explanations are crystal clear!',
                    votes: 15,
                    postedDate: Date.now() - 169200000,
                    isAccepted: true
                },
                {
                    id: 'a2',
                    userId: 'user8',
                    userName: 'Maria Garcia',
                    userAvatar: 'assets/avatars/user8.jpg',
                    content: 'Don\'t forget to practice writing code by hand! Our professor mentioned the exam will have a coding section without IDE.',
                    votes: 8,
                    postedDate: Date.now() - 165600000,
                    isAccepted: false
                }
            ]
        },
        {
            id: 'q2',
            userId: 'user4',
            userName: 'Emma Wilson',
            userAvatar: 'assets/avatars/user4.jpg',
            title: 'Best places to study on campus during finals week?',
            content: 'The main library is always packed. Looking for quieter spots with good wifi and comfortable seating.',
            tags: ['campus-life', 'study-tips'],
            votes: 18,
            answerCount: 12,
            views: 634,
            postedDate: Date.now() - 259200000,
            answers: [
                {
                    id: 'a3',
                    userId: 'user7',
                    userName: 'James Brown',
                    userAvatar: 'assets/avatars/user7.jpg',
                    content: 'The Engineering building has a 24/7 study lounge on the 3rd floor. It\'s usually quiet and has great wifi!',
                    votes: 12,
                    postedDate: Date.now() - 255600000,
                    isAccepted: true
                }
            ]
        },
        {
            id: 'q3',
            userId: 'user10',
            userName: 'Nina Taylor',
            userAvatar: 'assets/avatars/user10.jpg',
            title: 'Internship opportunities for first-year students?',
            content: 'I\'m interested in software development internships but most require juniors/seniors. Any companies that hire freshmen?',
            tags: ['career', 'internship', 'first-year'],
            votes: 31,
            answerCount: 15,
            views: 892,
            postedDate: Date.now() - 432000000,
            answers: []
        },
        {
            id: 'q4',
            userId: 'user6',
            userName: 'Lisa Patel',
            userAvatar: 'assets/avatars/user6.jpg',
            title: 'Recommended electives for AI/ML specialization?',
            content: 'Planning my courses for next semester. What electives pair well with Machine Learning fundamentals?',
            tags: ['computer-science', 'ai-ml', 'courses'],
            votes: 27,
            answerCount: 10,
            views: 721,
            postedDate: Date.now() - 518400000,
            answers: []
        }
    ],

    // Resources
    resources: {
        visual: [
            {
                id: 'v1',
                title: 'MIT OpenCourseWare - Linear Algebra',
                description: 'Complete video lectures by Gilbert Strang. Essential for ML and data science.',
                url: 'https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8',
                thumbnail: 'assets/resources/mit-linear-algebra.jpg',
                type: 'YouTube',
                tags: ['mathematics', 'linear-algebra', 'video'],
                rating: 4.9,
                addedBy: 'user5',
                addedDate: '2024-01-05'
            },
            {
                id: 'v2',
                title: 'FreeCodeCamp - Full Stack Development',
                description: 'Comprehensive web development course covering HTML, CSS, JavaScript, React, Node.js, and more.',
                url: 'https://www.freecodecamp.org',
                thumbnail: 'assets/resources/freecodecamp.jpg',
                type: 'Website',
                tags: ['web-development', 'programming', 'full-stack'],
                rating: 4.8,
                addedBy: 'user2',
                addedDate: '2024-01-08'
            },
            {
                id: 'v3',
                title: 'StatQuest - Statistics & Machine Learning',
                description: 'Fun and clear explanations of complex statistical concepts and ML algorithms.',
                url: 'https://www.youtube.com/@statquest',
                thumbnail: 'assets/resources/statquest.jpg',
                type: 'YouTube',
                tags: ['statistics', 'machine-learning', 'video'],
                rating: 4.9,
                addedBy: 'user8',
                addedDate: '2024-01-10'
            },
            {
                id: 'v4',
                title: 'Khan Academy - Computer Science',
                description: 'Interactive lessons on algorithms, cryptography, and information theory.',
                url: 'https://www.khanacademy.org/computing/computer-science',
                thumbnail: 'assets/resources/khan-cs.jpg',
                type: 'Website',
                tags: ['computer-science', 'algorithms', 'interactive'],
                rating: 4.7,
                addedBy: 'user4',
                addedDate: '2024-01-12'
            }
        ],
        text: [
            {
                id: 't1',
                title: 'Data Structures and Algorithms Cheat Sheet',
                description: 'Quick reference guide covering all major DS&A concepts with time complexities.',
                fileName: 'DSA-CheatSheet.pdf',
                fileSize: '2.3 MB',
                tags: ['computer-science', 'algorithms', 'reference'],
                rating: 4.8,
                downloads: 342,
                addedBy: 'user5',
                addedDate: '2024-01-03'
            },
            {
                id: 't2',
                title: 'Introduction to Machine Learning - Course Notes',
                description: 'Compiled notes from Stanford CS229 course. Covers supervised and unsupervised learning.',
                fileName: 'ML-Notes.pdf',
                fileSize: '5.7 MB',
                tags: ['machine-learning', 'notes', 'stanford'],
                rating: 4.9,
                downloads: 521,
                addedBy: 'user8',
                addedDate: '2024-01-06'
            },
            {
                id: 't3',
                title: 'System Design Interview Preparation',
                description: 'Comprehensive guide to ace system design interviews with real examples.',
                fileName: 'SystemDesign-Guide.pdf',
                fileSize: '4.1 MB',
                tags: ['interview', 'system-design', 'career'],
                rating: 4.7,
                downloads: 289,
                addedBy: 'user7',
                addedDate: '2024-01-09'
            },
            {
                id: 't4',
                title: 'Python Programming Best Practices',
                description: 'PEP 8 style guide and pythonic coding patterns for clean code.',
                fileName: 'Python-BestPractices.pdf',
                fileSize: '1.8 MB',
                tags: ['python', 'programming', 'best-practices'],
                rating: 4.6,
                downloads: 198,
                addedBy: 'user2',
                addedDate: '2024-01-11'
            }
        ]
    },

    // Hostels
    hostels: [
        {
            id: 'h1',
            name: 'University Heights Hostel',
            description: 'Modern hostel with AC rooms, wifi, and gym facilities. Located 5 minutes from campus.',
            rating: 4.5,
            reviewCount: 89,
            avgPrice: 450,
            distance: '0.5 km',
            amenities: ['WiFi', 'AC', 'Gym', 'Laundry', 'Mess'],
            image: 'assets/hostels/heights.jpg',
            reviews: [
                {
                    id: 'r1',
                    userId: 'user2',
                    userName: 'Sarah Chen',
                    userAvatar: 'assets/avatars/user2.jpg',
                    rating: 5,
                    comment: 'Excellent facilities and very clean. The mess food is surprisingly good! Staff is friendly and responsive.',
                    date: Date.now() - 604800000,
                    helpful: 12
                },
                {
                    id: 'r2',
                    userId: 'user5',
                    userName: 'David Kim',
                    userAvatar: 'assets/avatars/user5.jpg',
                    rating: 4,
                    comment: 'Great location and amenities. The only downside is that it can get a bit noisy during exam season.',
                    date: Date.now() - 1209600000,
                    helpful: 8
                }
            ]
        },
        {
            id: 'h2',
            name: 'Green Valley Residence',
            description: 'Peaceful environment with garden, library, and study rooms. Vegetarian mess available.',
            rating: 4.2,
            reviewCount: 67,
            avgPrice: 380,
            distance: '1.2 km',
            amenities: ['WiFi', 'Library', 'Garden', 'Study Rooms', 'Veg Mess'],
            image: 'assets/hostels/greenvalley.jpg',
            reviews: [
                {
                    id: 'r3',
                    userId: 'user6',
                    userName: 'Lisa Patel',
                    userAvatar: 'assets/avatars/user6.jpg',
                    rating: 4,
                    comment: 'Really quiet and perfect for studying. The garden is beautiful and relaxing.',
                    date: Date.now() - 1814400000,
                    helpful: 15
                }
            ]
        },
        {
            id: 'h3',
            name: 'Campus View Hostel',
            description: 'Budget-friendly option with basic amenities. Perfect for first-year students.',
            rating: 3.8,
            reviewCount: 124,
            avgPrice: 280,
            distance: '0.8 km',
            amenities: ['WiFi', 'Mess', 'Common Room'],
            image: 'assets/hostels/campusview.jpg',
            reviews: [
                {
                    id: 'r4',
                    userId: 'user4',
                    userName: 'Emma Wilson',
                    userAvatar: 'assets/avatars/user4.jpg',
                    rating: 4,
                    comment: 'Great value for money! It\'s basic but clean and the location is convenient.',
                    date: Date.now() - 2419200000,
                    helpful: 21
                },
                {
                    id: 'r5',
                    userId: 'user10',
                    userName: 'Nina Taylor',
                    userAvatar: 'assets/avatars/user10.jpg',
                    rating: 3,
                    comment: 'Affordable but wifi can be slow sometimes. Otherwise decent for the price.',
                    date: Date.now() - 3024000000,
                    helpful: 9
                }
            ]
        },
        {
            id: 'h4',
            name: 'Elite Student Residency',
            description: 'Premium hostel with single rooms, private bathrooms, and housekeeping services.',
            rating: 4.7,
            reviewCount: 45,
            avgPrice: 650,
            distance: '1.5 km',
            amenities: ['WiFi', 'AC', 'Gym', 'Private Bath', 'Housekeeping', 'Laundry'],
            image: 'assets/hostels/elite.jpg',
            reviews: [
                {
                    id: 'r6',
                    userId: 'user3',
                    userName: 'Mike Rodriguez',
                    userAvatar: 'assets/avatars/user3.jpg',
                    rating: 5,
                    comment: 'Worth every penny! The single rooms are spacious and having a private bathroom is a game changer.',
                    date: Date.now() - 864000000,
                    helpful: 18
                }
            ]
        },
        {
            id: 'h5',
            name: 'Sunshine Hostel',
            description: 'Women-only hostel with strict security. Includes yoga room and wellness center.',
            rating: 4.6,
            reviewCount: 78,
            avgPrice: 420,
            distance: '0.7 km',
            amenities: ['WiFi', 'AC', 'Security', 'Yoga Room', 'Wellness Center', 'Mess'],
            image: 'assets/hostels/sunshine.jpg',
            reviews: [
                {
                    id: 'r7',
                    userId: 'user8',
                    userName: 'Maria Garcia',
                    userAvatar: 'assets/avatars/user8.jpg',
                    rating: 5,
                    comment: 'Feel very safe here! The yoga classes are a great stress reliever. Highly recommend for female students.',
                    date: Date.now() - 1296000000,
                    helpful: 24
                }
            ]
        },
        {
            id: 'h6',
            name: 'Tech Hub Residence',
            description: 'Tech-focused hostel with co-working spaces and high-speed internet. Popular among CS students.',
            rating: 4.4,
            reviewCount: 92,
            avgPrice: 480,
            distance: '1.0 km',
            amenities: ['High-Speed WiFi', 'Co-working Space', 'AC', 'Gaming Room', 'Laundry'],
            image: 'assets/hostels/techhub.jpg',
            reviews: [
                {
                    id: 'r8',
                    userId: 'user7',
                    userName: 'James Brown',
                    userAvatar: 'assets/avatars/user7.jpg',
                    rating: 4,
                    comment: 'Perfect for tech students! The co-working space is great for group projects and the internet speed is amazing.',
                    date: Date.now() - 1728000000,
                    helpful: 16
                }
            ]
        }
    ],

    // Achievements
    achievements: [
        {
            id: 'ach1',
            name: 'Early Bird',
            description: 'Joined the community in its first month',
            icon: '🐦',
            progress: 100,
            earned: true,
            earnedDate: '2023-01-15',
            category: 'milestone'
        },
        {
            id: 'ach2',
            name: 'Helpful Helper',
            description: 'Answered 10 questions in Q&A',
            icon: '🤝',
            progress: 60,
            earned: false,
            category: 'contribution'
        },
        {
            id: 'ach3',
            name: 'Chat Master',
            description: 'Sent 100 messages in general chat',
            icon: '💬',
            progress: 100,
            earned: true,
            earnedDate: '2023-03-22',
            category: 'social'
        },
        {
            id: 'ach4',
            name: 'Resource Curator',
            description: 'Added 5 helpful resources',
            icon: '📚',
            progress: 80,
            earned: false,
            category: 'contribution'
        },
        {
            id: 'ach5',
            name: 'Market Maven',
            description: 'Completed 5 successful trades',
            icon: '🛒',
            progress: 100,
            earned: true,
            earnedDate: '2023-05-10',
            category: 'marketplace'
        },
        {
            id: 'ach6',
            name: 'Review Writer',
            description: 'Wrote 3 detailed hostel reviews',
            icon: '✍️',
            progress: 100,
            earned: true,
            earnedDate: '2023-06-18',
            category: 'hostel'
        },
        {
            id: 'ach7',
            name: 'Top Contributor',
            description: 'Received 50 upvotes on your posts',
            icon: '⭐',
            progress: 70,
            earned: false,
            category: 'reputation'
        },
        {
            id: 'ach8',
            name: 'Community Champion',
            description: 'Active for 6 consecutive months',
            icon: '🏆',
            progress: 100,
            earned: true,
            earnedDate: '2023-07-15',
            category: 'milestone'
        }
    ],

    // Announcements
    announcements: [
        {
            id: 'ann1',
            title: 'New Study Spaces Available in Library',
            content: 'The university library has opened additional study rooms on the 4th floor. These rooms can be booked online through the student portal. Each room accommodates up to 6 students and is equipped with a whiteboard and power outlets.',
            author: 'Admin',
            date: Date.now() - 86400000,
            priority: 'high',
            icon: '📢',
            category: 'facilities'
        },
        {
            id: 'ann2',
            title: 'Career Fair - February 15-16',
            content: 'Don\'t miss the annual career fair! Over 100 companies will be recruiting for internships and full-time positions. Update your resumes and prepare for on-the-spot interviews. Professional attire recommended.',
            author: 'Career Services',
            date: Date.now() - 172800000,
            priority: 'high',
            icon: '💼',
            category: 'career'
        },
        {
            id: 'ann3',
            title: 'Mid-Semester Break Schedule',
            content: 'The mid-semester break will be from March 10-17. Classes will resume on March 18. The library and mess will operate on reduced hours during the break.',
            author: 'Academic Office',
            date: Date.now() - 259200000,
            priority: 'medium',
            icon: '📅',
            category: 'academic'
        },
        {
            id: 'ann4',
            title: 'New Gym Equipment Installed',
            content: 'The campus gym has been upgraded with new cardio machines and free weights. Remember to bring your student ID for access. Operating hours: 6 AM - 10 PM.',
            author: 'Sports Committee',
            date: Date.now() - 432000000,
            priority: 'low',
            icon: '🏋️',
            category: 'facilities'
        },
        {
            id: 'ann5',
            title: 'Guest Lecture: AI in Healthcare',
            content: 'Dr. Jennifer Wong from Stanford will be giving a guest lecture on "Applications of AI in Modern Healthcare" on February 20th at 4 PM in Auditorium A. Open to all students.',
            author: 'CS Department',
            date: Date.now() - 518400000,
            priority: 'medium',
            icon: '🎓',
            category: 'event'
        }
    ],

    // Dashboard stats
    dashboardStats: {
        onlineStudents: 1247,
        resourcesAdded: 342,
        hostelReviews: 495,
        activeListings: 87,
        questionsToday: 23
    }
};

// Initialize localStorage with mock data if it doesn't exist
function initializeLocalStorage() {
    const keys = [
        'currentUser',
        'chatMessages',
        'marketplaceItems',
        'qnaPosts',
        'resources',
        'hostels',
        'achievements',
        'announcements',
        'blockedUsers'
    ];

    keys.forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(MOCK_DATA[key] || []));
        }
    });

    // Initialize blocked users if not exists
    if (!localStorage.getItem('blockedUsers')) {
        localStorage.setItem('blockedUsers', JSON.stringify([]));
    }
}

// Call initialization
initializeLocalStorage();
