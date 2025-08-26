// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize certificate modal
  initCertModal()

  // Initialize certificate hover effects
  initCertHoverEffects()

  // Initialize ribbon animations
  initRibbonAnimations()
})

// Certificate modal
function initCertModal() {
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
    deeplearning: {
      title: "Machine Learning Specialization",
      issuer: "deeplearning.ai",
      date: "April 2024",
      // id: "TF-2023-05-JD-1234",
      image:
        "Images/machinel.png",
    },
    entc: {
      title: "Fundamentals of Digital System Design",
      issuer: "ENTC UOM",
      date: "November 2024",
      // id: "AWS-SA-2022-11-JD-5678",
      image:
        "Images/dsd.png",
    },
    python: {
      title: "Object-Oriented Programming (OOP) - Learn to Code Faster",
      issuer: "Udemy",
      date: "January 2025",
      id: "UC-3d72fed9-0d33-4939-a87e-2c00f71e4820",
      image:
        "Images/python.png",
    },
    cpp: {
      title: "The Complete C++ Programming Course from Basic to Expert",
      issuer: "Udemy",
      date: "January 2025",
      id: "UC-062035f4-b357-4ff3-bc9a-62479bf4bde3",
      image:
        "Images/cpp.png",
    },
    ibm: {
      title: "Machine learning introduction for everyone",
      issuer: "IBM",
      date: "July 2023",
      // id: "CKA-2021-03-JD-7890",
      image:
        "Images/ibmcert.png",
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

// Certificate hover effects
function initCertHoverEffects() {
  const certCards = document.querySelectorAll(".cert-card")

  certCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add glow effect
      this.style.boxShadow = "var(--glow)"

      // Animate ribbon
      const ribbon = this.querySelector(".ribbon span")
      if (ribbon) {
        ribbon.style.transform = "rotate(45deg) translateY(-5px)"
        ribbon.style.backgroundColor = "var(--accent-tertiary)"
      }

      // Animate button
      const button = this.querySelector(".view-cert-btn")
      if (button) {
        button.style.backgroundColor = "var(--accent-primary)"
        button.style.transform = "translateY(-3px)"
      }
    })

    card.addEventListener("mouseleave", function () {
      // Remove glow effect
      this.style.boxShadow = "var(--shadow-md)"

      // Reset ribbon
      const ribbon = this.querySelector(".ribbon span")
      if (ribbon) {
        ribbon.style.transform = "rotate(45deg) translateY(0)"
        ribbon.style.backgroundColor = "var(--accent-primary)"
      }

      // Reset button
      const button = this.querySelector(".view-cert-btn")
      if (button) {
        button.style.backgroundColor = "var(--accent-secondary)"
        button.style.transform = "translateY(0)"
      }
    })
  })
}

// Ribbon animations
function initRibbonAnimations() {
  const ribbons = document.querySelectorAll(".ribbon")

  ribbons.forEach((ribbon) => {
    // Add subtle animation
    const span = ribbon.querySelector("span")
    if (span) {
      setInterval(() => {
        span.style.transform = "rotate(45deg) translateY(-5px)"
        setTimeout(() => {
          span.style.transform = "rotate(45deg) translateY(0)"
        }, 500)
      }, 3000)
    }
  })
}

