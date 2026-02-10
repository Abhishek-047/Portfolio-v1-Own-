/* ============================================
   FUTURISTIC PORTFOLIO - JAVASCRIPT
   Clean & Optimized Code
   ============================================ */

// ============================================
// 1. PAGE SWITCHING FUNCTIONALITY
// ============================================

function switchPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.querySelector(`#page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ============================================
// 2. PARTICLE ANIMATION BACKGROUND
// ============================================

class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.particles = [];
        this.particleCount = window.innerWidth > 768 ? 50 : 20;
        this.init();
        window.addEventListener('resize', () => this.updateParticleCount());
    }

    init() {
        if (!this.container) return;
        this.container.innerHTML = '';
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        if (!this.container) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 20 + 15;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent-cyan);
            border-radius: 50%;
            opacity: 0.6;
            top: -10px;
            left: ${Math.random() * 100}%;
            animation: particle-float ${duration}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;

        this.container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            this.createParticle();
        }, (duration + 2) * 1000);
    }

    updateParticleCount() {
        const newCount = window.innerWidth > 768 ? 50 : 20;
        if (newCount !== this.particleCount) {
            this.particleCount = newCount;
            this.init();
        }
    }
}

// ============================================
// 3. NAVIGATION HANDLER
// ============================================

class NavigationHandler {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = link.getAttribute('data-page');
                switchPage(pageName);
            });
        });
    }
}

// ============================================
// 4. FORM HANDLING
// ============================================

class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        const name = data.name?.trim() || '';
        const email = data.email?.trim() || '';
        const subject = data.subject?.trim() || '';
        const message = data.message?.trim() || '';

        // Validate form
        if (!name || !email || !subject || !message) {
            this.showNotification('Please fill all fields correctly', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Simulate form submission
        this.showNotification('Message sent successfully! 🚀', 'success');
        this.form.reset();
        console.log('Form submitted:', { name, email, subject, message });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: rgba(0, 212, 255, 0.2);
            border: 2px solid var(--accent-cyan);
            color: var(--accent-cyan);
            border-radius: 0.5rem;
            z-index: 9999;
            font-family: var(--font-mono);
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// ============================================
// 5. BUTTON HANDLERS (Welcome Page)
// ============================================

class ButtonHandler {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.welcome-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = btn.getAttribute('data-page');
                if (page) {
                    switchPage(page);
                }
            });
        });
    }
}

// ============================================
// 6. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(element => {
            observer.observe(element);
        });
    }
}

// ============================================
// 7. SOCIAL LINKS
// ============================================

class SocialLinks {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.social-icon').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Add your social media URLs here
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }
}

// ============================================
// 8. PORTFOLIO LINKS
// ============================================

class PortfolioLinks {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.project-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') {
                    e.preventDefault();
                    this.showComingSoon();
                }
            });
        });
    }

    showComingSoon() {
        const notification = document.createElement('div');
        notification.className = 'notification notification-success';
        notification.textContent = 'Coming Soon! 🚀';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            background: rgba(0, 212, 255, 0.2);
            border: 2px solid var(--accent-cyan);
            color: var(--accent-cyan);
            border-radius: 0.5rem;
            z-index: 9999;
            font-family: var(--font-mono);
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// ============================================
// 9. INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem('particleContainer');
    
    // Initialize components
    new NavigationHandler();
    new FormHandler();
    new ButtonHandler();
    new ScrollAnimations();
    new SocialLinks();
    new PortfolioLinks();

    // Set default page
    switchPage('home');

    console.log('🚀 Portfolio loaded successfully!');
});
