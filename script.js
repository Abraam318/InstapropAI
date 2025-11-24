// ============================================
// Navigation & Menu Toggle
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll Navigation
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Link Highlighting
// ============================================

const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = Array.from(navLinks);

function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink(); // Initial call

// ============================================
// Intersection Observer for Scroll Animations
// ============================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

// Enhanced observer with stagger support
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class with a small delay for smoother animation
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 50);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .slide-in-down, .scale-in, .rotate-in, .fade-zoom'
);

animatedElements.forEach((el, index) => {
    // Add stagger delay based on element position
    const delay = (index % 6) * 50; // Stagger every 6 elements
    el.style.transitionDelay = `${delay}ms`;
    observer.observe(el);
});

// Special observer for feature cards with enhanced stagger
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 80); // Stagger by 80ms for features
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe feature cards separately for better stagger effect
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    featureObserver.observe(card);
});

// ============================================
// Scroll to Top Button
// ============================================

const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Parallax Effect for Hero Background
// ============================================

const heroBackground = document.querySelector('.hero-background');
const gradientOrbs = document.querySelectorAll('.gradient-orb');

if (heroBackground && gradientOrbs.length > 0) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            gradientOrbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                orb.style.transform = `translateY(${yPos}px)`;
            });
        }
    });
}

// Enhanced feature cards animation is now handled above

// ============================================
// Problem Cards Hover Effect Enhancement
// ============================================

const problemCards = document.querySelectorAll('.problem-card');
problemCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Solution Items Animation
// ============================================

const solutionItems = document.querySelectorAll('.solution-item');
if (solutionItems.length > 0) {
    solutionItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// ============================================
// Stat Cards Counter Animation (Optional Enhancement)
// ============================================

const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateValue(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

function animateValue(element) {
    const text = element.textContent.trim();
    // Only animate if it's a number (not a symbol like <)
    if (text.match(/^\d+[%$TMBK]?$/)) {
        const hasSymbol = text.match(/[%$TMBK]/);
        const symbol = hasSymbol ? hasSymbol[0] : '';
        const num = parseFloat(text.replace(/[%$TMBK]/g, ''));
        
        if (isNaN(num)) return;
        
        const duration = 2000;
        const start = 0;
        const increment = num / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
                element.textContent = formatNumber(num) + symbol;
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current)) + symbol;
            }
        }, 16);
    }
}

function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// ============================================
// Step Cards Interactive Effect
// ============================================

const stepNumbers = document.querySelectorAll('.step-number');
stepNumbers.forEach((step, index) => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = `scale(1.15) rotate(${index % 2 === 0 ? 10 : -10}deg)`;
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ============================================
// Vision Pillars Interactive Effect
// ============================================

const pillars = document.querySelectorAll('.pillar');
pillars.forEach(pillar => {
    pillar.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    pillar.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Button Ripple Effect
// ============================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Lazy Loading Enhancement
// ============================================

// Add loading="lazy" to images if any are added in the future
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// ============================================
// Performance Optimization
// ============================================

// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ============================================
// Keyboard Navigation Support
// ============================================

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// Console Welcome Message
// ============================================

console.log('%cInstaprop AI', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cInstant. Intelligent. Transparent.', 'font-size: 14px; color: #6b7280;');
console.log('%cBuilding the future of real estate.', 'font-size: 12px; color: #9ca3af;');

// ============================================
// Enhanced Scroll Animations with Parallax
// ============================================

// Throttled parallax function for performance
function applyParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        const rect = header.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const rate = (rect.top - window.innerHeight / 2) * 0.02;
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Use throttled scroll for parallax
const throttledParallax = throttle(applyParallax, 16);
window.addEventListener('scroll', throttledParallax, { passive: true });

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Ensure all animations are ready
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Preload critical animations
    requestAnimationFrame(() => {
        // Force a repaint to ensure smooth animations
        document.body.offsetHeight;
    });
    
    // Add entrance animation to hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-tagline, .hero-subtitle, .hero-buttons');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

