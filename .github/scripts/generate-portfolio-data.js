const axios = require("axios")
const fs = require("fs-extra")
const path = require("path")

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "NishDananjaya"
const API_BASE_URL = "https://api.github.com"

// Headers for GitHub API requests
const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}

// Create data directory if it doesn't exist
const dataDir = path.join(process.cwd(), "data")
fs.ensureDirSync(dataDir)

// Helper function to format date to "time ago"
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = Math.floor(seconds / 31536000)
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`
  }

  interval = Math.floor(seconds / 2592000)
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`
  }

  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`
  }

  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`
  }

  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`
  }

  return "just now"
}

// Helper function to determine if a repository should be featured
function shouldFeature(repo) {
  // Feature repositories with more stars or that are pinned
  return repo.stargazers_count > 5 || repo.topics.includes("portfolio-featured")
}

// Helper function to determine repository category
function getRepoCategory(repo) {
  const topics = repo.topics || []
  const name = repo.name.toLowerCase()
  const description = (repo.description || "").toLowerCase()

  // Check for AI/ML related repositories
  if (
    topics.some((topic) =>
      ["ai", "machine-learning", "deep-learning", "ml", "tensorflow", "pytorch"].includes(topic),
    ) ||
    name.includes("ai") ||
    name.includes("ml") ||
    description.includes("machine learning") ||
    description.includes("artificial intelligence")
  ) {
    return "ai"
  }

  // Check for FPGA/hardware related repositories
  if (
    topics.some((topic) => ["fpga", "vhdl", "verilog", "hardware", "embedded"].includes(topic)) ||
    name.includes("fpga") ||
    name.includes("vhdl") ||
    name.includes("verilog") ||
    description.includes("fpga") ||
    description.includes("hardware design")
  ) {
    return "fpga"
  }

  // Check for embedded systems
  if (
    topics.some((topic) => ["embedded", "iot", "arduino", "esp32", "raspberry-pi"].includes(topic)) ||
    name.includes("embedded") ||
    name.includes("iot") ||
    name.includes("arduino") ||
    description.includes("embedded") ||
    description.includes("iot")
  ) {
    return "embedded"
  }

  // Default to web for other repositories
  return "web"
}

// Helper function to extract technologies from repository
function extractTechnologies(repo) {
  const technologies = []

  // Add languages as technologies
  if (repo.language) {
    technologies.push(repo.language)
  }

  // Add topics that might be technologies
  const techTopics = (repo.topics || []).filter((topic) => !["project", "portfolio", "featured"].includes(topic))

  // Add up to 5 technologies
  return [...new Set([...technologies, ...techTopics])].slice(0, 5)
}

// Fetch user profile data
async function fetchUserProfile() {
  try {
    console.log(`Fetching user profile for ${GITHUB_USERNAME}...`)
    const { data } = await axios.get(`${API_BASE_URL}/users/${GITHUB_USERNAME}`, { headers })

    // Get user's repositories to count stars
    const repos = await fetchRepositories()
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

    // Get language statistics
    const languages = {}
    let totalSize = 0

    for (const repo of repos) {
      if (!repo.fork) {
        // Skip forked repositories
        try {
          const { data: repoLanguages } = await axios.get(repo.languages_url, { headers })

          for (const [language, size] of Object.entries(repoLanguages)) {
            languages[language] = (languages[language] || 0) + size
            totalSize += size
          }
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error.message)
        }
      }
    }

    // Calculate language percentages
    const languageStats = Object.entries(languages)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)

    // Combine top languages and group others
    const topLanguages = languageStats.slice(0, 4)
    const otherPercentage = languageStats.slice(4).reduce((sum, lang) => sum + lang.percentage, 0)

    if (otherPercentage > 0) {
      topLanguages.push({ name: "Other", percentage: otherPercentage })
    }

    // Get contribution count (approximate from events)
    const events = await fetchUserEvents()
    const contributionEvents = events.filter((event) =>
      ["PushEvent", "PullRequestEvent", "IssuesEvent", "CommitCommentEvent"].includes(event.type),
    )

    // Create user stats object
    const userStats = {
      user: data.login,
      name: data.name || data.login,
      avatar: data.avatar_url,
      bio: data.bio || "Software developer passionate about creating elegant solutions to complex problems.",
      location: data.location || "",
      email: data.email || "",
      website: data.blog || "",
      twitter: data.twitter_username || "",
      linkedin: GITHUB_USERNAME.toLowerCase(), // Assuming LinkedIn username matches GitHub
      stats: {
        repositories: data.public_repos,
        stars: totalStars,
        followers: data.followers,
        following: data.following,
        contributions: contributionEvents.length,
      },
      languages: topLanguages,
    }

    // Save user stats to file
    await fs.writeJson(path.join(dataDir, "github-stats.json"), userStats, { spaces: 2 })
    console.log("User stats saved successfully!")

    return userStats
  } catch (error) {
    console.error("Error fetching user profile:", error.message)
    throw error
  }
}

// Fetch user repositories
async function fetchRepositories() {
  try {
    console.log(`Fetching repositories for ${GITHUB_USERNAME}...`)
    const { data } = await axios.get(`${API_BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers,
    })

    return data
  } catch (error) {
    console.error("Error fetching repositories:", error.message)
    throw error
  }
}

// Fetch user events (activity)
async function fetchUserEvents() {
  try {
    console.log(`Fetching events for ${GITHUB_USERNAME}...`)
    const { data } = await axios.get(`${API_BASE_URL}/users/${GITHUB_USERNAME}/events?per_page=100`, { headers })

    return data
  } catch (error) {
    console.error("Error fetching user events:", error.message)
    throw error
  }
}

// Generate projects data
async function generateProjectsData() {
  try {
    const repos = await fetchRepositories()

    // Filter out forked repositories unless they have significant contributions
    const filteredRepos = repos.filter((repo) => !repo.fork || repo.stargazers_count > 0)

    // Transform repositories into project format
    const projects = filteredRepos.map((repo) => ({
      id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), // Capitalize words
      description: repo.description || `A ${getRepoCategory(repo)} project.`,
      category: getRepoCategory(repo),
      technologies: extractTechnologies(repo),
      github: repo.html_url,
      demo: repo.homepage || null,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      featured: shouldFeature(repo),
    }))

    // Save projects to file
    await fs.writeJson(path.join(dataDir, "projects.json"), projects, { spaces: 2 })
    console.log(`${projects.length} projects saved successfully!`)

    return projects
  } catch (error) {
    console.error("Error generating projects data:", error.message)
    throw error
  }
}

// Generate activity data
async function generateActivityData() {
  try {
    const events = await fetchUserEvents()

    // Transform events into activity format
    const activities = events.slice(0, 20).map((event) => {
      const activity = {
        type: event.type.replace("Event", "").toLowerCase(),
        repo: event.repo.name.split("/")[1],
        time: formatTimeAgo(new Date(event.created_at)),
        icon: "code-branch", // Default icon
        message: null,
      }

      // Set appropriate icon and message based on event type
      switch (event.type) {
        case "PushEvent":
          activity.type = "push"
          activity.icon = "code-branch"
          activity.message = event.payload.commits?.[0]?.message || null
          break
        case "WatchEvent":
          activity.type = "star"
          activity.icon = "star"
          break
        case "CreateEvent":
          if (event.payload.ref_type === "repository") {
            activity.type = "create"
            activity.icon = "plus"
            activity.message = `Created repository ${event.repo.name.split("/")[1]}`
          } else if (event.payload.ref_type === "tag") {
            activity.type = "release"
            activity.icon = "tag"
            activity.message = `Created tag ${event.payload.ref}`
          }
          break
        case "ForkEvent":
          activity.type = "fork"
          activity.icon = "code-branch"
          break
        case "IssuesEvent":
          activity.type = "issue"
          activity.icon = "exclamation-circle"
          activity.message = event.payload.issue?.title || null
          break
        case "IssueCommentEvent":
          activity.type = "comment"
          activity.icon = "comment"
          activity.message = event.payload.comment?.body?.substring(0, 60) + "..." || null
          break
        case "PullRequestEvent":
          activity.type = "pull_request"
          activity.icon = "code-pull-request"
          activity.message = event.payload.pull_request?.title || null
          break
        case "ReleaseEvent":
          activity.type = "release"
          activity.icon = "tag"
          activity.message = event.payload.release?.name || null
          break
        case "CommitCommentEvent":
          activity.type = "commit"
          activity.icon = "code-commit"
          activity.message = event.payload.comment?.body?.substring(0, 60) + "..." || null
          break
        default:
          activity.icon = "code"
      }

      return activity
    })

    // Filter out activities with missing data
    const filteredActivities = activities.filter((activity) => activity.repo && activity.time)

    // Save activities to file (limit to 10)
    await fs.writeJson(path.join(dataDir, "github-activity.json"), filteredActivities.slice(0, 10), { spaces: 2 })
    console.log(`${filteredActivities.length} activities saved successfully!`)

    return filteredActivities
  } catch (error) {
    console.error("Error generating activity data:", error.message)
    throw error
  }
}

// Main function to run all data generation
async function main() {
  try {
    await fetchUserProfile()
    await generateProjectsData()
    await generateActivityData()
    console.log("All portfolio data generated successfully!")
  } catch (error) {
    console.error("Error generating portfolio data:", error.message)
    process.exit(1)
  }
}

// Run the main function
main()

