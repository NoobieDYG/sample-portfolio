
const config = {
    
    links: {
        email: 'jmd2k23@gmail.com',
        linkedin: 'https://linkedin.com/in/affaanjaweed',
        github: 'https://github.com/NoobieDYG',
        instagram: 'https://instagram.com/noobie.dyg',
        resume: 'https://drive.google.com/file/d/1_LQSAz1J-fmG9B-fmXMWHMSiDiB1bcxZ/view?usp=drive_link' 
    },
    projects: {
        project1: {
            demo: 'https://crowdflow-vtia.onrender.com', 
            code: 'https://github.com/NoobieDYG/R3GE-CrowdFlow'  
        },
        project2: {
            //demo: '#', 
            code: 'https://github.com/NoobieDYG/store_managment'  
        }
    }
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize all portfolio functionality
function initializePortfolio() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupContactForm();
    updateLinks();
    addInteractiveEffects();
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    // Initialize elements for animation
    const animatedElements = document.querySelectorAll('.project-card, .skill-item');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Alternative scroll-based animation (fallback)
    window.addEventListener('scroll', throttle(handleScrollAnimation, 16));
}

// Handle scroll animations (fallback method)
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Setup contact form functionality
function setupContactForm() {
    const contactBtn = document.getElementById('contactBtn');
    const emailInput = document.getElementById('emailInput');
    
    if (contactBtn && emailInput) {
        contactBtn.addEventListener('click', handleContactSubmit);
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleContactSubmit(e);
            }
        });
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        
        const subject = encodeURIComponent('Portfolio Contact - Let\'s Connect!');
        const body = encodeURIComponent(`Hi Affaan,\n\nI found your portfolio and would like to connect.\n\nFrom: ${email}\n\nBest regards`);
        const mailtoLink = `mailto:${config.links.email}?subject=${subject}&body=${body}`;
        
        
        window.location.href = mailtoLink;
        
       
        showNotification('Email client opened! Thanks for reaching out.', 'success');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}


function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function showNotification(message, type = 'info') {
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
   
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontSize: '0.9rem',
        fontWeight: '600',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'
    });
    
    document.body.appendChild(notification);
    

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
  
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}


function updateLinks() {
    
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('mailto:')) {
            link.setAttribute('href', `mailto:${config.links.email}`);
        } else if (href && href.includes('linkedin.com')) {
            link.setAttribute('href', config.links.linkedin);
        } else if (href && href.includes('github.com')) {
            link.setAttribute('href', config.links.github);
        } else if (href && href.includes('instagram.com')) {
            link.setAttribute('href', config.links.instagram);
        }
    });
    
    
    const resumeBtn = document.querySelector('.resume-btn');
    if (resumeBtn) {
        resumeBtn.setAttribute('href', config.links.resume);
    }
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const demoBtn = card.querySelector('.btn-demo');
        const codeBtn = card.querySelector('.btn-code');
        
        if (index === 0) {
            if (demoBtn) demoBtn.setAttribute('href', config.projects.project1.demo);
            if (codeBtn) codeBtn.setAttribute('href', config.projects.project1.code);
        } else if (index === 1) {
            if (demoBtn) demoBtn.setAttribute('href', config.projects.project2.demo);
            if (codeBtn) codeBtn.setAttribute('href', config.projects.project2.code);
        }
    });
}

function addInteractiveEffects() {
    
    const cards = document.querySelectorAll('.project-card, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
   
    const buttons = document.querySelectorAll('.btn, .resume-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
   
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


function debounce(func, wait) {
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


document.addEventListener('keydown', function(e) {
    
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'h':
                e.preventDefault();
                document.querySelector('.header').scrollIntoView({ behavior: 'smooth' });
                break;
            case 's':
                e.preventDefault();
                document.querySelector('.skills-section').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'p':
                e.preventDefault();
                document.querySelector('.projects-section').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'c':
                e.preventDefault();
                document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    }
});

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}


document.addEventListener('DOMContentLoaded', lazyLoadImages);


window.portfolioConfig = config;