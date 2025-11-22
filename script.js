// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.main-nav') && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileMenuToggle) {
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});

// Main Chatbot Functionality (Prominent Section)
const chatbotInputMain = document.getElementById('chatbot-input-main');
const chatbotSendMain = document.getElementById('chatbot-send-main');
const chatbotMessagesMain = document.getElementById('chatbot-messages-main');
const chatbotMinimize = document.getElementById('chatbot-minimize');
const chatbotFloatBtn = document.getElementById('chatbot-float-btn');
const chatbotSection = document.querySelector('.chatbot-section');

// Chatbot knowledge base with expanded content
const chatbotKnowledge = {
    'property tax': {
        response: "You can pay your property tax online through our Tax Collector's office. Visit the Tax Collector section or call (407) 836-4500. You can also set up automatic payments for convenience.",
        links: [
            { text: 'Pay Property Tax Online', url: '#' },
            { text: 'Tax Payment Schedule', url: '#' }
        ]
    },
    'permit': {
        response: "Orange County offers various permits including building permits, zoning permits, and business licenses. You can apply online through our Permit Portal or visit the Planning & Development office at the Government Center.",
        links: [
            { text: 'Apply for Building Permit', url: '#' },
            { text: 'Business License Application', url: '#' }
        ]
    },
    'building': {
        response: "For building permits and inspections, contact our Building Services department. We handle residential, commercial, and industrial construction permits. Most permits can be applied for online.",
        links: [
            { text: 'Building Permits', url: '#' },
            { text: 'Schedule Inspection', url: '#' }
        ]
    },
    'public records': {
        response: "Public records can be requested through our Clerk of Courts office. You can submit requests online or in person. Some records may be available immediately while others require processing time.",
        links: [
            { text: 'Request Public Records', url: '#' },
            { text: 'Records FAQ', url: '#' }
        ]
    },
    'park': {
        response: "Orange County has over 30 parks with various amenities including playgrounds, sports facilities, and nature trails. Visit our Parks & Recreation page to find a park near you and reserve facilities.",
        links: [
            { text: 'Find a Park', url: '#' },
            { text: 'Reserve Park Facilities', url: '#' }
        ]
    },
    'trash': {
        response: "Waste collection schedules vary by area. You can find your collection schedule online by entering your address. We also offer recycling services and hazardous waste disposal at designated facilities.",
        links: [
            { text: 'Find Collection Schedule', url: '#' },
            { text: 'Recycling Guidelines', url: '#' }
        ]
    },
    'waste': {
        response: "Our Solid Waste Management division provides collection services, recycling programs, and disposal facilities. For your collection schedule, enter your address on our website or call 311.",
        links: [
            { text: 'Collection Schedule', url: '#' },
            { text: 'Recycling Centers', url: '#' }
        ]
    },
    'recycling': {
        response: "Orange County offers comprehensive recycling services. We accept paper, cardboard, plastics #1-7, glass, and metals. Place recyclables in your blue bin on collection day. No sorting needed!",
        links: [
            { text: 'What Can Be Recycled', url: '#' },
            { text: 'Find Drop-off Location', url: '#' }
        ]
    },
    'contact': {
        response: "Orange County Government Center is located at 201 S. Rosalind Avenue, Orlando, FL 32801. Main phone: (407) 836-7370. For specific departments, visit our contact directory.",
        links: [
            { text: 'Department Directory', url: '#' },
            { text: 'Send Feedback', url: '#' }
        ]
    },
    'official': {
        response: "To contact county officials including the Mayor and Board of County Commissioners, visit our Government section. You can email, call, or attend public meetings held regularly at the Government Center.",
        links: [
            { text: 'Contact Officials', url: '#' },
            { text: 'Meeting Schedule', url: '#' }
        ]
    },
    'employment': {
        response: "Orange County is always looking for talented individuals to join our team. Current job openings are posted on our employment portal. We offer competitive salaries and excellent benefits including health insurance and retirement plans.",
        links: [
            { text: 'View Job Openings', url: '#' },
            { text: 'Employee Benefits', url: '#' }
        ]
    },
    'job': {
        response: "Search current job openings with Orange County government. We offer careers in various fields including administration, public safety, parks, engineering, and more. Apply online through our employment portal.",
        links: [
            { text: 'Browse Jobs', url: '#' },
            { text: 'Application Tips', url: '#' }
        ]
    }
};

// Send message function for main chatbot
function sendMessageMain() {
    if (!chatbotInputMain || !chatbotMessagesMain) return;

    const message = chatbotInputMain.value.trim();
    if (message === '') return;

    // Add user message
    addMessageMain(message, 'user');
    chatbotInputMain.value = '';

    // Simulate bot typing
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessageMain(response.text, 'bot', response.links);
    }, 800);
}

// Add message to main chat
function addMessageMain(text, sender, links = null) {
    if (!chatbotMessagesMain) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const textP = document.createElement('p');
    textP.textContent = text;
    contentDiv.appendChild(textP);

    // Add links if provided
    if (links && links.length > 0) {
        const linksDiv = document.createElement('div');
        linksDiv.style.display = 'flex';
        linksDiv.style.gap = '10px';
        linksDiv.style.marginTop = '12px';
        linksDiv.style.flexWrap = 'wrap';

        links.forEach(link => {
            const linkBtn = document.createElement('a');
            linkBtn.href = link.url;
            linkBtn.textContent = link.text;
            linkBtn.style.cssText = `
                padding: 8px 16px;
                background-color: var(--primary-teal);
                color: white;
                border-radius: 6px;
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 600;
                display: inline-block;
                transition: all 0.3s;
            `;
            linkBtn.addEventListener('mouseover', () => {
                linkBtn.style.backgroundColor = 'var(--primary-orange)';
            });
            linkBtn.addEventListener('mouseout', () => {
                linkBtn.style.backgroundColor = 'var(--primary-teal)';
            });
            linksDiv.appendChild(linkBtn);
        });

        contentDiv.appendChild(linksDiv);
    }

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatbotMessagesMain.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessagesMain.scrollTop = chatbotMessagesMain.scrollHeight;
}

// Get bot response based on user message
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for keywords in knowledge base
    for (const [key, value] of Object.entries(chatbotKnowledge)) {
        if (lowerMessage.includes(key)) {
            return { text: value.response, links: value.links };
        }
    }

    // Check for greetings
    if (lowerMessage.match(/\b(hi|hello|hey|good morning|good afternoon|greetings)\b/)) {
        return {
            text: "Hello! Welcome to Orange County's virtual assistant. I can help you with property taxes, permits, public records, parks, waste collection, employment, and much more. What would you like to know?",
            links: []
        };
    }

    // Check for thank you
    if (lowerMessage.match(/\b(thanks|thank you|appreciate|thx)\b/)) {
        return {
            text: "You're very welcome! I'm here 24/7 if you need any other assistance. Have a great day!",
            links: []
        };
    }

    // Check for bye/goodbye
    if (lowerMessage.match(/\b(bye|goodbye|see you|later)\b/)) {
        return {
            text: "Goodbye! Thank you for visiting Orange County's website. Come back anytime you need assistance!",
            links: []
        };
    }

    // Default response with suggestions
    return {
        text: "I'm not sure about that specific question, but I can help you with many services including:\n\n• Property Tax Payments\n• Permits and Licenses\n• Public Records Requests\n• Parks and Recreation\n• Waste Collection Schedules\n• Employment Opportunities\n• Contacting Officials\n\nWhat would you like to know more about?",
        links: [
            { text: 'Contact Us', url: '#contact' },
            { text: 'All Services', url: '#services' }
        ]
    };
}

// Event listeners for main chatbot
if (chatbotSendMain) {
    chatbotSendMain.addEventListener('click', sendMessageMain);
}

if (chatbotInputMain) {
    chatbotInputMain.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageMain();
        }
    });
}

// Suggestion chips click handler
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-chip')) {
        const query = e.target.getAttribute('data-query');
        if (query && chatbotInputMain) {
            // Remove suggestion chips
            const suggestionsContainer = document.querySelector('.quick-suggestions');
            if (suggestionsContainer) {
                suggestionsContainer.style.display = 'none';
            }

            // Add user message
            addMessageMain(query, 'user');

            // Get and add bot response
            setTimeout(() => {
                const response = getBotResponse(query);
                addMessageMain(response.text, 'bot', response.links);
            }, 800);
        }
    }
});

// Minimize chatbot (scroll to top of section)
if (chatbotMinimize) {
    chatbotMinimize.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Show floating button when scrolled past chatbot section
window.addEventListener('scroll', () => {
    if (!chatbotSection || !chatbotFloatBtn) return;

    const chatbotRect = chatbotSection.getBoundingClientRect();
    const isScrolledPast = chatbotRect.bottom < 0;

    if (isScrolledPast) {
        chatbotFloatBtn.style.display = 'flex';
    } else {
        chatbotFloatBtn.style.display = 'none';
    }

    // Header shadow effect
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    if (header) {
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
        }
    }
});

// Float button click - scroll to chatbot section
if (chatbotFloatBtn) {
    chatbotFloatBtn.addEventListener('click', () => {
        if (chatbotSection) {
            chatbotSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Focus on input after scroll
            setTimeout(() => {
                if (chatbotInputMain) {
                    chatbotInputMain.focus();
                }
            }, 1000);
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuToggle) {
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        }
    });
});

// Newsletter form submission
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        form.reset();
    });
});

// Quick service items tracking
document.querySelectorAll('.quick-service-item').forEach(item => {
    item.addEventListener('click', () => {
        const service = item.querySelector('span').textContent;
        console.log(`User accessed quick service: ${service}`);
    });
});

// Service cards tracking
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const service = card.querySelector('h3').textContent;
        console.log(`User viewed service: ${service}`);
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .news-card, .department-card, .quick-service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Search functionality (basic implementation)
const searchInput = document.querySelector('.header-search input');
const searchBtn = document.querySelector('.header-search .search-btn');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: "${query}"\n\nThis would redirect to search results page.`);
            searchInput.value = '';
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                alert(`Searching for: "${query}"\n\nThis would redirect to search results page.`);
                searchInput.value = '';
            }
        }
    });
}

// Console log for successful initialization
console.log('🍊 Orange County Florida Website initialized successfully!');
console.log('✅ All interactive features loaded');
console.log('🤖 AI Chatbot ready to assist');
console.log('🌐 Translation widget enabled');
