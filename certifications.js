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

