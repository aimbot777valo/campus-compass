// Main application logic for Student Welfare Community
// Handles routing, page rendering, and user interactions

// ===================================
// STATE MANAGEMENT
// ===================================
const AppState = {
    currentPage: 'dashboard',
    currentUser: null,
    blockedUsers: [],
    chatMessages: [],
    marketplaceItems: [],
    qnaPosts: [],
    resources: null,
    hostels: [],
    achievements: [],
    announcements: [],
    
    init() {
        this.loadFromLocalStorage();
    },
    
    loadFromLocalStorage() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || MOCK_DATA.currentUser;
        this.blockedUsers = JSON.parse(localStorage.getItem('blockedUsers')) || [];
        this.chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || MOCK_DATA.chatMessages;
        this.marketplaceItems = JSON.parse(localStorage.getItem('marketplaceItems')) || MOCK_DATA.marketplaceItems;
        this.qnaPosts = JSON.parse(localStorage.getItem('qnaPosts')) || MOCK_DATA.qnaPosts;
        this.resources = JSON.parse(localStorage.getItem('resources')) || MOCK_DATA.resources;
        this.hostels = JSON.parse(localStorage.getItem('hostels')) || MOCK_DATA.hostels;
        this.achievements = JSON.parse(localStorage.getItem('achievements')) || MOCK_DATA.achievements;
        this.announcements = JSON.parse(localStorage.getItem('announcements')) || MOCK_DATA.announcements;
    },
    
    save(key, data) {
        this[key] = data;
        localStorage.setItem(key, JSON.stringify(data));
    }
};

// ===================================
// UTILITY FUNCTIONS
// ===================================
function formatTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };
    
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showModal(title, bodyHTML, footerHTML = '') {
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = `
        <div class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${title}</h2>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${bodyHTML}
                </div>
                ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById('modalContainer').innerHTML = '';
}

function getUserById(userId) {
    return MOCK_DATA.users.find(u => u.id === userId) || AppState.currentUser;
}

function isUserBlocked(userId) {
    return AppState.blockedUsers.includes(userId);
}

// ===================================
// NAVIGATION & ROUTING
// ===================================
function initNavigation() {
    // Desktop sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Bottom navigation
    document.querySelectorAll('.bottom-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
            
            document.querySelectorAll('.bottom-nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile sidebar if open
            closeMobileSidebar();
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    menuToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay?.addEventListener('click', closeMobileSidebar);
    
    // Sidebar collapse toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    // Load initial page
    const hash = window.location.hash.slice(1) || 'dashboard';
    navigateToPage(hash);
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function navigateToPage(pageName) {
    AppState.currentPage = pageName;
    window.location.hash = pageName;
    
    const pageContent = document.getElementById('pageContent');
    
    const pages = {
        dashboard: renderDashboard,
        chat: renderChat,
        marketplace: renderMarketplace,
        qna: renderQnA,
        resources: renderResources,
        hostels: renderHostels,
        blocks: renderBlocks,
        ratings: renderRatings,
        achievements: renderAchievements,
        announcements: renderAnnouncements,
        profile: renderProfile
    };
    
    const renderFunction = pages[pageName] || renderDashboard;
    pageContent.innerHTML = renderFunction();
    
    // Initialize page-specific functionality
    initPageFunctionality(pageName);
}

// ===================================
// PAGE RENDERERS
// ===================================

function renderDashboard() {
    const stats = MOCK_DATA.dashboardStats;
    const recentAnnouncements = AppState.announcements.slice(0, 3);
    const earnedAchievements = AppState.achievements.filter(a => a.earned).slice(0, 4);
    
    return `
        <div class="page-header">
            <h1 class="page-title">Dashboard</h1>
            <p class="page-subtitle">Welcome back, ${AppState.currentUser.name}!</p>
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <h3 style="font-size: 32px; font-weight: 700; color: var(--accent);">${stats.onlineStudents}</h3>
                    <p class="text-muted">Students Online</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h3 style="font-size: 32px; font-weight: 700; color: var(--accent-2);">${stats.resourcesAdded}</h3>
                    <p class="text-muted">Resources Added</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h3 style="font-size: 32px; font-weight: 700; color: var(--success);">${stats.hostelReviews}</h3>
                    <p class="text-muted">Hostel Reviews</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h3 style="font-size: 32px; font-weight: 700; color: var(--warning);">${stats.activeListings}</h3>
                    <p class="text-muted">Active Listings</p>
                </div>
            </div>
        </div>
        
        <!-- Quick Search -->
        <div class="card mb-3">
            <div class="card-body">
                <input type="text" class="form-input" placeholder="Search across all sections..." id="globalSearch">
            </div>
        </div>
        
        <!-- Two Column Layout -->
        <div class="grid grid-2">
            <!-- Recent Announcements -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">📢 Recent Announcements</h2>
                    <a href="#announcements" class="btn btn-secondary btn-icon" title="View all">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
                <div class="card-body">
                    ${recentAnnouncements.map(ann => `
                        <div style="padding: 12px 0; border-bottom: 1px solid var(--border);">
                            <div class="flex-between">
                                <strong>${ann.title}</strong>
                                <span class="text-muted" style="font-size: 12px;">${formatTimeAgo(ann.date)}</span>
                            </div>
                            <p class="text-muted" style="font-size: 13px; margin-top: 4px;">${ann.content.substring(0, 100)}...</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Achievements -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">🏆 Recent Achievements</h2>
                    <a href="#achievements" class="btn btn-secondary btn-icon" title="View all">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
                <div class="card-body">
                    <div class="grid grid-2 gap-2">
                        ${earnedAchievements.map(ach => `
                            <div style="text-align: center; padding: 16px; background: var(--glass); border-radius: var(--radius-sm);">
                                <div style="font-size: 36px; margin-bottom: 8px;">${ach.icon}</div>
                                <strong style="font-size: 13px;">${ach.name}</strong>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderChat() {
    const messages = AppState.chatMessages.filter(msg => !isUserBlocked(msg.userId));
    
    return `
        <div class="page-header">
            <h1 class="page-title">General Chat</h1>
            <p class="page-subtitle">Connect with fellow students</p>
        </div>
        
        <div class="card" style="height: calc(100vh - 280px); display: flex; flex-direction: column;">
            <!-- Chat Messages -->
            <div id="chatMessages" style="flex: 1; overflow-y: auto; padding: var(--spacing-lg); display: flex; flex-direction: column; gap: var(--spacing-md);">
                ${messages.map(msg => {
                    const user = getUserById(msg.userId);
                    const isCurrentUser = msg.userId === AppState.currentUser.id;
                    return `
                        <div class="flex gap-2" style="align-items: flex-start; ${isCurrentUser ? 'flex-direction: row-reverse;' : ''}">
                            <img src="${user.avatar}" alt="${user.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
                            <div style="max-width: 70%; ${isCurrentUser ? 'text-align: right;' : ''}">
                                <div class="flex gap-2" style="align-items: center; margin-bottom: 4px; ${isCurrentUser ? 'flex-direction: row-reverse;' : ''}">
                                    <strong style="font-size: 13px;">${user.name}</strong>
                                    <span class="text-muted" style="font-size: 11px;">${formatTimeAgo(msg.timestamp)}</span>
                                </div>
                                <div style="background: ${isCurrentUser ? 'linear-gradient(135deg, var(--accent), var(--accent-2))' : 'var(--glass)'}; padding: 12px 16px; border-radius: var(--radius); color: ${isCurrentUser ? 'white' : 'var(--text)'};">
                                    ${msg.text}
                                </div>
                                <div class="flex gap-2 mt-1" style="${isCurrentUser ? 'justify-content: flex-end;' : ''}">
                                    <button class="btn btn-icon" style="background: none; padding: 4px 8px; font-size: 12px;" onclick="reactToMessage('${msg.id}', 'like')">
                                        <i class="fas fa-heart"></i> ${msg.reactions.like || 0}
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Chat Input -->
            <div style="border-top: 1px solid var(--border); padding: var(--spacing-lg); display: flex; gap: var(--spacing-md);">
                <input type="text" id="chatInput" class="form-input" placeholder="Type your message..." style="flex: 1;" onkeypress="if(event.key === 'Enter') sendChatMessage()">
                <button class="btn btn-primary" onclick="sendChatMessage()">
                    <i class="fas fa-paper-plane"></i> Send
                </button>
            </div>
        </div>
    `;
}

function renderMarketplace() {
    const items = AppState.marketplaceItems;
    
    return `
        <div class="page-header flex-between">
            <div>
                <h1 class="page-title">Buy & Sell</h1>
                <p class="page-subtitle">Student marketplace</p>
            </div>
            <button class="btn btn-primary" onclick="showCreateListingModal()">
                <i class="fas fa-plus"></i> Create Listing
            </button>
        </div>
        
        <!-- Filters -->
        <div class="card mb-3">
            <div class="card-body flex gap-2">
                <input type="text" id="marketSearch" class="form-input" placeholder="Search items..." style="flex: 1;" oninput="filterMarketplace()">
                <select id="categoryFilter" class="form-select" onchange="filterMarketplace()">
                    <option value="">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Books">Books</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Sports">Sports</option>
                    <option value="Appliances">Appliances</option>
                </select>
                <select id="sortFilter" class="form-select" onchange="filterMarketplace()">
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>
        </div>
        
        <!-- Items Grid -->
        <div id="marketplaceGrid" class="grid grid-3">
            ${items.map(item => `
                <div class="card" style="cursor: pointer;" onclick="showItemDetails('${item.id}')">
                    <div style="height: 200px; background: var(--glass); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md); display: flex; align-items: center; justify-content: center; overflow: hidden;">
                        <i class="fas fa-image" style="font-size: 48px; color: var(--text-muted);"></i>
                    </div>
                    <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${item.title}</h3>
                    <p class="text-muted" style="font-size: 13px; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${item.description}</p>
                    <div class="flex-between mb-2">
                        <strong style="font-size: 20px; color: var(--accent);">$${item.price}</strong>
                        <span style="background: var(--success); color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px;">${item.condition}</span>
                    </div>
                    <div class="flex-between" style="font-size: 12px; color: var(--text-muted);">
                        <span><i class="fas fa-user"></i> ${item.sellerName}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderQnA() {
    const posts = AppState.qnaPosts.sort((a, b) => b.votes - a.votes);
    
    return `
        <div class="page-header flex-between">
            <div>
                <h1 class="page-title">Q&A Forum</h1>
                <p class="page-subtitle">Ask questions, share knowledge</p>
            </div>
            <button class="btn btn-primary" onclick="showAskQuestionModal()">
                <i class="fas fa-plus"></i> Ask Question
            </button>
        </div>
        
        <!-- Questions List -->
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
            ${posts.map(post => `
                <div class="card" style="cursor: pointer;" onclick="showQuestionDetails('${post.id}')">
                    <div class="card-body">
                        <div class="flex gap-2 mb-2">
                            <img src="${post.userAvatar}" alt="${post.userName}" style="width: 40px; height: 40px; border-radius: 50%;">
                            <div style="flex: 1;">
                                <div class="flex-between mb-1">
                                    <strong>${post.userName}</strong>
                                    <span class="text-muted" style="font-size: 12px;">${formatTimeAgo(post.postedDate)}</span>
                                </div>
                                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">${post.title}</h3>
                                <p class="text-muted" style="font-size: 14px; margin-bottom: 12px;">${post.content}</p>
                                
                                <!-- Tags -->
                                <div class="flex gap-1 mb-2" style="flex-wrap: wrap;">
                                    ${post.tags.map(tag => `
                                        <span style="background: var(--glass); padding: 4px 12px; border-radius: 12px; font-size: 12px; color: var(--accent);">#${tag}</span>
                                    `).join('')}
                                </div>
                                
                                <!-- Stats -->
                                <div class="flex gap-3" style="font-size: 13px; color: var(--text-muted);">
                                    <span><i class="fas fa-arrow-up" style="color: var(--success);"></i> ${post.votes} votes</span>
                                    <span><i class="fas fa-comment"></i> ${post.answerCount} answers</span>
                                    <span><i class="fas fa-eye"></i> ${post.views} views</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderResources() {
    const visual = AppState.resources.visual;
    const text = AppState.resources.text;
    
    return `
        <div class="page-header">
            <h1 class="page-title">Resources</h1>
            <p class="page-subtitle">Learning materials and study aids</p>
        </div>
        
        <!-- Tabs -->
        <div class="card mb-3">
            <div class="card-body flex gap-2">
                <button class="btn btn-primary" id="visualTab" onclick="switchResourceTab('visual')">
                    <i class="fas fa-play-circle"></i> Visual Resources
                </button>
                <button class="btn btn-secondary" id="textTab" onclick="switchResourceTab('text')">
                    <i class="fas fa-file-pdf"></i> Text Resources
                </button>
            </div>
        </div>
        
        <!-- Visual Resources -->
        <div id="visualResources" class="grid grid-2">
            ${visual.map(res => `
                <div class="card">
                    <div style="height: 180px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md); display: flex; align-items: center; justify-content: center;">
                        <i class="fas ${res.type === 'YouTube' ? 'fa-youtube' : 'fa-globe'}" style="font-size: 48px; color: white;"></i>
                    </div>
                    <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${res.title}</h3>
                    <p class="text-muted" style="font-size: 13px; margin-bottom: 12px;">${res.description}</p>
                    <div class="flex-between mb-2">
                        <div class="flex gap-1">
                            ${[...Array(5)].map((_, i) => `
                                <i class="fas fa-star" style="color: ${i < Math.round(res.rating) ? 'var(--warning)' : 'var(--border)'}; font-size: 12px;"></i>
                            `).join('')}
                            <span style="font-size: 12px; color: var(--text-muted);">${res.rating}</span>
                        </div>
                        <span style="background: var(--glass); padding: 4px 8px; border-radius: 8px; font-size: 11px;">${res.type}</span>
                    </div>
                    <a href="${res.url}" target="_blank" class="btn btn-primary" style="width: 100%;">
                        <i class="fas fa-external-link-alt"></i> Visit Resource
                    </a>
                </div>
            `).join('')}
        </div>
        
        <!-- Text Resources (Hidden by default) -->
        <div id="textResources" class="grid grid-2" style="display: none;">
            ${text.map(res => `
                <div class="card">
                    <div style="height: 180px; background: var(--glass); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-file-pdf" style="font-size: 48px; color: var(--danger);"></i>
                    </div>
                    <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${res.title}</h3>
                    <p class="text-muted" style="font-size: 13px; margin-bottom: 12px;">${res.description}</p>
                    <div class="flex-between mb-2">
                        <span style="font-size: 12px; color: var(--text-muted);"><i class="fas fa-download"></i> ${res.downloads} downloads</span>
                        <span style="font-size: 12px; color: var(--text-muted);">${res.fileSize}</span>
                    </div>
                    <button class="btn btn-primary" style="width: 100%;" onclick="showToast('PDF preview would open here', 'success')">
                        <i class="fas fa-eye"></i> Preview PDF
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function renderHostels() {
    const hostels = AppState.hostels;
    
    return `
        <div class="page-header">
            <h1 class="page-title">Hostels</h1>
            <p class="page-subtitle">Find your perfect accommodation</p>
        </div>
        
        <!-- Hostels Grid -->
        <div class="grid grid-2">
            ${hostels.map(hostel => {
                const avgRating = hostel.rating;
                return `
                    <div class="card" style="cursor: pointer;" onclick="showHostelDetails('${hostel.id}')">
                        <div style="height: 200px; background: linear-gradient(135deg, var(--panel-hover), var(--border)); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md); display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-building" style="font-size: 48px; color: var(--text-muted);"></i>
                        </div>
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">${hostel.name}</h3>
                        <p class="text-muted" style="font-size: 13px; margin-bottom: 12px;">${hostel.description}</p>
                        
                        <!-- Rating -->
                        <div class="flex-between mb-2">
                            <div class="flex gap-1">
                                ${[...Array(5)].map((_, i) => `
                                    <i class="fas fa-star" style="color: ${i < Math.round(avgRating) ? 'var(--warning)' : 'var(--border)'}; font-size: 14px;"></i>
                                `).join('')}
                                <span style="font-weight: 600;">${avgRating}</span>
                                <span class="text-muted" style="font-size: 12px;">(${hostel.reviewCount} reviews)</span>
                            </div>
                        </div>
                        
                        <!-- Info -->
                        <div class="flex-between mb-2" style="font-size: 13px;">
                            <span><i class="fas fa-dollar-sign" style="color: var(--success);"></i> $${hostel.avgPrice}/month</span>
                            <span><i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> ${hostel.distance}</span>
                        </div>
                        
                        <!-- Amenities -->
                        <div class="flex gap-1" style="flex-wrap: wrap;">
                            ${hostel.amenities.slice(0, 3).map(amenity => `
                                <span style="background: var(--glass); padding: 4px 8px; border-radius: 8px; font-size: 11px;">${amenity}</span>
                            `).join('')}
                            ${hostel.amenities.length > 3 ? `<span style="background: var(--glass); padding: 4px 8px; border-radius: 8px; font-size: 11px;">+${hostel.amenities.length - 3} more</span>` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderBlocks() {
    const blockedUsers = AppState.blockedUsers.map(id => getUserById(id));
    
    return `
        <div class="page-header">
            <h1 class="page-title">Blocks & Reports</h1>
            <p class="page-subtitle">Manage blocked users and reports</p>
        </div>
        
        <!-- Blocked Users -->
        <div class="card mb-3">
            <div class="card-header">
                <h2 class="card-title">Blocked Users</h2>
            </div>
            <div class="card-body">
                ${blockedUsers.length === 0 ? `
                    <p class="text-muted text-center">No blocked users</p>
                ` : blockedUsers.map(user => `
                    <div class="flex-between" style="padding: 12px 0; border-bottom: 1px solid var(--border);">
                        <div class="flex gap-2">
                            <img src="${user.avatar}" alt="${user.name}" style="width: 40px; height: 40px; border-radius: 50%;">
                            <div>
                                <strong>${user.name}</strong>
                                <p class="text-muted" style="font-size: 12px;">${user.college} - ${user.year}</p>
                            </div>
                        </div>
                        <button class="btn btn-danger" onclick="unblockUser('${user.id}')">
                            <i class="fas fa-unlock"></i> Unblock
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Report Form -->
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Report User or Content</h2>
            </div>
            <div class="card-body">
                <form onsubmit="submitReport(event)">
                    <div class="form-group">
                        <label class="form-label">Report Type</label>
                        <select class="form-select" required>
                            <option value="">Select type</option>
                            <option value="user">User Behavior</option>
                            <option value="content">Inappropriate Content</option>
                            <option value="spam">Spam</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-textarea" required placeholder="Describe the issue..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-flag"></i> Submit Report
                    </button>
                </form>
            </div>
        </div>
    `;
}

function renderRatings() {
    return `
        <div class="page-header">
            <h1 class="page-title">Ratings Overview</h1>
            <p class="page-subtitle">Community ratings across categories</p>
        </div>
        
        <!-- Category Stats -->
        <div class="grid grid-3 mb-3">
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-building" style="font-size: 36px; color: var(--accent); margin-bottom: 12px;"></i>
                    <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">4.3</h3>
                    <p class="text-muted">Average Hostel Rating</p>
                    <p style="font-size: 12px; color: var(--text-muted);">495 reviews</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-book" style="font-size: 36px; color: var(--accent-2); margin-bottom: 12px;"></i>
                    <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">4.7</h3>
                    <p class="text-muted">Average Resource Rating</p>
                    <p style="font-size: 12px; color: var(--text-muted);">342 ratings</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <i class="fas fa-store" style="font-size: 36px; color: var(--success); margin-bottom: 12px;"></i>
                    <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 4px;">4.1</h3>
                    <p class="text-muted">Average Seller Rating</p>
                    <p style="font-size: 12px; color: var(--text-muted);">87 ratings</p>
                </div>
            </div>
        </div>
        
        <!-- Top Rated -->
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Top Rated This Month</h2>
            </div>
            <div class="card-body">
                <div class="grid grid-2">
                    <div>
                        <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--accent);">Top Hostels</h3>
                        ${AppState.hostels.sort((a, b) => b.rating - a.rating).slice(0, 3).map((h, i) => `
                            <div class="flex-between" style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                                <div class="flex gap-2">
                                    <span style="font-weight: 700; color: var(--text-muted);">#${i + 1}</span>
                                    <span>${h.name}</span>
                                </div>
                                <span style="color: var(--warning);"><i class="fas fa-star"></i> ${h.rating}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div>
                        <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--accent-2);">Top Resources</h3>
                        ${AppState.resources.visual.sort((a, b) => b.rating - a.rating).slice(0, 3).map((r, i) => `
                            <div class="flex-between" style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                                <div class="flex gap-2">
                                    <span style="font-weight: 700; color: var(--text-muted);">#${i + 1}</span>
                                    <span>${r.title}</span>
                                </div>
                                <span style="color: var(--warning);"><i class="fas fa-star"></i> ${r.rating}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAchievements() {
    const achievements = AppState.achievements;
    const earned = achievements.filter(a => a.earned);
    const inProgress = achievements.filter(a => !a.earned);
    
    return `
        <div class="page-header">
            <h1 class="page-title">Achievements</h1>
            <p class="page-subtitle">Track your progress and milestones</p>
        </div>
        
        <!-- Stats -->
        <div class="card mb-3">
            <div class="card-body">
                <div class="grid grid-3 text-center">
                    <div>
                        <h3 style="font-size: 32px; font-weight: 700; color: var(--accent);">${earned.length}</h3>
                        <p class="text-muted">Earned</p>
                    </div>
                    <div>
                        <h3 style="font-size: 32px; font-weight: 700; color: var(--accent-2);">${inProgress.length}</h3>
                        <p class="text-muted">In Progress</p>
                    </div>
                    <div>
                        <h3 style="font-size: 32px; font-weight: 700; color: var(--success);">${achievements.length}</h3>
                        <p class="text-muted">Total</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Earned Achievements -->
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: var(--spacing-md);">🏆 Earned Achievements</h2>
        <div class="grid grid-3 mb-3">
            ${earned.map(ach => `
                <div class="card">
                    <div class="card-body text-center">
                        <div style="font-size: 64px; margin-bottom: 12px;">${ach.icon}</div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${ach.name}</h3>
                        <p class="text-muted" style="font-size: 13px; margin-bottom: 12px;">${ach.description}</p>
                        <span style="background: var(--success); color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">
                            <i class="fas fa-check"></i> Earned ${formatDate(ach.earnedDate)}
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- In Progress -->
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: var(--spacing-md);">⏳ In Progress</h2>
        <div class="grid grid-3">
            ${inProgress.map(ach => `
                <div class="card">
                    <div class="card-body text-center">
                        <div style="font-size: 64px; margin-bottom: 12px; opacity: 0.5;">${ach.icon}</div>
                        <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${ach.name}</h3>
                        <p class="text-muted" style="font-size: 13px; margin-bottom: 12px;">${ach.description}</p>
                        
                        <!-- Progress Bar -->
                        <div style="background: var(--glass); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
                            <div style="background: linear-gradient(90deg, var(--accent), var(--accent-2)); height: 100%; width: ${ach.progress}%; transition: var(--transition);"></div>
                        </div>
                        <span style="font-size: 12px; color: var(--text-muted);">${ach.progress}% Complete</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderAnnouncements() {
    const announcements = AppState.announcements;
    
    return `
        <div class="page-header">
            <h1 class="page-title">Announcements</h1>
            <p class="page-subtitle">Stay updated with campus news</p>
        </div>
        
        <!-- Announcements List -->
        <div style="display: flex; flex-direction: column; gap: var(--spacing-md);">
            ${announcements.map(ann => {
                const priorityColors = {
                    high: 'var(--danger)',
                    medium: 'var(--warning)',
                    low: 'var(--success)'
                };
                return `
                    <div class="card" style="border-left: 4px solid ${priorityColors[ann.priority]};">
                        <div class="card-body">
                            <div class="flex-between mb-2">
                                <div class="flex gap-2" style="align-items: center;">
                                    <span style="font-size: 32px;">${ann.icon}</span>
                                    <div>
                                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 4px;">${ann.title}</h3>
                                        <p style="font-size: 12px; color: var(--text-muted);">
                                            <i class="fas fa-user"></i> ${ann.author} • 
                                            <i class="fas fa-clock"></i> ${formatTimeAgo(ann.date)} •
                                            <span style="text-transform: capitalize; color: ${priorityColors[ann.priority]};">
                                                <i class="fas fa-circle" style="font-size: 6px;"></i> ${ann.priority} priority
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <span style="background: var(--glass); padding: 6px 12px; border-radius: 8px; font-size: 12px; text-transform: capitalize;">${ann.category}</span>
                            </div>
                            <p style="font-size: 14px; line-height: 1.6;">${ann.content}</p>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderProfile() {
    const user = AppState.currentUser;
    
    return `
        <div class="page-header">
            <h1 class="page-title">Profile & Settings</h1>
            <p class="page-subtitle">Manage your account</p>
        </div>
        
        <div class="grid grid-2">
            <!-- Profile Card -->
            <div class="card">
                <div class="card-body text-center">
                    <img src="${user.avatar}" alt="${user.name}" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 16px; border: 4px solid var(--accent);">
                    <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">${user.name}</h2>
                    <p class="text-muted" style="margin-bottom: 16px;">${user.email}</p>
                    
                    <div style="display: inline-block; background: var(--glass); padding: 8px 16px; border-radius: var(--radius-sm); margin-bottom: 16px;">
                        <i class="fas fa-graduation-cap" style="color: var(--accent);"></i> ${user.college}
                    </div>
                    
                    <div style="display: flex; gap: var(--spacing-md); justify-content: center; margin-bottom: 16px;">
                        <div style="text-align: center;">
                            <strong style="font-size: 20px; display: block; color: var(--accent);">${user.year}</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">Year</span>
                        </div>
                        <div style="text-align: center;">
                            <strong style="font-size: 20px; display: block; color: var(--accent-2);">${AppState.achievements.filter(a => a.earned).length}</strong>
                            <span style="font-size: 12px; color: var(--text-muted);">Achievements</span>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%;" onclick="showToast('Edit profile feature coming soon!', 'success')">
                        <i class="fas fa-edit"></i> Edit Profile
                    </button>
                </div>
            </div>
            
            <!-- Details -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Account Details</h2>
                </div>
                <div class="card-body">
                    <div style="margin-bottom: var(--spacing-md);">
                        <label style="font-weight: 600; display: block; margin-bottom: 4px;">Department</label>
                        <p class="text-muted">${user.department}</p>
                    </div>
                    <div style="margin-bottom: var(--spacing-md);">
                        <label style="font-weight: 600; display: block; margin-bottom: 4px;">Member Since</label>
                        <p class="text-muted">${formatDate(user.joinedDate)}</p>
                    </div>
                    <div style="margin-bottom: var(--spacing-md);">
                        <label style="font-weight: 600; display: block; margin-bottom: 8px;">Interests</label>
                        <div class="flex gap-1" style="flex-wrap: wrap;">
                            ${user.interests.map(interest => `
                                <span style="background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: white; padding: 6px 12px; border-radius: 12px; font-size: 12px;">${interest}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid var(--border); margin: var(--spacing-lg) 0;">
                    
                    <h3 style="font-size: 16px; font-weight: 600; margin-bottom: var(--spacing-md);">Settings</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
                        <button class="btn btn-secondary" style="justify-content: flex-start;">
                            <i class="fas fa-bell"></i> Notification Preferences
                        </button>
                        <button class="btn btn-secondary" style="justify-content: flex-start;">
                            <i class="fas fa-lock"></i> Privacy Settings
                        </button>
                        <button class="btn btn-secondary" style="justify-content: flex-start;" onclick="exportData()">
                            <i class="fas fa-download"></i> Export My Data
                        </button>
                        <button class="btn btn-danger" style="justify-content: flex-start;" onclick="clearAllData()">
                            <i class="fas fa-trash"></i> Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// PAGE-SPECIFIC FUNCTIONALITY
// ===================================

function initPageFunctionality(pageName) {
    if (pageName === 'chat') {
        // Auto-scroll chat to bottom
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Start mock message simulation
        startMockChatSimulation();
    }
}

// Chat functions
let mockChatInterval;

function startMockChatSimulation() {
    // Clear any existing interval
    if (mockChatInterval) clearInterval(mockChatInterval);
    
    // Add a new mock message every 10-20 seconds
    mockChatInterval = setInterval(() => {
        if (AppState.currentPage === 'chat') {
            const mockMessages = [
                "Anyone up for a study group?",
                "The cafeteria food is actually good today!",
                "Does anyone have notes from yesterday's lecture?",
                "Looking for a study buddy for finals",
                "Just finished the assignment, feeling relieved!",
                "Who's going to the game this weekend?",
                "Library is packed today 📚",
                "Found a great coffee shop near campus!",
            ];
            
            const randomUser = MOCK_DATA.users[Math.floor(Math.random() * MOCK_DATA.users.length)];
            const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
            
            const newMessage = {
                id: `msg${Date.now()}`,
                userId: randomUser.id,
                text: randomMessage,
                timestamp: Date.now(),
                reactions: {}
            };
            
            AppState.chatMessages.push(newMessage);
            AppState.save('chatMessages', AppState.chatMessages);
            
            // Re-render chat
            document.getElementById('pageContent').innerHTML = renderChat();
            initPageFunctionality('chat');
        }
    }, 15000);
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const newMessage = {
        id: `msg${Date.now()}`,
        userId: AppState.currentUser.id,
        text: text,
        timestamp: Date.now(),
        reactions: {}
    };
    
    AppState.chatMessages.push(newMessage);
    AppState.save('chatMessages', AppState.chatMessages);
    
    input.value = '';
    
    // Re-render
    document.getElementById('pageContent').innerHTML = renderChat();
    initPageFunctionality('chat');
    
    showToast('Message sent!', 'success');
}

function reactToMessage(messageId, reactionType) {
    const message = AppState.chatMessages.find(m => m.id === messageId);
    if (message) {
        message.reactions[reactionType] = (message.reactions[reactionType] || 0) + 1;
        AppState.save('chatMessages', AppState.chatMessages);
        navigateToPage('chat');
        showToast('Reaction added!', 'success');
    }
}

// Marketplace functions
function filterMarketplace() {
    // This would filter the marketplace items based on search and filters
    showToast('Filtering marketplace...', 'success');
}

function showCreateListingModal() {
    showModal(
        'Create New Listing',
        `
            <form onsubmit="createListing(event)">
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-input" required placeholder="Item title">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" required placeholder="Describe your item..."></textarea>
                </div>
                <div class="grid grid-2">
                    <div class="form-group">
                        <label class="form-label">Price ($)</label>
                        <input type="number" class="form-input" required placeholder="0">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Condition</label>
                        <select class="form-select" required>
                            <option>Like New</option>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Category</label>
                    <select class="form-select" required>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Furniture</option>
                        <option>Sports</option>
                        <option>Appliances</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-input" required placeholder="Campus location">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-plus"></i> Create Listing
                </button>
            </form>
        `
    );
}

function createListing(event) {
    event.preventDefault();
    closeModal();
    showToast('Listing created successfully!', 'success');
    // In a real app, this would add the listing to the array
}

function showItemDetails(itemId) {
    const item = AppState.marketplaceItems.find(i => i.id === itemId);
    if (!item) return;
    
    showModal(
        item.title,
        `
            <div style="height: 250px; background: var(--glass); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-image" style="font-size: 64px; color: var(--text-muted);"></i>
            </div>
            <p style="margin-bottom: var(--spacing-md);">${item.description}</p>
            <div class="grid grid-2 gap-2" style="margin-bottom: var(--spacing-md);">
                <div><strong>Price:</strong> $${item.price}</div>
                <div><strong>Condition:</strong> ${item.condition}</div>
                <div><strong>Category:</strong> ${item.category}</div>
                <div><strong>Location:</strong> ${item.location}</div>
                <div><strong>Seller:</strong> ${item.sellerName}</div>
                <div><strong>Views:</strong> ${item.views}</div>
            </div>
            <div class="flex gap-1 mb-2" style="flex-wrap: wrap;">
                ${item.tags.map(tag => `
                    <span style="background: var(--accent); color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">#${tag}</span>
                `).join('')}
            </div>
        `,
        `
            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            <button class="btn btn-primary" onclick="closeModal(); showToast('Message sent to seller!', 'success');">
                <i class="fas fa-envelope"></i> Message Seller
            </button>
        `
    );
}

// Q&A functions
function showAskQuestionModal() {
    showModal(
        'Ask a Question',
        `
            <form onsubmit="askQuestion(event)">
                <div class="form-group">
                    <label class="form-label">Question Title</label>
                    <input type="text" class="form-input" required placeholder="What's your question?">
                </div>
                <div class="form-group">
                    <label class="form-label">Details</label>
                    <textarea class="form-textarea" required placeholder="Provide more context..."></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Tags (comma-separated)</label>
                    <input type="text" class="form-input" placeholder="e.g., computer-science, help">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    <i class="fas fa-question-circle"></i> Post Question
                </button>
            </form>
        `
    );
}

function askQuestion(event) {
    event.preventDefault();
    closeModal();
    showToast('Question posted successfully!', 'success');
}

function showQuestionDetails(questionId) {
    const question = AppState.qnaPosts.find(q => q.id === questionId);
    if (!question) return;
    
    showModal(
        question.title,
        `
            <div class="flex gap-2 mb-3">
                <img src="${question.userAvatar}" alt="${question.userName}" style="width: 48px; height: 48px; border-radius: 50%;">
                <div>
                    <strong>${question.userName}</strong>
                    <p class="text-muted" style="font-size: 12px;">${formatTimeAgo(question.postedDate)}</p>
                </div>
            </div>
            <p style="margin-bottom: var(--spacing-md);">${question.content}</p>
            <div class="flex gap-1 mb-3" style="flex-wrap: wrap;">
                ${question.tags.map(tag => `
                    <span style="background: var(--glass); padding: 4px 12px; border-radius: 12px; font-size: 12px; color: var(--accent);">#${tag}</span>
                `).join('')}
            </div>
            
            <hr style="border: none; border-top: 1px solid var(--border); margin: var(--spacing-lg) 0;">
            
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: var(--spacing-md);">
                ${question.answerCount} Answers
            </h3>
            
            ${question.answers && question.answers.length > 0 ? question.answers.map(answer => `
                <div style="padding: var(--spacing-md); background: ${answer.isAccepted ? 'var(--glass)' : 'transparent'}; border: 1px solid ${answer.isAccepted ? 'var(--success)' : 'var(--border)'}; border-radius: var(--radius-sm); margin-bottom: var(--spacing-md);">
                    ${answer.isAccepted ? '<span style="background: var(--success); color: white; padding: 4px 8px; border-radius: 8px; font-size: 11px; margin-bottom: 8px; display: inline-block;"><i class="fas fa-check"></i> Accepted Answer</span>' : ''}
                    <div class="flex gap-2 mb-2">
                        <img src="${answer.userAvatar}" alt="${answer.userName}" style="width: 36px; height: 36px; border-radius: 50%;">
                        <div>
                            <strong>${answer.userName}</strong>
                            <p class="text-muted" style="font-size: 12px;">${formatTimeAgo(answer.postedDate)}</p>
                        </div>
                    </div>
                    <p>${answer.content}</p>
                    <div class="flex gap-2 mt-2">
                        <button class="btn btn-icon btn-secondary" style="font-size: 12px;">
                            <i class="fas fa-arrow-up"></i> ${answer.votes}
                        </button>
                    </div>
                </div>
            `).join('') : '<p class="text-muted text-center">No answers yet. Be the first to answer!</p>'}
            
            <div class="form-group" style="margin-top: var(--spacing-lg);">
                <label class="form-label">Your Answer</label>
                <textarea class="form-textarea" placeholder="Write your answer..."></textarea>
                <button class="btn btn-primary mt-2" onclick="closeModal(); showToast('Answer posted!', 'success');">
                    Post Answer
                </button>
            </div>
        `
    );
}

// Resources functions
function switchResourceTab(tab) {
    document.getElementById('visualResources').style.display = tab === 'visual' ? 'grid' : 'none';
    document.getElementById('textResources').style.display = tab === 'text' ? 'grid' : 'none';
    
    document.getElementById('visualTab').className = tab === 'visual' ? 'btn btn-primary' : 'btn btn-secondary';
    document.getElementById('textTab').className = tab === 'text' ? 'btn btn-primary' : 'btn btn-secondary';
}

// Hostel functions
function showHostelDetails(hostelId) {
    const hostel = AppState.hostels.find(h => h.id === hostelId);
    if (!hostel) return;
    
    showModal(
        hostel.name,
        `
            <div style="height: 250px; background: linear-gradient(135deg, var(--panel-hover), var(--border)); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md); display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-building" style="font-size: 64px; color: var(--text-muted);"></i>
            </div>
            
            <p style="margin-bottom: var(--spacing-md);">${hostel.description}</p>
            
            <div class="grid grid-2 gap-2 mb-3">
                <div><strong>Average Rating:</strong> ${hostel.rating} ⭐</div>
                <div><strong>Reviews:</strong> ${hostel.reviewCount}</div>
                <div><strong>Price:</strong> $${hostel.avgPrice}/month</div>
                <div><strong>Distance:</strong> ${hostel.distance}</div>
            </div>
            
            <div class="mb-3">
                <strong style="display: block; margin-bottom: 8px;">Amenities:</strong>
                <div class="flex gap-1" style="flex-wrap: wrap;">
                    ${hostel.amenities.map(amenity => `
                        <span style="background: var(--glass); padding: 6px 12px; border-radius: 8px; font-size: 12px;">${amenity}</span>
                    `).join('')}
                </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid var(--border); margin: var(--spacing-lg) 0;">
            
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: var(--spacing-md);">Recent Reviews</h3>
            ${hostel.reviews.map(review => `
                <div style="padding: var(--spacing-md); background: var(--glass); border-radius: var(--radius-sm); margin-bottom: var(--spacing-md);">
                    <div class="flex gap-2 mb-2">
                        <img src="${review.userAvatar}" alt="${review.userName}" style="width: 36px; height: 36px; border-radius: 50%;">
                        <div style="flex: 1;">
                            <div class="flex-between">
                                <strong>${review.userName}</strong>
                                <div class="flex gap-1">
                                    ${[...Array(5)].map((_, i) => `
                                        <i class="fas fa-star" style="color: ${i < review.rating ? 'var(--warning)' : 'var(--border)'}; font-size: 12px;"></i>
                                    `).join('')}
                                </div>
                            </div>
                            <p class="text-muted" style="font-size: 12px;">${formatTimeAgo(review.date)}</p>
                        </div>
                    </div>
                    <p style="font-size: 14px;">${review.comment}</p>
                    <p class="text-muted" style="font-size: 12px; margin-top: 8px;">
                        <i class="fas fa-thumbs-up"></i> ${review.helpful} found this helpful
                    </p>
                </div>
            `).join('')}
        `,
        `
            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            <button class="btn btn-primary" onclick="closeModal(); showToast('Review form would open here', 'success');">
                <i class="fas fa-star"></i> Write Review
            </button>
        `
    );
}

// Block functions
function unblockUser(userId) {
    AppState.blockedUsers = AppState.blockedUsers.filter(id => id !== userId);
    AppState.save('blockedUsers', AppState.blockedUsers);
    navigateToPage('blocks');
    showToast('User unblocked', 'success');
}

function submitReport(event) {
    event.preventDefault();
    showToast('Report submitted. Thank you for helping keep our community safe.', 'success');
    event.target.reset();
}

// Profile functions
function exportData() {
    const data = {
        user: AppState.currentUser,
        chatMessages: AppState.chatMessages,
        marketplaceItems: AppState.marketplaceItems,
        qnaPosts: AppState.qnaPosts,
        achievements: AppState.achievements,
        blockedUsers: AppState.blockedUsers
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-data.json';
    link.click();
    
    showToast('Data exported successfully!', 'success');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.clear();
        showToast('All data cleared. Reloading...', 'warning');
        setTimeout(() => window.location.reload(), 1500);
    }
}

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    AppState.init();
    initNavigation();
});
