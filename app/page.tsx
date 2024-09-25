'use client'

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Github, Linkedin, Mail } from "lucide-react"
import Head from "next/head"

export default function Home() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [hints, setHints] = useState<string[]>([])
  const [greeting, setGreeting] = useState("")
  const router = useRouter()
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = {
    help: "Available commands: about, projects, chat, clear, github",
    about: "Navigate to about page",
    projects: "Navigate to projects page",
    chat: "Navigate to chat page",
    clear: "Clear terminal",
    github: "Open GitHub profile",
  }

  useEffect(() => {
    setOutput([
      "Welcome to my portfolio.",
      "I'm a full-stack developer passionate about creating innovative web solutions.",
      'Type "help" for available commands.',
    ])
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    const updateGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) setGreeting("Good morning")
      else if (hour < 18) setGreeting("Good afternoon")
      else setGreeting("Good evening")
    }
    updateGreeting()
    const greetingInterval = setInterval(updateGreeting, 60000)

    return () => {
      clearInterval(cursorInterval)
      clearInterval(greetingInterval)
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = async (cmd: string) => {
    setOutput((prev) => [...prev, `$ ${cmd}`])

    if (cmd in commands) {
      setOutput((prev) => [...prev, commands[cmd as keyof typeof commands]])
      if (["about", "projects", "chat"].includes(cmd)) {
        await simulateTyping(`Navigating to ${cmd} page...`)
        setTimeout(() => router.push(`/${cmd}`), 1000)
      } else if (cmd === "clear") {
        setTimeout(() => setOutput([]), 500)
      } else if (cmd === "github") {
        window.open("https://github.com/pix-panther24", "_blank")
        setOutput((prev) => [...prev, "Opening GitHub profile in a new tab..."])
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
    setInput("")
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
    <>
      <Head>
        <title>Shrvan Benke - Full-Stack Developer</title>
        <meta name="description" content="Portfolio of Shrvan Benke, a full-stack developer passionate about creating innovative web solutions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-[#F5E6D3] text-[#2C3E50] font-mono p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow max-w-3xl mx-auto w-full"
        >
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-[#34495E]">Shrvan Benke</h1>
          </div>
          <h2 className="text-2xl mb-4 text-[#34495E]">Full-Stack Developer</h2>
          <p className="text-lg mb-8 text-[#34495E]">{greeting}, welcome to my portfolio!</p>
          <div ref={terminalRef} className="mb-8 bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-md h-80 overflow-y-auto">
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
            {showCursor && <span className="cursor">|</span>}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md relative">
            <span className="mr-2 text-[#34495E]">$</span>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="flex-grow bg-transparent outline-none text-[#2C3E50]"
              placeholder="Type a command or 'help'"
              autoFocus
            />
            <motion.span
              animate={{ opacity: showCursor ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-[#34495E]"
            >
              |
            </motion.span>
            {hints.length > 0 && (
              <div className="absolute left-0 bottom-full mb-2 bg-[#ECE0C8] text-[#2C3E50] p-2 rounded-md shadow-md">
                {hints.map((hint, index) => (
                  <div key={index} className="cursor-pointer hover:bg-opacity-20 px-2 py-1 rounded" onClick={() => setInput(hint)}>
                    {hint}
                  </div>
                ))}
              </div>
            )}
          </form>
        </motion.div>

        <footer className="mt-8 pt-4 border-t border-[#2C3E50] max-w-3xl mx-auto w-full">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <a href="https://github.com/pix-panther24" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/shrvanbenke/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:benkeshrvan@gmail.com" className="hover:opacity-70">
                <Mail size={18} />
                <span className="sr-only">Email</span>
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span>mumbai, india</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}