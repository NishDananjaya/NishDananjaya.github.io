// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Hero Section Animations
gsap.from('.title-wrapper h1', {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
});

gsap.from('.subtitle-wrapper h2', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power4.out'
});

gsap.from('.cta-wrapper', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 1,
    ease: 'power4.out'
});

// Scroll Animations
const revealLeft = document.querySelectorAll('.reveal-left');
const revealRight = document.querySelectorAll('.reveal-right');
const revealUp = document.querySelectorAll('.reveal-up');

revealLeft.forEach(el => {
    gsap.from(el, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

revealRight.forEach(el => {
    gsap.from(el, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

revealUp.forEach(el => {
    gsap.from(el, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Skills Animation
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    const progress = item.querySelector('.progress');
    const value = item.dataset.value;
    
    gsap.to(progress, {
        width: `${value}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Section Headings Animation
const sectionHeadings = document.querySelectorAll('.section-heading');

sectionHeadings.forEach(heading => {
    gsap.from(heading, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    if (!formData.name || !formData.email || !formData.message) {
        alert('Please fill in all fields');
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Message sent successfully!');
        contactForm.reset();
        formGroups.forEach(group => {
            group.querySelector('label').classList.remove('active');
        });
    } catch (error) {
        alert('Failed to send message. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Typing Animation for Education Section
document.addEventListener("DOMContentLoaded", () => {
    const educationCards = document.querySelectorAll('.education-card');

    educationCards.forEach((card) => {
        const typingElements = card.querySelectorAll('.typing-animation');

        // Function to calculate the longest animation duration
        function getLongestAnimationDuration(elements) {
            let maxDuration = 0;
            elements.forEach((element) => {
                const text = element.getAttribute('data-text');
                if (text) {
                    const duration = text.length * 100; // typingSpeed is 100ms per character
                    if (duration > maxDuration) {
                        maxDuration = duration;
                    }
                }
            });
            return maxDuration;
        }

        // Function to start typing animation for all elements
        function startTypingAnimation() {
            const longestDuration = getLongestAnimationDuration(typingElements);

            typingElements.forEach((element) => {
                const text = element.getAttribute('data-text');
                if (!text) return;

                // Clear any existing text and reset the cursor
                element.textContent = "";
                element.style.borderRight = "2px solid var(--accent)";

                let i = 0;
                const typingSpeed = 100; // Adjust speed if needed

                function typeText() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeText, typingSpeed);
                    } else {
                        // Remove cursor after typing is complete
                        element.style.borderRight = "none";

                        // Wait for the longest animation to finish before restarting
                        setTimeout(() => {
                            element.style.borderRight = "2px solid var(--accent)";
                            i = 0;
                            element.textContent = ""; // Clear text for loop
                            typeText(); // Restart typing effect
                        }, longestDuration - (text.length * typingSpeed) + 2000); // Add 2s delay for all animations to sync
                    }
                }

                typeText(); // Start the typing animation
            });
        }

        // Start all typing animations at the same time
        startTypingAnimation();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const progressLine = document.querySelector('.processing-line');
    const progressText = document.querySelector('.progress-text');

    const duration = 3000; // 3 seconds
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
        currentStep++;
        const progress = (currentStep / steps) * 100;
        
        // Update progress line and text
        progressLine.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
        
        if (currentStep >= steps) {
        clearInterval(timer);
        
        // Add fade-out class to loading screen
        loadingScreen.classList.add('fade-out');
        
        // After fade animation, hide loading screen and show main content
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 300);
        }
    }, interval);
    });


document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress bars with improved performance
    const skillItems = document.querySelectorAll('.skill-item');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
            const progressBar = entry.target.querySelector('.progress');
            const value = entry.target.dataset.value;
            progressBar.style.width = `${value}%`;
            });
            progressObserver.unobserve(entry.target);
        }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '50px'
    });
    
    skillItems.forEach(item => progressObserver.observe(item));
    
    // Enhanced reveal animations
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            revealObserver.unobserve(entry.target);
        }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    revealElements.forEach(el => {
        el.style.transform = 'translateY(30px) scale(0.95)';
        revealObserver.observe(el);
    });
    
    // Optimized card hover effects
    const cards = document.querySelectorAll('.skill-card');
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        requestAnimationFrame(() => {
        const rotateX = (y - rect.height / 2) / 20;
        const rotateY = (rect.width / 2 - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
        });
    };
    
    const resetCardTransform = (card) => {
        requestAnimationFrame(() => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    };
    
    cards.forEach(card => {
        card.style.willChange = 'transform';
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', () => resetCardTransform(card));
    });
    
    // Tool icon hover effects
    const toolIcons = document.querySelectorAll('.tool-wrapper');
    
    toolIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
        });
        });
        
        icon.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            icon.style.transform = 'translateY(0) scale(1)';
        });
        });
    });
});

//=============================================certificate section=============================================

const certificates = [
    {
        title: "Fundamentals of Digital System Design",
        issuer: "ENTC, University of Moratuwa",
        date: "2025",
        badges: [
            { text: "System Verilog", icon: "fa-code" },
            { text: "Digital Electronics", iconType: "image", icon: "./assets/react.svg" },
            { text: "FPGA", iconType: "image", icon: "./assets/nodejs.svg" }
        ],
        icon: "fa-certificate",
        certificateUrl: "https://drive.google.com/file/d/1MqN9zeXr00Z1NGYuPeOz8tAU9edstPKH/view?usp=drive_link" // Add your Google Drive link here
    },
    {
        title: "Object-Oriented Programming Python",
        issuer: "Udemy",
        date: "2025",
        badges: [
            { text: "Python", iconType: "image", icon: "./assets/python.svg"},
            { text: "Encapsulation"},
            { text: "Inheritance"},
        ],
        icon: "fa-certificate",
        certificateUrl: "https://drive.google.com/file/d/1pJeUWMwsTYso2ZJQEoHSMfl1tNZ2MSiA/view?usp=drive_link" // Add your Google Drive link here
    },
    {
        title: "Machine Learning specialization",
        issuer: "DeepLearning.AI",
        date: "2024",
        badges: [
            {  text: "Scikit learn", iconType: "image", icon: "./assets/python.svg" },
            {  text: "Tensorflow", iconType: "image", icon: "./assets/python.svg"}, // Fixed typo
            {  text: "Matplotlib", iconType: "image", icon: "./assets/python.svg"}, // Fixed typo
        ],
        icon: "fa-certificate",
        certificateUrl: "https://drive.google.com/file/d/1_ddhjtz8ZPvHExky-agMp0QhLZRgCsRy/view?usp=sharing" // Add your Google Drive link here
    }
];


function createCertificateCard(certificate) {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    
    // Add data attribute for certificate URL
    card.dataset.url = certificate.certificateUrl;
    
    // Add click event listener to open certificate
    card.addEventListener('click', function() {
        window.open(this.dataset.url, '_blank');
    });

    const icon = document.createElement('div');
    icon.className = 'certificate-icon';
    icon.innerHTML = `<i class="fas ${certificate.icon}"></i>`;

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'certificate-content';

    const title = document.createElement('h3');
    title.className = 'certificate-title';
    title.textContent = certificate.title;

    const issuer = document.createElement('div');
    issuer.className = 'certificate-issuer';
    issuer.innerHTML = `<i class="fas fa-building"></i> ${certificate.issuer}`;

    const date = document.createElement('div');
    date.className = 'certificate-date';
    date.innerHTML = `<i class="fas fa-calendar-alt"></i> ${certificate.date}`;

    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'badges-container';
    
    certificate.badges.forEach(badge => {
        const badgeElement = document.createElement('span');
        badgeElement.className = 'badge';
        
        if (badge.iconType === 'image') {
            badgeElement.innerHTML = `<img src="${badge.icon}" alt="${badge.text}" class="badge-icon"> ${badge.text}`;
        } else {
            badgeElement.innerHTML = `<i class="fas ${badge.icon || 'fa-tag'}"></i> ${badge.text}`;
        }
        
        badgesContainer.appendChild(badgeElement);
    });

    const viewCertificate = document.createElement('div');
    viewCertificate.className = 'view-certificate';
    viewCertificate.innerHTML = `<i class="fas fa-external-link-alt"></i> View Certificate`;

    card.appendChild(icon);
    contentWrapper.appendChild(title);
    contentWrapper.appendChild(issuer);
    contentWrapper.appendChild(date);
    contentWrapper.appendChild(badgesContainer);
    contentWrapper.appendChild(viewCertificate);
    card.appendChild(contentWrapper);

    // Set initial CSS variables for mouse effect
    card.style.setProperty('--mouse-x', '0px');
    card.style.setProperty('--mouse-y', '0px');

    return card;
}

function initializeCertificates() {
    const grid = document.querySelector('.certificates-grid');
    const fragment = document.createDocumentFragment(); // Use a document fragment to reduce reflows

    certificates.forEach(cert => {
        const card = createCertificateCard(cert);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);

    // Make cards visible with staggered animation after they're added
    setTimeout(() => {
        document.querySelectorAll('.certificate-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        });
    }, 100);

    // Optimized mousemove effect using requestAnimationFrame
    let mouseX = 0, mouseY = 0;
    let ticking = false;
    const cards = document.querySelectorAll('.certificate-card');

    const handleMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateCardEffects();
                ticking = false;
            });
            ticking = true;
        }
    };

    const updateCardEffects = () => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            
            // Calculate the mouse position relative to the card
            const x = mouseX - rect.left;
            const y = mouseY - rect.top;

            // Check if mouse is within or near the card's bounds
            if (x >= -100 && x <= rect.width + 100 && 
                y >= -100 && y <= rect.height + 100) {
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    };

    document.addEventListener('mousemove', handleMouseMove);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCertificates);

document.addEventListener('DOMContentLoaded', initParticles);



function detectScaling() {
    const scaling = window.devicePixelRatio;
    if (scaling === 1) {
      document.body.classList.add('scale-100');
    } else {
      document.body.classList.remove('scale-100');
    }
  }
  
  window.addEventListener('resize', detectScaling);
  detectScaling();