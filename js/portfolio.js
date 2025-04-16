// Main portfolio JavaScript file
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize components
  initMobileMenu();
  initTypingEffect();
  await loadGitHubData();
  await loadProjects();
  // Call loadFeaturedProjects only if featured-projects-grid exists (home page)
  if (document.querySelector(".featured-projects-grid")) {
    await loadFeaturedProjects();
  }
  initProjectFilters();
  initScrollAnimations();
  initSmoothScrolling();

  // Initialize page-specific components
  if (document.getElementById("github-activity")) {
    await loadGitHubActivity();
  }

  if (document.getElementById("contact-form")) {
    initContactForm();
  }

  if (document.querySelector(".certifications-grid")) {
    initCertificates();
  }
});

// Load featured projects (select 3 random projects)
async function loadFeaturedProjects() {
  try {
    console.log("Attempting to fetch projects.json...");
    const response = await fetch("../data/projects.json");
    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();
    console.log("Projects loaded:", projects);

    // Select 3 random projects
    const shuffledProjects = projects.sort(() => 0.5 - Math.random()); // Shuffle array
    const randomProjects = shuffledProjects.slice(0, 3); // Take first 3
    console.log("Random projects selected:", randomProjects);

    const projectsGrid = document.querySelector(".featured-projects-grid");
    if (!projectsGrid) {
      console.warn("No .featured-projects-grid found in the DOM");
      return;
    }

    projectsGrid.innerHTML = ""; // Clear existing projects

    if (randomProjects.length === 0) {
      console.warn("No projects available in projects.json");
      projectsGrid.innerHTML = `
        <p>No projects available. Please check the projects.json file.</p>
      `;
      return;
    }

    randomProjects.forEach(project => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card glass-card";

      const demoLink = project.demo ? project.demo : "#";
      const githubLink = project.github ? project.github : "#";

      projectCard.innerHTML = `
        <div class="project-header">
          <i class="fas fa-folder-open"></i>
          <div class="project-links">
            <a href="${demoLink}" class="project-link" ${project.demo ? 'target="_blank" aria-label="Live demo"' : ''}>
              <i class="fas fa-external-link-alt"></i>
            </a>
            <a href="${githubLink}" class="project-link" target="_blank" aria-label="GitHub repository">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.length > 0 
            ? project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join("")
            : '<span class="tech-badge">No technologies listed</span>'
          }
        </div>
        <div class="project-stats">
          <span><i class="fas fa-star"></i> ${project.stars}</span>
          <span><i class="fas fa-code-branch"></i> ${project.forks}</span>
        </div>
      `;

      projectsGrid.appendChild(projectCard);
    });

    console.log("Random projects rendered successfully");
    return randomProjects;
  } catch (error) {
    console.error("Error loading featured projects:", error);
    const projectsGrid = document.querySelector(".featured-projects-grid");
    if (projectsGrid) {
      projectsGrid.innerHTML = `
        <p>Error loading featured projects. Please try again later.</p>
      `;
    }
    return [];
  }
}

// Load projects from JSON
async function loadProjects() {
  try {
    console.log("Loading all projects...");
    const response = await fetch("../data/projects.json");
    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();
    console.log("All projects loaded:", projects);

    // Update all projects on projects page only
    const projectsGrid = document.querySelector(".projects-grid");
    if (projectsGrid) {
      projectsGrid.innerHTML = "";
      projects.forEach((project) => {
        projectsGrid.appendChild(createProjectCard(project));
      });
      console.log("Projects page grid updated");
    }

    return projects;
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
}


// Mobile menu
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
  if (!typingElement) return

  const texts = ["Embedded Systems Engineer", "FPGA Developer", "AI/ML Enthusiast"]
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

// Load GitHub data
async function loadGitHubData() {
  try {
    // Fetch GitHub stats from JSON file
    const response = await fetch("/data/github-stats.json")
    if (!response.ok) {
      throw new Error(`Failed to load GitHub stats: ${response.status}`)
    }

    const userData = await response.json()

    // Update profile information
    updateProfileInfo(userData)

    // Update GitHub stats
    updateGitHubStats(userData.stats)

    // Update language stats if available
    if (userData.languages && userData.languages.length > 0) {
      updateLanguageStats(userData.languages)
    }

    return userData
  } catch (error) {
    console.error("Error loading GitHub data:", error)
    // Use fallback data if needed
    return null
  }
}

// Update profile information
function updateProfileInfo(userData) {
  // Update profile image
  const profileImage = document.querySelector(".profile-image img")
  if (profileImage && userData.avatar) {
    profileImage.src = userData.avatar
    profileImage.alt = `${userData.name}'s profile picture`
  }

  // Update name
  const nameElements = document.querySelectorAll(".profile-name")
  nameElements.forEach((element) => {
    if (element) element.textContent = userData.name
  })

  // Update bio
  const bioElement = document.querySelector(".bio")
  if (bioElement && userData.bio) {
    bioElement.textContent = userData.bio
  }

  // Update social links
  if (userData.twitter) {
    const twitterLinks = document.querySelectorAll('.social-links a[href*="twitter.com"]')
    twitterLinks.forEach((link) => {
      link.href = `https://twitter.com/${userData.twitter}`
    })
  }

  if (userData.linkedin) {
    const linkedinLinks = document.querySelectorAll('.social-links a[href*="linkedin.com"]')
    linkedinLinks.forEach((link) => {
      link.href = `https://linkedin.com/in/${userData.linkedin}`
    })
  }

  if (userData.github || userData.user) {
    const githubLinks = document.querySelectorAll('.social-links a[href*="github.com"]')
    githubLinks.forEach((link) => {
      link.href = `https://github.com/${userData.user || userData.github}`
    })
  }

  // Update location if available
  if (userData.location) {
    const locationElements = document.querySelectorAll(".location")
    locationElements.forEach((element) => {
      if (element) element.textContent = userData.location
    })
  }
}

// Update GitHub stats with counter animation
function updateGitHubStats(stats) {
  animateCounter("repo-count", stats.repositories || 0)
  animateCounter("star-count", stats.stars || 0)
  animateCounter("commit-count", stats.contributions || 0)

  // Update followers and following if elements exist
  animateCounter("followers-count", stats.followers || 0)
  animateCounter("following-count", stats.following || 0)
}

// Update language statistics
function updateLanguageStats(languages) {
  const languageContainer = document.querySelector(".language-stats")
  if (!languageContainer) return

  // Clear existing content
  languageContainer.innerHTML = ""

  // Add language bars
  languages.forEach((lang) => {
    const langBar = document.createElement("div")
    langBar.className = "language-bar"

    const langName = document.createElement("span")
    langName.className = "language-name"
    langName.textContent = lang.name

    const langPercentage = document.createElement("span")
    langPercentage.className = "language-percentage"
    langPercentage.textContent = `${lang.percentage}%`

    const langProgress = document.createElement("div")
    langProgress.className = "language-progress"

    const langProgressBar = document.createElement("div")
    langProgressBar.className = "language-progress-bar"
    langProgressBar.style.width = "0%"

    // Add color based on language
    const languageColors = {
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      HTML: "#e34c26",
      CSS: "#563d7c",
      "C++": "#f34b7d",
      Java: "#b07219",
      TypeScript: "#2b7489",
      PHP: "#4F5D95",
      VHDL: "#543978",
      Verilog: "#b2b7f8",
      Other: "#8e8e8e",
    }

    langProgressBar.style.backgroundColor = languageColors[lang.name] || "#8e8e8e"

    // Append elements
    langProgress.appendChild(langProgressBar)
    langBar.appendChild(langName)
    langBar.appendChild(langPercentage)
    langBar.appendChild(langProgress)
    languageContainer.appendChild(langBar)

    // Animate progress bar
    setTimeout(() => {
      langProgressBar.style.width = `${lang.percentage}%`
    }, 100)
  })
}

// Counter animation
function animateCounter(elementId, target) {
  const element = document.getElementById(elementId)
  if (!element) return

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

    element.textContent = Math.floor(current).toLocaleString()
  }, step)
}

// Load projects from JSON
async function loadProjects() {
  try {
    const response = await fetch("/data/projects.json")
    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`)
    }

    const projects = await response.json()

    // Update featured projects on home page
    const featuredProjectsGrid = document.querySelector(".featured-projects-grid")
    if (featuredProjectsGrid) {
      const featuredProjects = projects.filter((project) => project.featured)
      featuredProjectsGrid.innerHTML = ""

      featuredProjects.forEach((project) => {
        featuredProjectsGrid.appendChild(createProjectCard(project))
      })
    }

    // Update all projects on projects page
    const projectsGrid = document.querySelector(".projects-grid")
    if (projectsGrid) {
      projectsGrid.innerHTML = ""

      projects.forEach((project) => {
        projectsGrid.appendChild(createProjectCard(project))
      })
    }

    return projects
  } catch (error) {
    console.error("Error loading projects:", error)
    return []
  }
}

// Create project card element
function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card glass-card"
  card.setAttribute("data-category", project.category)

  card.innerHTML = `
    <div class="project-header">
      <i class="fas fa-folder-open"></i>
      <div class="project-links">
        ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" aria-label="Live demo"><i class="fas fa-external-link-alt"></i></a>` : ""}
        <a href="${project.github}" class="project-link" target="_blank" aria-label="GitHub repository"><i class="fab fa-github"></i></a>
      </div>
    </div>
    <h3 class="project-title">${project.title}</h3>
    <p class="project-description">${project.description}</p>
    <div class="project-tech">
      ${project.technologies.map((tech) => `<span class="tech-badge">${tech}</span>`).join("")}
    </div>
    <div class="project-stats">
      <span><i class="fas fa-star"></i> ${project.stars}</span>
      <span><i class="fas fa-code-branch"></i> ${project.forks}</span>
    </div>
  `

  return card
}

// Initialize project filters
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  const searchInput = document.getElementById("project-search")

  if (filterButtons.length === 0) return

  // Filter by category
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Get filter value
      const filter = this.getAttribute("data-filter")

      // Filter projects
      filterProjects(filter, searchInput?.value || "")
    })
  })

  // Filter by search term
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const activeFilter = document.querySelector(".filter-btn.active")
      const filter = activeFilter ? activeFilter.getAttribute("data-filter") : "all"

      filterProjects(filter, this.value)
    })
  }

  // Filter projects function
  function filterProjects(categoryFilter, searchTerm) {
    const projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category")
      const title = card.querySelector(".project-title").textContent.toLowerCase()
      const description = card.querySelector(".project-description").textContent.toLowerCase()
      const techBadges = Array.from(card.querySelectorAll(".tech-badge")).map((badge) =>
        badge.textContent.toLowerCase(),
      )

      // Check if project matches category filter
      const matchesCategory = categoryFilter === "all" || category === categoryFilter

      // Check if project matches search term
      const searchTermLower = searchTerm.toLowerCase()
      const matchesSearch =
        searchTerm === "" ||
        title.includes(searchTermLower) ||
        description.includes(searchTermLower) ||
        techBadges.some((tech) => tech.includes(searchTermLower))

      // Show or hide card based on filters
      if (matchesCategory && matchesSearch) {
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
  }
}

// Load GitHub activity
async function loadGitHubActivity() {
  try {
    const response = await fetch("/data/github-activity.json")
    if (!response.ok) {
      throw new Error(`Failed to load GitHub activity: ${response.status}`)
    }

    const activities = await response.json()
    const latestActivities = activities.slice(0, 4) // Get only the first 4 activities

    const activityContainer = document.getElementById("github-activity")
    if (!activityContainer) return

    activityContainer.innerHTML = ""

    latestActivities.forEach((activity, index) => {
      setTimeout(() => {
        const activityItem = document.createElement("div")
        activityItem.className = "activity-item"

        let actionText = ""
        switch (activity.type) {
          case "push":
            actionText = "Pushed to"
            break
          case "star":
            actionText = "Starred"
            break
          case "commit":
            actionText = "Committed to"
            break
          case "fork":
            actionText = "Forked"
            break
          case "issue":
            actionText = "Opened issue in"
            break
          case "pull_request":
            actionText = "Created PR in"
            break
          case "release":
            actionText = "Released"
            break
          default:
            actionText = "Updated"
        }

        activityItem.innerHTML = `
          <div class="activity-icon"><i class="fas fa-${activity.icon}"></i></div>
          <div class="activity-details">
            <p class="activity-text">${actionText} <span class="highlight">${activity.repo}</span></p>
            ${activity.message ? `<p class="activity-message">${activity.message}</p>` : ""}
            <p class="activity-time">${activity.time}</p>
          </div>
        `

        activityItem.style.opacity = "0"
        activityContainer.appendChild(activityItem)

        setTimeout(() => {
          activityItem.style.opacity = "1"
        }, 100)
      }, index * 300)
    })

    return latestActivities
  } catch (error) {
    console.error("Error loading GitHub activity:", error)
    return []
  }
}


// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const terminalOutput = document.getElementById("terminal-output")

  if (!contactForm || !terminalOutput) return

  // Add initial messages with typing effect
  typeMessage("Initializing contact form...", 0)
  typeMessage("Ready to receive your message!", 1500)

  // Add blinking cursor
  setTimeout(() => {
    const cursor = document.createElement("span")
    cursor.className = "cursor-blink"
    cursor.textContent = "|"
    terminalOutput.appendChild(cursor)
  }, 3000)

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form data
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Show sending message in terminal
    typeMessage(`Sending message from ${name}...`, 0)

    // Simulate sending (would be replaced with actual AJAX request)
    setTimeout(() => {
      typeMessage("Validating email address...", 1000)

      setTimeout(() => {
        typeMessage("Processing message content...", 2000)

        setTimeout(() => {
          typeMessage("Message sent successfully!", 3000)

          // Reset form
          contactForm.reset()
        }, 1000)
      }, 1000)
    }, 1000)
  })

  // Type message with terminal effect
  function typeMessage(message, delay) {
    setTimeout(() => {
      const line = document.createElement("p")
      const prompt = document.createElement("span")
      prompt.className = "terminal-prompt"
      prompt.textContent = "$ "

      const text = document.createElement("span")
      text.className = "terminal-text"

      line.appendChild(prompt)
      line.appendChild(text)
      terminalOutput.appendChild(line)

      let i = 0
      const typeInterval = setInterval(() => {
        if (i < message.length) {
          text.textContent += message.charAt(i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
    }, delay)
  }
}

// Initialize certificates
function initCertificates() {
  const viewButtons = document.querySelectorAll(".view-cert-btn")
  const modal = document.getElementById("cert-modal")
  const closeModal = document.querySelector(".close-modal")
  const certImage = document.getElementById("cert-image")
  const modalTitle = document.getElementById("modal-cert-title")
  const modalIssuer = document.getElementById("modal-cert-issuer")
  const modalDate = document.getElementById("modal-cert-date")
  const modalId = document.getElementById("modal-cert-id")

  // Certificate data
  const certificates = {
    tensorflow: {
      title: "TensorFlow Developer Certificate",
      issuer: "Google",
      date: "May 2023",
      id: "TF-2023-05-JD-1234",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png",
    },
    aws: {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "November 2022",
      id: "AWS-SA-2022-11-JD-5678",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png",
    },
    python: {
      title: "Python for Data Science and Machine Learning",
      issuer: "Coursera",
      date: "July 2022",
      id: "COURSERA-PY-2022-07-JD-9012",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
    },
    cpp: {
      title: "Advanced C++ Programming",
      issuer: "Udacity",
      date: "October 2021",
      id: "UDACITY-CPP-2021-10-JD-3456",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png",
    },
    kubernetes: {
      title: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "March 2021",
      id: "CKA-2021-03-JD-7890",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png",
    },
    xilinx: {
      title: "Xilinx FPGA Design Certification",
      issuer: "Xilinx",
      date: "August 2020",
      id: "XILINX-FPGA-2020-08-JD-1357",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Xilinx_logo.svg/1200px-Xilinx_logo.svg.png",
    },
  }

  // Open modal when view button is clicked
  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const certId = this.getAttribute("data-cert")
      const cert = certificates[certId]

      if (cert) {
        certImage.src = cert.image
        modalTitle.textContent = cert.title
        modalIssuer.textContent = cert.issuer
        modalDate.textContent = `Issued: ${cert.date}`
        modalId.textContent = `Certificate ID: ${cert.id}`

        modal.style.display = "flex"

        // Add fade-in animation
        modal.style.opacity = "0"
        setTimeout(() => {
          modal.style.opacity = "1"
        }, 10)
      }
    })
  })

  // Close modal when close button is clicked
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.opacity = "0"
      setTimeout(() => {
        modal.style.display = "none"
      }, 300)
    })
  }

  // Close modal when clicking outside the content
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.opacity = "0"
        setTimeout(() => {
          modal.style.display = "none"
        }, 300)
      }
    })
  }
}

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

