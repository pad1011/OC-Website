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
    if (!e.target.closest('.main-nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Chatbot knowledge base
const chatbotKnowledge = {
    'property tax': {
        response: "You can pay your property tax online through our Tax Collector's office. Visit the Tax Collector section or call (407) 836-4500. You can also set up automatic payments for convenience.",
        links: [
            { text: 'Pay Property Tax Online', url: '#' },
            { text: 'Tax Payment Schedule', url: '#' }
        ]
    },
    'permits': {
        response: "Orange County offers various permits including building permits, zoning permits, and business licenses. You can apply online through our Permit Portal or visit the Planning & Development office.",
        links: [
            { text: 'Apply for Building Permit', url: '#' },
            { text: 'Business License Application', url: '#' }
        ]
    },
    'public records': {
        response: "Public records can be requested through our Clerk of Courts office. You can submit requests online or in person. Some records may be available immediately while others require processing time.",
        links: [
            { text: 'Request Public Records', url: '#' },
            { text: 'Records FAQ', url: '#' }
        ]
    },
    'parks': {
        response: "Orange County has over 30 parks with various amenities including playgrounds, sports facilities, and nature trails. Visit our Parks & Recreation page to find a park near you.",
        links: [
            { text: 'Find a Park', url: '#' },
            { text: 'Reserve Park Facilities', url: '#' }
        ]
    },
    'waste': {
        response: "Waste collection schedules vary by area. You can find your collection schedule online by entering your address. We also offer recycling services and hazardous waste disposal.",
        links: [
            { text: 'Find Collection Schedule', url: '#' },
            { text: 'Recycling Guidelines', url: '#' }
        ]
    },
    'library': {
        response: "Orange County Library System has multiple branches throughout the county. You can check out books, access digital resources, and attend community programs. Library cards are free!",
        links: [
            { text: 'Find a Library Branch', url: '#' },
            { text: 'Get a Library Card', url: '#' }
        ]
    },
    'hours': {
        response: "Most Orange County offices are open Monday-Friday, 8:00 AM - 5:00 PM. Some offices have extended hours. Please check the specific department for their hours of operation.",
        links: [
            { text: 'Department Directory', url: '#' }
        ]
    },
    'employment': {
        response: "Orange County is always looking for talented individuals to join our team. Current job openings are posted on our employment portal. We offer competitive salaries and excellent benefits.",
        links: [
            { text: 'View Job Openings', url: '#' },
            { text: 'Employee Benefits', url: '#' }
        ]
    },
    'emergency': {
        response: "For emergencies, always call 911. For non-emergency assistance, contact Orange County Sheriff's Office at (407) 836-4357. Visit our Emergency Services page for preparedness resources.",
        links: [
            { text: 'Emergency Services', url: '#' },
            { text: 'Hurricane Preparedness', url: '#' }
        ]
    },
    'contact': {
        response: "Orange County Government Center is located at 201 S. Rosalind Avenue, Orlando, FL 32801. Main phone: (407) 836-7370. You can also contact specific departments directly.",
        links: [
            { text: 'Department Directory', url: '#' },
            { text: 'Send Feedback', url: '#' }
        ]
    }
};

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Simulate bot typing
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response.text, 'bot', response.links);
    }, 800);
}

// Add message to chat
function addMessage(text, sender, links = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = sender === 'bot' ? '<img src="images/rai-logo.svg" alt="RAI" class="avatar-img">' : '<i class="fas fa-user"></i>';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';

    const textP = document.createElement('p');
    textP.textContent = text;
    contentDiv.appendChild(textP);

    // Add links if provided
    if (links && links.length > 0) {
        const linksDiv = document.createElement('div');
        linksDiv.className = 'quick-replies';
        linksDiv.style.marginTop = '10px';

        links.forEach(link => {
            const linkBtn = document.createElement('a');
            linkBtn.href = link.url;
            linkBtn.className = 'quick-reply';
            linkBtn.textContent = link.text;
            linkBtn.style.textDecoration = 'none';
            linkBtn.style.display = 'inline-block';
            linksDiv.appendChild(linkBtn);
        });

        contentDiv.appendChild(linksDiv);
    }

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Get bot response based on user message
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for keywords in knowledge base
    for (const [key, value] of Object.entries(chatbotKnowledge)) {
        if (lowerMessage.includes(key) || lowerMessage.includes(key.replace(' ', ''))) {
            return { text: value.response, links: value.links };
        }
    }

    // Check for greetings
    if (lowerMessage.match(/\b(hi|hello|hey|good morning|good afternoon)\b/)) {
        return {
            text: "Hello! I'm RAI, your Orange County virtual assistant. I can help you with property taxes, permits, public records, parks, and more. How can I assist you today?",
            links: []
        };
    }

    // Check for thank you
    if (lowerMessage.match(/\b(thanks|thank you|appreciate)\b/)) {
        return {
            text: "You're welcome! Is there anything else I can help you with today?",
            links: []
        };
    }

    // Default response with suggestions
    return {
        text: "I'm not sure about that specific question, but I can help you with:\n\n• Property Tax Payments\n• Permits and Licenses\n• Public Records Requests\n• Parks and Recreation\n• Waste Collection\n• Employment Opportunities\n\nWhat would you like to know more about?",
        links: [
            { text: 'Contact Us', url: '#contact' },
            { text: 'Search Website', url: '#' }
        ]
    };
}

// Send button click
chatbotSend.addEventListener('click', sendMessage);

// Enter key to send
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick reply buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-reply') && e.target.hasAttribute('data-query')) {
        e.preventDefault();
        const query = e.target.getAttribute('data-query');
        chatbotInput.value = query;
        sendMessage();
    }
});

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
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        newsletterForm.reset();
    });
}

// Department cards click effect
document.querySelectorAll('.department-card').forEach(card => {
    card.addEventListener('click', () => {
        const department = card.querySelector('h3').textContent;
        alert(`Navigating to ${department}...`);
    });
});

// Quick access cards analytics (could be connected to real analytics)
document.querySelectorAll('.quick-access-card').forEach(card => {
    card.addEventListener('click', () => {
        const service = card.querySelector('h3').textContent;
        console.log(`User clicked on: ${service}`);
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
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.quick-access-card, .news-card, .department-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize chatbot with welcome message (already in HTML)
console.log('Orange County Website initialized successfully!');
