'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

const skills = [
  'JavaScript (ES6+)',
  'React & Next.js',
  'Node.js & Express',
  'TypeScript',
  'GraphQL',
  'AWS & Serverless',
]

const projects = [
  { name: 'wne3 live', role: 'lead full stack engineer', description: 'wne3 live is a first of its kind, peer-to-peer commerce platform. I lead the development of its web application while collaborating with interns and other developers.' },
  { name: 'rift', role: 'freelance developer', description: 'A cutting-edge project focusing on innovative solutions for real-time data processing and visualization.' },
  { name: 'indielettr', role: 'founder, creator', description: 'Empowering indie creators and small businesses to reach their audience through an intuitive email marketing platform.' },
  { name: 'limitix', role: 'maintainer, creator', description: 'Flexible, in-memory rate limiting for single-server next.js applications, ensuring optimal performance and security.' },
  { name: 'lettr0', role: 'founder, creator', description: 'Cut the crap with 0 effort email inbox management, using AI to categorize and prioritize your emails.' },
]

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [hints, setHints] = useState<string[]>([])
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const [easterEggFound, setEasterEggFound] = useState(false)
  const [points, setPoints] = useState(0)
  const router = useRouter()
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: 'Available commands: about, projects, contact, skills, clear, theme, github, easter, points',
    about: 'Navigate to about page',
    projects: 'Navigate to projects page',
    contact: 'Navigate to contact page',
    skills: 'Display skills',
    clear: 'Clear terminal',
    theme: 'Toggle between light and dark theme',
    github: 'Open GitHub profile',
    easter: 'Try to find the Easter Egg!',
    points: 'Check your current points',
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    }
    const savedPoints = localStorage.getItem('points')
    if (savedPoints) {
      setPoints(parseInt(savedPoints))
    }
    const savedEasterEgg = localStorage.getItem('easterEggFound')
    if (savedEasterEgg) {
      setEasterEggFound(savedEasterEgg === 'true')
    }

    setOutput([
      'Welcome to my portfolio.',
      'I\'m a full-stack developer passionate about creating innovative web solutions.',
      'Type "help" for available commands.',
    ])
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('points', points.toString())
  }, [points])

  useEffect(() => {
    localStorage.setItem('easterEggFound', easterEggFound.toString())
  }, [easterEggFound])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrail((prevTrail) => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prevTrail.slice(0, 9),
      ])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleCommand = async (cmd: string) => {
    setOutput((prev) => [...prev, `$ ${cmd}`])

    if (cmd in commands) {
      setOutput((prev) => [...prev, commands[cmd as keyof typeof commands]])
      if (['about', 'projects', 'contact'].includes(cmd)) {
        await simulateTyping(`Navigating to ${cmd} page...`)
        setTimeout(() => router.push(`/${cmd}`), 1000)
      } else if (cmd === 'clear') {
        setTimeout(() => setOutput([]), 500)
      } else if (cmd === 'skills') {
        setOutput((prev) => [...prev, 'My skills include:', ...skills])
      } else if (cmd === 'theme') {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        setOutput((prev) => [...prev, `Switched to ${theme === 'light' ? 'dark' : 'light'} theme`])
      } else if (cmd === 'github') {
        window.open('https://github.com/yourusername', '_blank')
        setOutput((prev) => [...prev, 'Opening GitHub profile in a new tab...'])
      } else if (cmd === 'easter') {
        if (!easterEggFound) {
          setEasterEggFound(true)
          setPoints((prev) => prev + 10)
          setOutput((prev) => [...prev, 'Congratulations! You found the Easter Egg! +10 points'])
        } else {
          setOutput((prev) => [...prev, 'You\'ve already found the Easter Egg. Try something else!'])
        }
      } else if (cmd === 'points') {
        setOutput((prev) => [...prev, `Your current points: ${points}`])
      }
    } else {
      setOutput((prev) => [
        ...prev,
        'Command not recognized. Type "help" for available commands.',
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input.toLowerCase().trim())
    setInput('')
    setHints([])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setInput(value)
    if (value) {
      const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(value))
      setHints(matchingCommands)
    } else {
      setHints([])
    }
  }

  const simulateTyping = async (text: string) => {
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      setOutput((prev) => [...prev.slice(0, -1), prev[prev.length - 1] + text[i]])
    }
  }

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F5E6D3] text-[#2C3E50]' : 'bg-[#2C3E50] text-[#F5E6D3]'} font-mono p-8 transition-colors duration-300`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-[#34495E]' : 'text-[#ECE0C8]'}`}>Shrvan Benke</h1>
          <button
            onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
            className={`p-2 rounded-full ${theme === 'light' ? 'bg-[#2C3E50] text-[#F5E6D3]' : 'bg-[#F5E6D3] text-[#2C3E50]'} bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
        <h2 className={`text-2xl mb-8 ${theme === 'light' ? 'text-[#34495E]' : 'text-[#ECE0C8]'}`}>Full-Stack Developer</h2>
        <div ref={terminalRef} className={`mb-8 ${theme === 'light' ? 'border-[#34495E]' : 'border-[#ECE0C8]'} border p-4 rounded overflow-auto h-64`}>
          <AnimatePresence>
            {output.map((line, index) => (
              <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div>{line}</div>
              </motion.div>
            ))}
          </AnimatePresence>
          {showCursor && <span className="cursor">|</span>}
        </div>
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className={`flex-1 p-2 rounded ${theme === 'light' ? 'bg-[#F5E6D3]' : 'bg-[#34495E]'} border ${theme === 'light' ? 'border-[#34495E]' : 'border-[#ECE0C8]'}`}
            placeholder="Type a command..."
          />
          <button type="submit" className={`ml-2 p-2 rounded ${theme === 'light' ? 'bg-[#34495E] text-[#F5E6D3]' : 'bg-[#F5E6D3] text-[#34495E]'} transition-colors duration-200`}>Submit</button>
        </form>
        {hints.length > 0 && (
          <ul className={`bg-[#ECE0C8] shadow-lg rounded p-2`}>
            {hints.map((hint, index) => (
              <li key={index} className="hover:bg-gray-200 p-1 cursor-pointer">{hint}</li>
            ))}
          </ul>
        )}
        <div className="absolute">
          {cursorTrail.map((item) => (
            <div
              key={item.id}
              className="absolute w-4 h-4 rounded-full bg-blue-500 opacity-50"
              style={{ top: `${item.y}px`, left: `${item.x}px` }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
