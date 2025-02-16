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