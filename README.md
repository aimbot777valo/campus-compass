# Student Welfare Community - Frontend

A modern, responsive student community platform built with vanilla HTML, CSS, and JavaScript. Features include general chat, marketplace, Q&A forum, resources library, hostel reviews, achievements, and more.

## 🚀 Quick Start

### Option 1: Direct Open
Simply double-click `index.html` to open the app in your default browser.

### Option 2: Local Server (Recommended)
For best experience, serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8080

# Using Node.js http-server
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open: `http://localhost:8080`

## 📁 Project Structure

```
student-welfare-community/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with CSS variables
├── app.js              # Application logic and routing
├── mock-data.js        # Sample data for the application
├── README.md           # This file
└── assets/             # Images and resources
    ├── avatars/        # User avatar images
    ├── marketplace/    # Marketplace item images
    ├── resources/      # Resource thumbnails
    └── hostels/        # Hostel images
```

## ✨ Features

### 1. **Dashboard**
- Overview statistics (online students, resources, reviews)
- Recent announcements
- Earned achievements display
- Global search functionality

### 2. **General Chat**
- Real-time style chat interface
- Message reactions (like)
- Auto-generated mock messages from other users
- Persistent chat history via localStorage
- User avatars and timestamps

### 3. **Buy & Sell Marketplace**
- Grid view of items with images
- Create new listings modal
- Search and filter by category
- Sort by price or date
- Item details modal with seller information
- Contact seller functionality

### 4. **Q&A Forum**
- Post questions with tags
- Upvote/downvote system
- Answer threads with accepted answers
- View count and engagement metrics
- Sort by votes or newest

### 5. **Resources**
- **Visual Resources**: YouTube videos and websites with ratings
- **Text Resources**: PDF documents with download counts
- Tabbed interface
- Rating system
- External links to resources

### 6. **Hostels**
- Hostel listings with ratings and amenities
- Detailed reviews from students
- Average ratings and review counts
- Distance from campus
- Price information
- Add review functionality

### 7. **Blocks & Reports**
- Block/unblock users
- Report inappropriate content
- Blocked users list management
- Report form submission

### 8. **Ratings Overview**
- Average ratings across categories
- Top-rated hostels and resources
- Community statistics

### 9. **Achievements**
- Progress tracking
- Earned vs. in-progress achievements
- Progress bars
- Achievement categories

### 10. **Announcements**
- Priority levels (high, medium, low)
- Category tags
- Author and timestamp information

### 11. **Profile & Settings**
- User profile display
- Account details
- Interests and achievements
- Export data functionality
- Clear all data option

## 💾 Data Persistence

All data is stored in **localStorage** with the following keys:

### LocalStorage Keys:
- `currentUser` - Current user profile
- `chatMessages` - All chat messages
- `marketplaceItems` - Marketplace listings
- `qnaPosts` - Q&A forum posts
- `resources` - Visual and text resources
- `hostels` - Hostel listings and reviews
- `achievements` - User achievements
- `announcements` - System announcements
- `blockedUsers` - Array of blocked user IDs

### Reset Data:
To reset the app to initial state:
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Clear localStorage
4. Refresh the page

OR use the "Clear All Data" button in Profile settings.

### Export Data:
Click "Export My Data" in Profile settings to download a JSON file with all your data.

## 🎨 Design System

### Color Variables (CSS Custom Properties):
```css
--bg: #0f1115              /* Main background */
--panel: #15171b           /* Panel/card background */
--border: #2a2d35          /* Borders */
--text: #e8eaed            /* Primary text */
--text-muted: #9aa0a6      /* Muted text */
--accent: #ff6fa3          /* Primary accent (pink) */
--accent-2: #8f6bff        /* Secondary accent (purple) */
--success: #39d98a         /* Success color */
--warning: #ffd93d         /* Warning color */
--danger: #ff6b6b          /* Danger/error color */
```

### Typography:
- Font Family: Inter (Google Fonts)
- Base Size: 14px
- Line Height: 1.6

### Spacing Scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Border Radius:
- sm: 8px
- default: 12px
- lg: 16px

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (Full sidebar)
- **Tablet**: 768px - 1024px (Collapsible sidebar)
- **Mobile**: < 768px (Bottom navigation + drawer)

### Mobile Features:
- Hamburger menu for sidebar
- Bottom navigation bar
- Touch-friendly tap targets
- Optimized card layouts
- Mobile-first modals

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA roles and labels
- Keyboard navigation support
- Skip-to-content link
- Focus visible styles
- Alt text for all images
- Color contrast meets WCAG AA
- Screen reader friendly

### Keyboard Shortcuts:
- `Tab` - Navigate through interactive elements
- `Enter` - Activate buttons/links
- `Esc` - Close modals (when implemented)

## 🧪 Testing Checklist

### Functionality Tests:
- [ ] All navigation links work without page reload
- [ ] Chat messages persist after refresh
- [ ] Create marketplace listing saves to localStorage
- [ ] Q&A voting system works
- [ ] Resource tabs switch correctly
- [ ] Hostel reviews display properly
- [ ] Block/unblock users functions
- [ ] Export data downloads JSON file
- [ ] Clear data resets the app
- [ ] Toast notifications appear correctly

### Responsive Tests:
- [ ] Desktop layout (> 1024px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Mobile layout (< 768px)
- [ ] Mobile menu toggle works
- [ ] Bottom navigation visible on mobile
- [ ] All cards stack properly on small screens

### Accessibility Tests:
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have accessible names
- [ ] Color contrast passes WCAG AA
- [ ] Keyboard navigation works
- [ ] Skip link appears on focus

## 🔧 Customization

### Change Colors:
Edit CSS variables in `styles.css` (lines 9-28)

### Add Mock Data:
Edit `mock-data.js` to add more users, messages, items, etc.

### Modify Layouts:
Grid columns can be adjusted in `styles.css` under `.grid-2`, `.grid-3`, `.grid-4`

## 🐛 Known Limitations

1. **No Backend**: All data is client-side only (localStorage)
2. **Image Placeholders**: Images use icon placeholders instead of real images
3. **Mock Real-time**: Chat simulation uses setInterval, not WebSocket
4. **No Authentication**: Single user mode
5. **PDF Preview**: Shows placeholder instead of actual PDF rendering

## 📄 Mock Data Summary

The app includes:
- **10 Mock Users** with avatars and profiles
- **10 Chat Messages** with reactions
- **6 Marketplace Items** across categories
- **4 Q&A Posts** with answers
- **8 Resources** (4 visual + 4 text)
- **6 Hostels** with reviews
- **8 Achievements** (4 earned, 4 in progress)
- **5 Announcements** with priority levels

## 🚀 Future Enhancements

Potential features for future versions:
- Dark/Light theme toggle
- Advanced search with filters
- User-to-user messaging
- File upload for marketplace images
- Real PDF preview
- Emoji picker for chat
- Push notifications
- Progressive Web App (PWA)
- Offline functionality
- Data synchronization

## 📞 Support

For issues or questions:
1. Check this README
2. Inspect browser console for errors
3. Verify localStorage is enabled
4. Try clearing data and refreshing

## 📜 License

This is a demonstration project for educational purposes.

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks. No dependencies. Just pure web technologies.*
