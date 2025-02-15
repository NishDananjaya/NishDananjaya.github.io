// Initialize AOS (Animate On Scroll)
console.log("Script loaded!"); // Add this at the top of script.js
AOS.init({
    duration: 800,
    offset: 100,
    once: true
  });
  
  // Custom Cursor
  document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
  
    document.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
  
      cursor.style.left = `${posX}px`;
      cursor.style.top = `${posY}px`;
  
      // Add slight delay to cursor outline for smooth effect
      setTimeout(() => {
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
      }, 80);
    });
  
    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll('a, button, .nav-link, .social-link');
    clickables.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'var(--accent)';
      });
  
      element.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'var(--primary)';
      });
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
  
  // Particles.js Configuration
  particlesJS('particles-container', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#60A5FA'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#60A5FA',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
  
  // Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });
  
  // Project Cards Dynamic Loading
  const projectsGrid = document.querySelector('.projects-grid');
  const projects = [
    {
      title: 'Tuya API Application',
      description: 'A comprehensive application integrating with Tuya IoT platform',
      icon: '<i class="fas fa-project-diagram"></i>', // Font Awesome icon
      tech: ['Python', 'Flask', 'Tuya API'],
      link: 'https://github.com/NishDananjaya/tuya_API_Application',
      github: 'https://github.com/NishDananjaya/tuya_API_Application'
    },
    {
      title: 'Engineering Chat Bot',
      description: 'An AI-powered chatbot for engineering students',
      icon: '<i class="fas fa-robot"></i>', // Font Awesome icon
      tech: ['Python', 'NLP', 'Machine Learning'],
      link: 'https://github.com/NishDananjaya/Engineering-chat-bot',
      github: 'https://github.com/NishDananjaya/Engineering-chat-bot'
    }
  ];
  
  function createProjectCards() {
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-aos', 'fade-up');
      
      card.innerHTML = `
        <div class="project-icon">${project.icon}</div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
            <a href="${project.github}" class="btn btn-outline" target="_blank">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      `;
      
      projectsGrid.appendChild(card);
    });
  }
  
  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
  
    try {
      // Replace with your actual form submission endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert('Message sent successfully!');
        contactForm.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Failed to send message. Please try again later.');
      console.error('Error:', error);
    }
  });
  
  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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