// Theme Management
let currentTheme = localStorage.getItem("theme") || "dark"
let lucide // Declare the lucide variable

function initTheme() {
  if (currentTheme === "light") {
    document.body.classList.add("light-theme")
    updateThemeIcon("light")
  } else {
    document.body.classList.remove("light-theme")
    updateThemeIcon("dark")
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark"
  localStorage.setItem("theme", currentTheme)

  if (currentTheme === "light") {
    document.body.classList.add("light-theme")
    updateThemeIcon("light")
  } else {
    document.body.classList.remove("light-theme")
    updateThemeIcon("dark")
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById("theme-toggle")
  const icon = themeToggle.querySelector("i")

  if (theme === "light") {
    icon.setAttribute("data-lucide", "sun")
    themeToggle.classList.remove("text-yellow-400")
    themeToggle.classList.add("text-gray-700")
    themeToggle.classList.remove("bg-gray-800", "hover:bg-gray-700")
    themeToggle.classList.add("bg-gray-200", "hover:bg-gray-300")
  } else {
    icon.setAttribute("data-lucide", "moon")
    themeToggle.classList.remove("text-gray-700")
    themeToggle.classList.add("text-yellow-400")
    themeToggle.classList.remove("bg-gray-200", "hover:bg-gray-300")
    themeToggle.classList.add("bg-gray-800", "hover:bg-gray-700")
  }

  // Reinitialize Lucide icons
  lucide.createIcons()
}

// Smooth Scrolling
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

// CV Download
function downloadCV() {
  const link = document.createElement("a")
  link.href =
    "https://www.dropbox.com/scl/fi/n1whabv522gkqhk5e3qv9/Tanvin_Waseef_Resume.pdf?rlkey=qek6k2c1d7ljta8dr0e6seezf&st=9i1yr4i9&dl=1"
  link.target = "_blank"
  link.download = "Tanvin_Waseef_Resume.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Loading Screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen")
  loadingScreen.style.opacity = "0"
  setTimeout(() => {
    loadingScreen.style.display = "none"
    showNavbar()
    animateHero()
  }, 500)
}

// Navigation Animation
function showNavbar() {
  const navbar = document.getElementById("navbar")
  navbar.classList.add("nav-slide-down")
}

// Hero Animation
function animateHero() {
  createStars()
}

// Stars Animation
function createStars() {
  const starsContainer = document.querySelector(".stars-container")
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("div")
    star.className = "star"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 3 + "s"
    starsContainer.appendChild(star)
  }
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")

        // Special handling for timeline items
        if (entry.target.classList.contains("timeline-content")) {
          animateTimelineItems()
        }

        // Special handling for skill bars
        if (entry.target.classList.contains("skill-category")) {
          animateSkillBars(entry.target)
        }

        // Special handling for stats
        if (entry.target.classList.contains("stats-container")) {
          animateStats()
        }
      }
    })
  }, observerOptions)

  // Observe elements
  const elementsToObserve = [
    ".section-header",
    ".about-content",
    ".timeline-content",
    ".project-card",
    ".skill-category",
    ".contact-info",
    ".contact-form",
    ".stats-container",
  ]

  elementsToObserve.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el)
    })
  })
}

// Timeline Animation
function animateTimelineItems() {
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate")
    }, index * 100)
  })
}

// Skill Bars Animation
function animateSkillBars(skillCategory) {
  const skillBars = skillCategory.querySelectorAll(".skill-bar")
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width")
      bar.style.setProperty("--width", width + "%")
      bar.classList.add("animate")
    }, index * 100)
  })
}

// Stats Counter Animation
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")
  statNumbers.forEach((stat, index) => {
    setTimeout(() => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
      animateCounter(stat, target)
    }, index * 100)
  })
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current) + (target === 100 ? "%" : "+")
  }, 30)
}

// Contact Form
function initContactForm() {
  const form = document.getElementById("contact-form")
  const submitBtn = document.getElementById("submit-btn")
  const submitText = document.getElementById("submit-text")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Show loading state
    submitBtn.disabled = true
    submitText.textContent = "Sending..."
    submitBtn.innerHTML =
      '<div class="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2 inline-block"></div><span>Sending...</span>'

    const formData = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/mvgqgjer", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        showToast("Message sent successfully!", "Thank you for reaching out. I'll get back to you soon.", "success")
        form.reset()
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      showToast("Error sending message", "Please try again or contact me directly via email.", "error")
    } finally {
      // Reset button state
      submitBtn.disabled = false
      submitText.textContent = "Send Message"
      submitBtn.innerHTML = '<i data-lucide="mail" class="inline w-5 h-5 mr-2"></i><span>Send Message</span>'
      lucide.createIcons()
    }
  })
}

// Toast Notification
function showToast(title, message, type) {
  const toast = document.getElementById("toast")
  const toastIcon = document.getElementById("toast-icon")
  const toastTitle = document.getElementById("toast-title")
  const toastMessage = document.getElementById("toast-message")

  // Set content
  toastTitle.textContent = title
  toastMessage.textContent = message

  // Set icon based on type
  if (type === "success") {
    toastIcon.innerHTML = '<i data-lucide="check-circle" class="h-6 w-6 text-green-500"></i>'
  } else {
    toastIcon.innerHTML = '<i data-lucide="x-circle" class="h-6 w-6 text-red-500"></i>'
  }

  // Show toast
  toast.classList.add("show")
  lucide.createIcons()

  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show")
  }, 5000)
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme()

  // Initialize Lucide icons
  lucide = window.lucide // Assign the lucide variable from the window object
  lucide.createIcons()

  // Add event listeners
  document.getElementById("theme-toggle").addEventListener("click", toggleTheme)

  // Initialize scroll animations
  initScrollAnimations()

  // Initialize contact form
  initContactForm()

  // Hide loading screen after 1.5 seconds
  setTimeout(hideLoadingScreen, 1500)
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 100) {
    navbar.style.backgroundColor = currentTheme === "dark" ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)"
  } else {
    navbar.style.backgroundColor = currentTheme === "dark" ? "rgba(17, 24, 39, 0.9)" : "rgba(255, 255, 255, 0.9)"
  }
})
