# Assets Guide

This folder should contain all images and media files for the Student Welfare Community app.

## Required Folder Structure

```
assets/
├── avatars/          # User profile pictures
├── marketplace/      # Product/item images
├── resources/        # Resource thumbnails
├── hostels/          # Hostel photos
└── ASSETS-GUIDE.md   # This file
```

## Image Specifications

### Avatars (assets/avatars/)
**Purpose**: User profile pictures in chat, Q&A, reviews

**Files needed**:
- user.jpg (current user - Alex Johnson)
- user1.jpg to user10.jpg (other users)

**Specifications**:
- Format: JPG or PNG
- Dimensions: 200x200px minimum (will be displayed at various sizes)
- Aspect Ratio: 1:1 (square)
- File size: < 50KB each
- Style: Headshots or profile photos

**Fallback**: App will display initials or default avatar icon if images are missing

---

### Marketplace Items (assets/marketplace/)
**Purpose**: Product images for buy/sell listings

**Files needed**:
- laptop.jpg (MacBook Pro)
- books.jpg (Textbook bundle)
- bike.jpg (Mountain bike)
- chair.jpg (Gaming chair)
- phone.jpg (iPhone)
- fridge.jpg (Mini refrigerator)

**Specifications**:
- Format: JPG or PNG
- Dimensions: 800x600px or 16:9 aspect ratio
- File size: < 200KB each
- Style: Clean product photos with neutral backgrounds

**Fallback**: Gray placeholder with image icon

---

### Resources (assets/resources/)
**Purpose**: Thumbnail images for learning resources

**Files needed**:
- mit-linear-algebra.jpg (MIT course thumbnail)
- freecodecamp.jpg (FreeCodeCamp logo/screenshot)
- statquest.jpg (StatQuest channel art)
- khan-cs.jpg (Khan Academy logo)

**Specifications**:
- Format: JPG or PNG
- Dimensions: 1200x630px (16:9 YouTube thumbnail size)
- File size: < 150KB each
- Style: Colorful, engaging thumbnails or logos

**Fallback**: Gradient background with icon (YouTube or web icon)

---

### Hostels (assets/hostels/)
**Purpose**: Photos of student housing options

**Files needed**:
- heights.jpg (University Heights Hostel)
- greenvalley.jpg (Green Valley Residence)
- campusview.jpg (Campus View Hostel)
- elite.jpg (Elite Student Residency)
- sunshine.jpg (Sunshine Hostel)
- techhub.jpg (Tech Hub Residence)

**Specifications**:
- Format: JPG
- Dimensions: 1200x800px or 3:2 aspect ratio
- File size: < 300KB each
- Style: Architectural/interior photos showing rooms, facilities, or exterior

**Fallback**: Gradient background with building icon

---

## Quick Setup

### Option 1: Use Your Own Images
1. Create the four folders listed above
2. Add images with the exact filenames specified
3. Ensure they meet the specifications

### Option 2: Use Placeholder Services
For testing, you can use online placeholder services:
- https://via.placeholder.com/200x200 (for avatars)
- https://picsum.photos/800/600 (for general images)

### Option 3: Leave Empty
The app is designed to work without images:
- Icons will display in place of missing images
- All functionality remains intact
- Placeholder backgrounds with icons

## Image Optimization Tips

1. **Compress images** before adding:
   - Use tools like TinyPNG, Squoosh, or ImageOptim
   - Target: 70-80% quality for JPG

2. **Proper naming**:
   - Use lowercase
   - Use hyphens (not spaces)
   - Be descriptive but concise

3. **Responsive images**:
   - Consider providing @2x versions for retina displays
   - Use appropriate formats (WebP for better compression)

4. **Accessibility**:
   - All images have alt text in the code
   - Ensure images are clear and recognizable

## Testing Without Images

The app will function perfectly without images:
- Chat: Shows user name initials or icon
- Marketplace: Shows placeholder with item category icon
- Resources: Shows resource type icon (YouTube/web/PDF)
- Hostels: Shows building icon
- Profile: Shows default avatar

All styling and layout will remain intact!

---

**Note**: This is a demonstration app using mock data. In a production environment, images would be uploaded by users or fetched from a CDN.
