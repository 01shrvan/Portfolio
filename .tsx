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
    github: 'Open GitHub profile'
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
        window.open('https://github.com/pix-panther24', '_blank')
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
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F5E6D3] text-[#2C3E50]' : 'bg-[#000] text-[#F5E6D3]'} font-mono p-8 transition-colors duration-300`}>
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
        <div ref={terminalRef} className={`mb-8 ${theme === 'light' ? 'bg-[#ECE0C8] text-[#2C3E50]' : 'bg-[#3a3838b9] text-[#F5E6D3]'} p-6 rounded-lg shadow-md h-80 overflow-y-auto`}>
          <AnimatePresence>
            {output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-2"
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <form onSubmit={handleSubmit} className={`flex items-center ${theme === 'light' ? 'bg-[#ECE0C8] text-[#2C3E50]' : 'bg-[#3a3838b9] text-[#F5E6D3]'} p-4 rounded-lg shadow-md relative`}>
          <span className={`mr-2 ${theme === 'light' ? 'text-[#34495E]' : 'text-[#ECE0C8]'}`}>$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className={`flex-grow bg-transparent outline-none ${theme === 'light' ? 'text-[#2C3E50]' : 'text-[#F5E6D3]'}`}
            placeholder="Type a command or 'help'"
            autoFocus
          />
          <motion.span
            animate={{ opacity: showCursor ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={theme === 'light' ? 'text-[#34495E]' : 'text-[#ECE0C8]'}
          >
            |
          </motion.span>
          {hints.length > 0 && (
            <div className={`absolute left-0 bottom-full mb-2 ${theme === 'light' ? 'bg-[#ECE0C8] text-[#2C3E50]' : 'bg-[#1b1a1a] text-[#F5E6D3]'} p-2 rounded-md shadow-md`}>
              {hints.map((hint, index) => (
                <div key={index} className="cursor-pointer hover:bg-opacity-20 px-2 py-1 rounded" onClick={() => setInput(hint)}>
                  {hint}
                </div>
              ))}
            </div>
          )}
        </form>
      </motion.div>
      <div className="fixed inset-0 pointer-events-none">
        <AnimatePresence>
          {cursorTrail.map((cursor, index) => (
            <motion.div
              key={cursor.id}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0.8 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: cursor.x,
                top: cursor.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 0 32 32"
                width="32"
                style={{
                  opacity: 1 - index * 0.1,
                }}
              >
                <g fill="none" fillRule="evenodd" transform="translate(10 7)">
                  <path
                    d="m6.148 18.473 1.863-1.003 1.615-.839-2.568-4.816h4.332l-11.379-11.408v16.015l3.316-3.221z"
                    fill="#fff"
                  />
                  <path
                    d="m6.431 17 1.765-.941-2.775-5.202h3.604l-8.025-8.043v11.188l2.53-2.442z"
                    fill="#000"
                  />
                </g>
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}