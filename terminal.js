// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize terminal effect
  initTerminal()

  // Initialize contact form
  initContactForm()

  // Initialize GitHub activity feed
  initGitHubActivity()
})

// Terminal effect
function initTerminal() {
  const terminalOutput = document.getElementById("terminal-output")

  if (terminalOutput) {
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
  }
}

// Type message with terminal effect
function typeMessage(message, delay) {
  setTimeout(() => {
    const terminalOutput = document.getElementById("terminal-output")

    if (terminalOutput) {
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
    }
  }, delay)
}

// Contact form
function initContactForm() {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
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
  }
}

// GitHub activity feed
function initGitHubActivity() {
  const activityContainer = document.getElementById("github-activity")

  if (activityContainer) {
    // This would typically fetch data from GitHub API
    // For demo purposes, we'll use static data

    const activities = [
      {
        type: "push",
        repo: "ai-image-recognition",
        time: "2 days ago",
        icon: "code-branch",
      },
      {
        type: "star",
        repo: "tensorflow/models",
        time: "3 days ago",
        icon: "star",
      },
      {
        type: "commit",
        repo: "fpga-signal-processor",
        time: "5 days ago",
        icon: "code-commit",
      },
      {
        type: "fork",
        repo: "embedded-systems-toolkit",
        time: "1 week ago",
        icon: "code-branch",
      },
      {
        type: "issue",
        repo: "iot-home-automation",
        time: "1 week ago",
        icon: "exclamation-circle",
      },
    ]

    // Clear existing content
    activityContainer.innerHTML = ""

    // Add activities with animation
    activities.forEach((activity, index) => {
      setTimeout(() => {
        const activityItem = document.createElement("div")
        activityItem.className = "activity-item"

        const activityIcon = document.createElement("div")
        activityIcon.className = "activity-icon"
        activityIcon.innerHTML = `<i class="fas fa-${activity.icon}"></i>`

        const activityDetails = document.createElement("div")
        activityDetails.className = "activity-details"

        const activityText = document.createElement("p")
        activityText.className = "activity-text"

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
        }

        activityText.innerHTML = `${actionText} <span class="highlight">${activity.repo}</span>`

        const activityTime = document.createElement("p")
        activityTime.className = "activity-time"
        activityTime.textContent = activity.time

        activityDetails.appendChild(activityText)
        activityDetails.appendChild(activityTime)

        activityItem.appendChild(activityIcon)
        activityItem.appendChild(activityDetails)

        // Add fade-in animation
        activityItem.style.opacity = "0"
        activityContainer.appendChild(activityItem)

        setTimeout(() => {
          activityItem.style.opacity = "1"
        }, 100)
      }, index * 300)
    })
  }
}

