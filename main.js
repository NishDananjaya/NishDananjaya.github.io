// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Remove custom cursor initialization
  // initCursor()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize typing effect
  if (document.getElementById("typing-text")) {
    initTypingEffect()
  }

  // Initialize GitHub stats
  if (document.getElementById("repo-count")) {
    initGitHubStats()
  }

  // Remove heatmap initialization
  // if (document.getElementById("heatmap")) {
  //   generateHeatmap()
  // }

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize smooth scrolling for anchor links
  initSmoothScrolling()
})

// Remove custom cursor function
// function initCursor() { ... }

// Mobile menu - updated implementation
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")

      // Toggle the active class
      navLinks.classList.toggle("active")

      // Add hamburger animation
      const spans = this.querySelectorAll("span")
      if (navLinks.classList.contains("active")) {
        // Transform to X
        spans[0].style.transform = "translateY(9px) rotate(45deg)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "translateY(-9px) rotate(-45deg)"
      } else {
        // Reset
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })

    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll("a")
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")

        // Reset hamburger
        const spans = hamburger.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInside = hamburger.contains(event.target) || navLinks.contains(event.target)

      if (!isClickInside && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")

        // Reset hamburger
        const spans = hamburger.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }
}

// Typing effect
function initTypingEffect() {
  const typingElement = document.getElementById("typing-text")
  const texts = ["AI Engineer", "FPGA Developer", "Embedded Systems Enthusiast", "Full-Stack Developer"]
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function type() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true
      typingSpeed = 1000 // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typingSpeed = 500 // Pause before typing next text
    }

    setTimeout(type, typingSpeed)
  }

  setTimeout(type, 1000)
}

// GitHub stats
function initGitHubStats() {
  // Simulated GitHub stats with counter animation
  animateCounter("repo-count")
  animateCounter("star-count",)
  animateCounter("commit-count",)
}

// Counter animation
function animateCounter(elementId, target) {
  const element = document.getElementById(elementId)
  const duration = 2000 // 2 seconds
  const step = 30 // Update every 30ms
  const steps = duration / step
  const increment = target / steps
  let current = 0

  const timer = setInterval(() => {
    current += increment

    if (current >= target) {
      current = target
      clearInterval(timer)
    }

    element.textContent = Math.floor(current)
  }, step)
}

// Remove generate heatmap function
// function generateHeatmap() { ... }

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".section-title, .timeline-item, .skill-badge, .project-card, .stat-card, .cert-card",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"

          if (entry.target.classList.contains("section-title")) {
            entry.target.classList.add("slide-down")
          } else if (entry.target.classList.contains("timeline-item")) {
            entry.target.classList.add("slide-right")
          } else if (entry.target.classList.contains("skill-badge")) {
            entry.target.classList.add("fade-in")
            entry.target.style.transitionDelay = Math.random() * 0.5 + "s"
          } else if (entry.target.classList.contains("project-card")) {
            entry.target.classList.add("slide-up")
            entry.target.style.transitionDelay = Math.random() * 0.3 + "s"
          } else if (entry.target.classList.contains("stat-card")) {
            entry.target.classList.add("fade-in")
            entry.target.style.transitionDelay = Math.random() * 0.3 + "s"
          } else if (entry.target.classList.contains("cert-card")) {
            entry.target.classList.add("slide-up")
            entry.target.style.transitionDelay = Math.random() * 0.3 + "s"
          }

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: "smooth",
        })
      }
    })
  })
}

