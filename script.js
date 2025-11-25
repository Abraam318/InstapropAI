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
            // Add visible class immediately
            entry.target.classList.add('visible');
            // Stop observing once visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-in-left, .slide-in-right, .slide-in-down, .scale-in, .rotate-in, .fade-zoom'
);

animatedElements.forEach((el, index) => {
    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
        // If already visible, show immediately with slight delay
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 50);
    } else {
        // Otherwise observe for when it comes into view
        observer.observe(el);
    }
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

console.log('%cInstaprop AI', 'font-size: 24px; font-weight: bold; color: #10b981;');
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

// Wait for all libraries to load
window.addEventListener('load', () => {
    // Initialize everything after page fully loads
    initializeAll();
});

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
    
    // Try to initialize immediately, but also wait for load
    setTimeout(() => {
        initializeAll();
    }, 500);
});

function initializeAll() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        try {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                delay: 0
            });
            console.log('AOS initialized');
        } catch (e) {
            console.error('AOS initialization error:', e);
        }
    } else {
        console.warn('AOS not loaded');
    }
    
    // Initialize Charts - wait for Chart.js
    if (typeof Chart !== 'undefined') {
        try {
            initializeCharts();
            console.log('Charts initialized');
        } catch (e) {
            console.error('Chart initialization error:', e);
        }
    } else {
        // Retry after a delay if Chart.js hasn't loaded
        setTimeout(() => {
            if (typeof Chart !== 'undefined') {
                initializeCharts();
            } else {
                console.warn('Chart.js not loaded');
            }
        }, 1000);
    }
    
    // Initialize Typewriter Effect
    try {
        initializeTypewriter();
    } catch (e) {
        console.error('Typewriter error:', e);
    }
    
    // Initialize Animated Counters - check if already visible
    try {
        initializeCounters();
        // Also trigger immediately if elements are visible (hero stats are always visible)
        const counters = document.querySelectorAll('.hero-stat-number');
        counters.forEach(counter => {
            // Hero stats are always visible, so animate immediately
            if (!counter.classList.contains('counted')) {
                setTimeout(() => {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }, 500);
            }
        });
    } catch (e) {
        console.error('Counter error:', e);
    }
    
    // Initialize Magnetic Buttons
    try {
        initializeMagneticButtons();
    } catch (e) {
        console.error('Magnetic buttons error:', e);
    }
    
    // Initialize GSAP Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);
            initializeGSAPAnimations();
            console.log('GSAP initialized');
        } catch (e) {
            console.error('GSAP initialization error:', e);
        }
    } else {
        console.warn('GSAP not loaded');
    }
    
    // Initialize Particle Effect
    try {
        initializeParticles();
    } catch (e) {
        console.error('Particle error:', e);
    }
}

// ============================================
// Chart Initialization
// ============================================

function initializeCharts() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    
    // Market Growth Chart
    const marketGrowthCtx = document.getElementById('marketGrowthChart');
    if (marketGrowthCtx && !marketGrowthCtx.chart) {
        try {
            marketGrowthCtx.chart = new Chart(marketGrowthCtx, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                datasets: [{
                    label: 'MENA Real Estate Market (Trillions USD)',
                    data: [0.95, 1.0, 1.05, 1.1, 1.2, 1.35, 1.5],
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toFixed(2) + 'T';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 0.8,
                        max: 1.6,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toFixed(1) + 'T';
                            }
                        },
                        grid: {
                            color: 'rgba(16, 185, 129, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
            });
        } catch (e) {
            console.error('Market Growth Chart error:', e);
        }
    }
    
    // Digitization Chart
    const digitizationCtx = document.getElementById('digitizationChart');
    if (digitizationCtx && !digitizationCtx.chart) {
        try {
            digitizationCtx.chart = new Chart(digitizationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Digitized', 'Undigitized'],
                datasets: [{
                    data: [5, 95],
                    backgroundColor: [
                        'rgb(16, 185, 129)',
                        'rgba(16, 185, 129, 0.2)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12, weight: '500' },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return label + ': ' + value + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
            });
        } catch (e) {
            console.error('Digitization Chart error:', e);
        }
    }
    
    // Feature Adoption Chart
    const featureAdoptionCtx = document.getElementById('featureAdoptionChart');
    if (featureAdoptionCtx && !featureAdoptionCtx.chart) {
        try {
            featureAdoptionCtx.chart = new Chart(featureAdoptionCtx, {
            type: 'bar',
            data: {
                labels: ['AI Scanner', 'AI Assistant', 'Market Valuation', '24H Auctions', 'Portfolio Tracking', 'Fraud Detection'],
                datasets: [{
                    label: 'User Adoption Rate (%)',
                    data: [72, 68, 85, 58, 79, 64],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.9)',
                        'rgba(52, 211, 153, 0.9)',
                        'rgba(34, 197, 94, 0.9)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(52, 211, 153, 0.8)',
                        'rgba(34, 197, 94, 0.8)'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.x + '% adoption rate';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            color: '#64748b'
                        },
                        grid: {
                            color: 'rgba(16, 185, 129, 0.1)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
            });
        } catch (e) {
            console.error('Feature Adoption Chart error:', e);
        }
    }
    
    // Revenue Projection Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx && !revenueCtx.chart) {
        try {
            revenueCtx.chart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027', 'Q3 2027'],
                datasets: [{
                    label: 'Projected Revenue (Millions USD)',
                    data: [0.2, 0.8, 2.5, 5.2, 9.5, 16.0, 25.0],
                    borderColor: 'rgb(52, 211, 153)',
                    backgroundColor: 'rgba(52, 211, 153, 0.15)',
                    tension: 0.5,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: 'rgb(16, 185, 129)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toFixed(1) + 'M revenue';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 30,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            },
                            color: '#64748b'
                        },
                        grid: {
                            color: 'rgba(52, 211, 153, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#64748b',
                            maxRotation: 45,
                            minRotation: 45
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
            });
        } catch (e) {
            console.error('Revenue Chart error:', e);
        }
    }
}

// ============================================
// Typewriter Effect
// ============================================

function initializeTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    // Don't clear if already has content
    if (typewriterElement.dataset.initialized) return;
    typewriterElement.dataset.initialized = 'true';
    
    const originalText = typewriterElement.textContent.trim() || 'Buy & Sell Real Estate Instantly';
    typewriterElement.textContent = '';
    typewriterElement.style.opacity = '1';
    let index = 0;
    
    function type() {
        if (index < originalText.length) {
            typewriterElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(type, 80);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 500);
}

// ============================================
// Animated Counters
// ============================================

function initializeCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    counters.forEach(counter => {
        observer.observe(counter);
        // Also check if already visible
        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            if (!counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        }
    });
}

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? target : target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }
    }, 16);
}

// ============================================
// Magnetic Buttons
// ============================================

function initializeMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.15;
            const moveY = y * 0.15;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// GSAP Animations
// ============================================

function initializeGSAPAnimations() {
    try {
        // Animate gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        if (orbs.length > 0) {
            gsap.to('.gradient-orb', {
                y: '+=30',
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                stagger: 0.5
            });
        }
        
    // Enhanced feature card animations
    gsap.utils.toArray('.feature-card-animated').forEach((card, i) => {
        if (card && !card.dataset.gsapAnimated) {
            card.dataset.gsapAnimated = 'true';
            
            // Stagger entrance animation
            gsap.from(card, {
                opacity: 0,
                y: 50,
                scale: 0.9,
                rotation: -5,
                duration: 0.8,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: i * 0.1
            });
            
            // Add hover animation - but don't override CSS
            card.addEventListener('mouseenter', function() {
                // Let CSS handle the hover, just ensure visibility
                this.style.opacity = '1';
                this.style.visibility = 'visible';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset z-index but keep visible
                this.style.zIndex = '1';
            });
        }
    });
    
    // Fade in other cards on scroll
    gsap.utils.toArray('.testimonial-card, .team-card').forEach((card, i) => {
        if (card && !card.dataset.gsapAnimated) {
            card.dataset.gsapAnimated = 'true';
            gsap.from(card, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                delay: (i % 3) * 0.1
            });
        }
    });
    } catch (e) {
        console.error('GSAP animation error:', e);
    }
}

// ============================================
// Particle Effect
// ============================================

function initializeParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    try {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        
        const particles = [];
        const particleCount = 30;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = `rgba(52, 211, 153, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        let animationId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
        
        const resizeHandler = () => {
            resizeCanvas();
            // Recreate particles on resize
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        
        window.addEventListener('resize', resizeHandler);
    } catch (e) {
        console.error('Particle animation error:', e);
    }
}

