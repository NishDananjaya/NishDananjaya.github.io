// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize parallax effect
  initParallax()

  // Initialize scroll reveal animations
  initScrollReveal()

  // Initialize navbar scroll effect
  initNavbarScroll()

  // Initialize page transitions
  initPageTransitions()

  // Initialize skill bars animation
  initSkillBars()
})

// Parallax effect
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset

    // Apply parallax effect to hero section
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
    }

    // Apply parallax effect to other elements
    document.querySelectorAll(".parallax-element").forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.2
      element.style.transform = `translateY(${scrollPosition * speed}px)`
    })
  })
}

// Scroll reveal animations
function initScrollReveal() {
  // Get all elements with data-animation attribute
  const animatedElements = document.querySelectorAll("[data-animation]")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation")
          const delay = entry.target.getAttribute("data-delay") || 0

          setTimeout(() => {
            entry.target.classList.add(animation)
            entry.target.style.opacity = "1"
          }, delay * 1000)

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    observer.observe(element)
  })
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.padding = "0.5rem 0"
        navbar.style.boxShadow = "var(--shadow-md)"
      } else {
        navbar.style.padding = "1rem 0"
        navbar.style.boxShadow = "none"
      }
    })
  }
}

// Page transitions
function initPageTransitions() {
  // Create page transition element
  const transitionElement = document.createElement("div")
  transitionElement.className = "page-transition"
  document.body.appendChild(transitionElement)

  // Add event listeners to all internal links
  document.querySelectorAll("a").forEach((link) => {
    // Skip links that open in new tab or are anchor links
    if (link.getAttribute("target") === "_blank" || link.getAttribute("href").startsWith("#")) {
      return
    }

    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip external links
      if (href.startsWith("http") && !href.includes(window.location.hostname)) {
        return
      }

      e.preventDefault()

      // Activate transition
      transitionElement.classList.add("active")

      // Navigate to the new page after transition
      setTimeout(() => {
        window.location.href = href
      }, 500)
    })
  })

  // Hide transition element when page loads
  window.addEventListener("load", () => {
    transitionElement.style.transform = "translateY(-100%)"

    setTimeout(() => {
      transitionElement.style.transform = "translateY(-200%)"
    }, 500)
  })
}

// Add mouse trail effect
function initMouseTrail() {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "9997"

  document.body.appendChild(canvas)

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  })

  const particles = []
  const properties = {
    particleCount: 20,
    particleRadius: 3,
    maxSpeed: 0.5,
    colors: ["#58a6ff", "#1f6feb", "#388bfd"],
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.vx = Math.random() * (properties.maxSpeed * 2) - properties.maxSpeed
      this.vy = Math.random() * (properties.maxSpeed * 2) - properties.maxSpeed
      this.radius = Math.random() * properties.particleRadius
      this.color = properties.colors[Math.floor(Math.random() * properties.colors.length)]
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle = this.color
      ctx.fill()
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > width) this.vx *= -1
      if (this.y < 0 || this.y > height) this.vy *= -1

      this.draw()
    }
  }

  function createParticles() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle())
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
    }

    // Draw lines between particles that are close to each other
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(88, 166, 255, ${1 - distance / 100})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.closePath()
        }
      }
    }

    requestAnimationFrame(animateParticles)
  }

  createParticles()
  animateParticles()

  // Add mouse interaction
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Attract particles to mouse
    particles.forEach((particle) => {
      const dx = mouseX - particle.x
      const dy = mouseY - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 150) {
        particle.vx += dx * 0.01
        particle.vy += dy * 0.01
      }
    })
  })
}


// Add this new function for skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-bar")

  if (skillBars.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const percentage = bar.parentElement.previousElementSibling.querySelector(".skill-percentage").textContent

          // Animate the width after a small delay
          setTimeout(() => {
            bar.style.width = percentage
          }, 200)

          // Unobserve after animation
          observer.unobserve(bar)
        }
      })
    },
    { threshold: 0.2 },
  )

  // Observe all skill bars
  skillBars.forEach((bar) => {
    observer.observe(bar)
  })
}
// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize parallax effect
  initParallax()

  // Initialize scroll reveal animations
  initScrollReveal()

  // Initialize navbar scroll effect
  initNavbarScroll()

  // Initialize page transitions
  initPageTransitions()

  // Initialize skill bars animation
  initSkillBars()
})

// Parallax effect
function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset

    // Apply parallax effect to hero section
    const heroSection = document.querySelector(".hero")
    if (heroSection) {
      heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`
    }

    // Apply parallax effect to other elements
    document.querySelectorAll(".parallax-element").forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.2
      element.style.transform = `translateY(${scrollPosition * speed}px)`
    })
  })
}

// Scroll reveal animations
function initScrollReveal() {
  // Get all elements with data-animation attribute
  const animatedElements = document.querySelectorAll("[data-animation]")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation")
          const delay = entry.target.getAttribute("data-delay") || 0

          setTimeout(() => {
            entry.target.classList.add(animation)
            entry.target.style.opacity = "1"
          }, delay * 1000)

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    observer.observe(element)
  })
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.style.padding = "0.5rem 0"
        navbar.style.boxShadow = "var(--shadow-md)"
      } else {
        navbar.style.padding = "1rem 0"
        navbar.style.boxShadow = "none"
      }
    })
  }
}

// Page transitions
function initPageTransitions() {
  // Create page transition element
  const transitionElement = document.createElement("div")
  transitionElement.className = "page-transition"
  document.body.appendChild(transitionElement)

  // Add event listeners to all internal links
  document.querySelectorAll("a").forEach((link) => {
    // Skip links that open in new tab or are anchor links
    if (link.getAttribute("target") === "_blank" || link.getAttribute("href").startsWith("#")) {
      return
    }

    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Skip external links
      if (href.startsWith("http") && !href.includes(window.location.hostname)) {
        return
      }

      e.preventDefault()

      // Activate transition
      transitionElement.classList.add("active")

      // Navigate to the new page after transition
      setTimeout(() => {
        window.location.href = href
      }, 500)
    })
  })

  // Hide transition element when page loads
  window.addEventListener("load", () => {
    transitionElement.style.transform = "translateY(-100%)"

    setTimeout(() => {
      transitionElement.style.transform = "translateY(-200%)"
    }, 500)
  })
}

// Add this new function for skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress-bar")

  if (skillBars.length === 0) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target
          const percentage = bar.parentElement.previousElementSibling.querySelector(".skill-percentage").textContent

          // Animate the width after a small delay
          setTimeout(() => {
            bar.style.width = percentage
          }, 200)

          // Unobserve after animation
          observer.unobserve(bar)
        }
      })
    },
    { threshold: 0.2 },
  )

  // Observe all skill bars
  skillBars.forEach((bar) => {
    observer.observe(bar)
  })
}


s