// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize project filtering
  initProjectFilter()

  // Initialize project search
  initProjectSearch()

  // Initialize project hover effects
  initProjectHoverEffects()
})

// Project filtering
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          if (card.getAttribute("data-category") === filter) {
            card.style.display = "block"
            setTimeout(() => {
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 100)
          } else {
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"
            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        }
      })
    })
  })
}

// Project search
function initProjectSearch() {
  const searchInput = document.getElementById("project-search")
  const projectCards = document.querySelectorAll(".project-card")

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      projectCards.forEach((card) => {
        const title = card.querySelector(".project-title").textContent.toLowerCase()
        const description = card.querySelector(".project-description").textContent.toLowerCase()
        const techBadges = Array.from(card.querySelectorAll(".tech-badge")).map((badge) =>
          badge.textContent.toLowerCase(),
        )

        // Check if project matches search term
        const matchesSearch =
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          techBadges.some((tech) => tech.includes(searchTerm))

        if (matchesSearch) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  }
}

// Project hover effects
function initProjectHoverEffects() {
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add glow effect
      this.style.boxShadow = "var(--glow)"

      // Animate tech badges
      const techBadges = this.querySelectorAll(".tech-badge")
      techBadges.forEach((badge, index) => {
        setTimeout(() => {
          badge.style.transform = "translateY(-5px)"
          badge.style.backgroundColor = "var(--accent-secondary)"
          badge.style.color = "var(--text-primary)"
        }, index * 50)
      })

      // Animate project links
      const projectLinks = this.querySelectorAll(".project-link")
      projectLinks.forEach((link, index) => {
        setTimeout(() => {
          link.style.transform = "translateY(-3px) scale(1.2)"
          link.style.color = "var(--accent-primary)"
        }, index * 100)
      })
    })

    card.addEventListener("mouseleave", function () {
      // Remove glow effect
      this.style.boxShadow = "var(--shadow-md)"

      // Reset tech badges
      const techBadges = this.querySelectorAll(".tech-badge")
      techBadges.forEach((badge) => {
        badge.style.transform = "translateY(0)"
        badge.style.backgroundColor = "var(--bg-tertiary)"
        badge.style.color = "var(--text-tertiary)"
      })

      // Reset project links
      const projectLinks = this.querySelectorAll(".project-link")
      projectLinks.forEach((link) => {
        link.style.transform = "translateY(0) scale(1)"
        link.style.color = "var(--text-tertiary)"
      })
    })
  })
}

// Add GitHub repository details dynamically
function loadGitHubRepos() {
  // This would typically fetch data from GitHub API
  // For demo purposes, we'll use static data

  const repoData = [
    {
      name: "AI-Powered Image Recognition",
      description:
        "A deep learning model that can identify objects in images with high accuracy using convolutional neural networks.",
      stars: 45,
      forks: 12,
      tech: ["Python", "TensorFlow", "OpenCV"],
    },
    {
      name: "FPGA-Based Signal Processor",
      description:
        "A high-performance digital signal processor implemented on FPGA for real-time audio processing applications.",
      stars: 32,
      forks: 8,
      tech: ["VHDL", "Verilog", "Xilinx"],
    },
    {
      name: "IoT Home Automation System",
      description:
        "A complete home automation solution using IoT devices, with a mobile app for remote control and monitoring.",
      stars: 28,
      forks: 15,
      tech: ["Arduino", "ESP32", "MQTT", "React Native"],
    },
  ]

  // This function could be used to dynamically populate project cards
  // based on actual GitHub repositories
}

