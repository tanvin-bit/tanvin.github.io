"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ChevronDown,
  Download,
  Play,
  Mail,
  Phone,
  Instagram,
  ExternalLink,
  MapPin,
  Star,
  Zap,
  Code,
  Video,
  ImageIcon,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("light", savedTheme === "light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("light", newTheme === "light")
  }

  const [isLoading, setIsLoading] = useState(true)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const { scrollY } = useScroll()
  const { toast } = useToast()

  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormSubmitting(true)

    const form = e.currentTarget
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
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        })
        form.reset()
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setFormSubmitting(false)
    }
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href =
      "https://www.dropbox.com/scl/fi/n1whabv522gkqhk5e3qv9/Tanvin_Waseef_Resume.pdf?rlkey=qek6k2c1d7ljta8dr0e6seezf&st=9i1yr4i9&dl=1"
    link.target = "_blank"
    link.download = "Tanvin_Waseef_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white text-lg font-medium"
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ease-in-out overflow-x-hidden ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          theme === "dark" ? "bg-gray-900/90 border-purple-500/20" : "bg-white/90 border-gray-200 shadow-sm"
        } border-b`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Tanvin Waseef
            </motion.div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-8">
                {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`font-medium transition-colors duration-300 ${
                      theme === "dark" ? "text-gray-300 hover:text-purple-400" : "text-gray-700 hover:text-purple-600"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
              {/* Enhanced Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-2 rounded-full transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: theme === "dark" ? 0 : 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  </motion.div>
                  <span className="sr-only">Toggle theme</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-br from-purple-900/20 via-gray-900 to-pink-900/20"
              : "bg-gradient-to-br from-purple-100/30 via-white to-pink-100/30"
          }`}
        />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${theme === "dark" ? "bg-purple-400" : "bg-purple-300"}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Tanvin Waseef
            </h1>
            <p className={`text-xl md:text-2xl mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              Passionate Video Editor, Image Editor & Prompt Engineer
            </p>
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Transforming ideas into compelling visual content since 2020
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              View My Work
            </Button>

            <Button
              onClick={downloadCV}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <ChevronDown className="h-8 w-8 text-purple-400 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 ${theme === "dark" ? "bg-gray-800/50" : "bg-gradient-to-r from-gray-50 to-gray-100"}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card
                className={`backdrop-blur-sm transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800/50 border-purple-500/20" : "bg-white/80 border-gray-200 shadow-lg"
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MapPin className="h-6 w-6 text-purple-400 mr-3" />
                    <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                      Born in 2008, Dhaka, Bangladesh
                    </span>
                  </div>
                  <p className={`text-lg leading-relaxed mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    I am a passionate video editor who started my journey in 2020. Since then, I have edited several
                    hundred videos and specialized in image redesigning and AI prompting.
                  </p>
                  <p className={`text-lg leading-relaxed mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    I learned editing from LinkedIn and YouTube, beginning with mobile apps like CapCut, KineMaster, and
                    Alight Motion. Now I work with professional tools like Adobe Premiere Pro, After Effects, and
                    Audacity.
                  </p>
                  <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    My goal is to transform ideas into compelling visual content that tells stories and engages
                    audiences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3
                className={`text-2xl font-bold mb-8 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                My Journey
              </h3>
              <div className="space-y-6">
                {[
                  { year: "2020", event: "Started video editing journey", icon: <Video className="h-5 w-5" /> },
                  { year: "2021", event: "Mastered mobile editing apps", icon: <Zap className="h-5 w-5" /> },
                  { year: "2022", event: "Transitioned to professional tools", icon: <Star className="h-5 w-5" /> },
                  { year: "2023", event: "Specialized in AI prompting", icon: <Code className="h-5 w-5" /> },
                  { year: "2024", event: "Hundreds of videos edited", icon: <Sparkles className="h-5 w-5" /> },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 ${
                      theme === "dark" ? "bg-gray-800/30 border-purple-500/20" : "bg-white/50 border-gray-200"
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-purple-400 font-bold">{item.year}</div>
                      <div className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{item.event}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${theme === "dark" ? "" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8" />
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Here are some of my best video editing and creative projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Demo Video Showcase",
                description: "A portfolio demo reel showcasing smooth transitions and visual editing expertise.",
                tools: ["Premiere Pro", "After Effects"],
                image: "/images/project-1.png",
                link: "https://youtu.be/PEc9FbbIIhw?si=nxK-ZkZQ6O8i-MYf",
                type: "video",
              },
              {
                title: "Featured Design",
                description: "A minimalist visual design crafted for brand identity and digital presence.",
                tools: ["Photoshop", "After Effects"],
                image: "/images/project-2.png",
                link: "#",
                type: "image",
              },
              {
                title: "Stylish Visual Edit",
                description: "A modern, upbeat video edit designed for digital platforms and social engagement.",
                tools: ["Premiere Pro", "After Effects"],
                image: "/images/project-3.png",
                link: "https://youtu.be/sbfKUVtmMZE?si=dI4rK_zvTEjgpbUW",
                type: "video",
              },
              {
                title: "Portfolio Website",
                description:
                  "A modern portfolio site to showcase my professional editing, design, and branding capabilities.",
                tools: ["Next.js", "Tailwind CSS", "Framer Motion"],
                image: "/images/portfolio-website.png",
                link: typeof window !== "undefined" ? window.location.href : "#",
                type: "website",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group h-full"
              >
                <Card
                  className={`backdrop-blur-sm overflow-hidden transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-purple-500/20 hover:border-purple-500/50"
                      : "bg-white border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="relative overflow-hidden h-64 flex-shrink-0">
                    <img
                      src={project.image || "/placeholder.svg?height=300&width=400"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => window.open(project.link, "_blank")}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg"
                      >
                        {project.type === "video" ? (
                          <Play className="h-4 w-4 mr-2" />
                        ) : (
                          <ExternalLink className="h-4 w-4 mr-2" />
                        )}
                        {project.type === "video" ? "Watch Video" : "View Project"}
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {project.title}
                    </h3>
                    <p className={`mb-4 flex-grow ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tools.map((tool, toolIndex) => (
                        <Badge key={toolIndex} className="bg-purple-600/20 text-purple-300 border-purple-500/30">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 ${theme === "dark" ? "bg-gray-800/50" : "bg-gradient-to-r from-gray-50 to-gray-100"}`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Tools
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: "Video Editing",
                icon: <Video className="h-8 w-8" />,
                skills: [
                  { name: "Adobe Premiere Pro", level: 95 },
                  { name: "After Effects", level: 90 },
                  { name: "CapCut", level: 98 },
                  { name: "KineMaster", level: 95 },
                ],
              },
              {
                category: "Audio Editing",
                icon: <Zap className="h-8 w-8" />,
                skills: [
                  { name: "Audacity", level: 85 },
                  { name: "Audio Sync", level: 90 },
                  { name: "Sound Design", level: 80 },
                  { name: "Voice Enhancement", level: 85 },
                ],
              },
              {
                category: "Creative Tools",
                icon: <ImageIcon className="h-8 w-8" />,
                skills: [
                  { name: "AI Prompting", level: 92 },
                  { name: "Image Redesign", level: 88 },
                  { name: "Alight Motion", level: 90 },
                  { name: "Color Grading", level: 85 },
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className={`backdrop-blur-sm h-full transition-all duration-300 ${
                    theme === "dark" ? "bg-gray-800/50 border-purple-500/20" : "bg-white/80 border-gray-200 shadow-lg"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white mr-4">
                        {category.icon}
                      </div>
                      <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between mb-2">
                            <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                              {skill.name}
                            </span>
                            <span className="text-purple-400">{skill.level}%</span>
                          </div>
                          <div
                            className={`w-full rounded-full h-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: skillIndex * 0.1 }}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Videos Edited" },
              { number: "15+", label: "Tools Mastered" },
              { number: "4+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${theme === "dark" ? "" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8" />
            <p className={`text-lg max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Ready to bring your vision to life? Let's collaborate on your next project!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className={`text-2xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Contact Information
              </h3>
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="h-6 w-6" />,
                    label: "Email",
                    value: "tanvinwaseef15@gmail.com",
                    href: "mailto:tanvinwaseef15@gmail.com",
                  },
                  {
                    icon: <Phone className="h-6 w-6" />,
                    label: "Phone",
                    value: "+8801960405887",
                    href: "tel:+8801960405887",
                  },
                  {
                    icon: <Instagram className="h-6 w-6" />,
                    label: "Instagram",
                    value: "@tha_introvert_bro",
                    href: "https://instagram.com/tha_introvert_bro",
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.href.startsWith("http") ? "_blank" : undefined}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 group ${
                      theme === "dark"
                        ? "bg-gray-800/50 border-purple-500/20 hover:border-purple-500/50"
                        : "bg-gray-50 border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                      {contact.icon}
                    </div>
                    <div>
                      <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {contact.label}
                      </div>
                      <div className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {contact.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card
                className={`backdrop-blur-sm transition-all duration-300 ${
                  theme === "dark" ? "bg-gray-800/50 border-purple-500/20" : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Send a Message
                  </h3>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className={`transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-purple-500 focus:ring-purple-500`}
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        className={`transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-purple-500 focus:ring-purple-500`}
                      />
                    </div>
                    <div>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        rows={5}
                        className={`resize-none transition-all duration-300 ${
                          theme === "dark"
                            ? "bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                            : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                        } focus:border-purple-500 focus:ring-purple-500`}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {formSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Mail className="mr-2 h-5 w-5" />
                      )}
                      {formSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 border-t transition-all duration-300 ${
          theme === "dark" ? "bg-gray-900 border-purple-500/20" : "bg-gray-100 border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Tanvin Waseef
              </div>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                © 2025 Tanvin Waseef. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Projects", id: "projects" },
                { name: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors duration-300 ${
                    theme === "dark" ? "text-gray-400 hover:text-purple-400" : "text-gray-600 hover:text-purple-600"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
