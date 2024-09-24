'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

export default function Contact() {
    const [command, setCommand] = useState('')
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([])
    const [easterEggFound, setEasterEggFound] = useState(false)
    const [points, setPoints] = useState(0)
    const router = useRouter()

    // Initial message
    const initialMessage = "Type 'home', 'about', or 'projects' to navigate";

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
        const handleMouseMove = (e: MouseEvent) => {
            setCursorTrail((prevTrail) => [
                { x: e.clientX, y: e.clientY, id: Date.now() },
                ...prevTrail.slice(0, 9),
            ])
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const handleCommand = (cmd: string) => {
        if (['home', 'about', 'projects'].includes(cmd)) {
            router.push(cmd === 'home' ? '/' : `/${cmd}`)
        } else if (cmd === 'theme') {
            setTheme(prev => prev === 'light' ? 'dark' : 'light')
        } else if (cmd === 'easter') {
            if (!easterEggFound) {
                setEasterEggFound(true)
                setPoints(prev => prev + 10)
                alert('Congratulations! You found the Easter Egg! +10 points')
            } else {
                alert('You&apos;ve already found the Easter Egg. Try something else!')
            }
        } else if (cmd === 'points') {
            alert(`Your current points: ${points}`)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(command.toLowerCase().trim())
        // Reset command to initial message
        setCommand('')
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
                    <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-[#34495E]' : 'text-[#ECE0C8]'}`}>Contact Me</h1>
                    <button
                        onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                        className={`p-2 rounded-full ${theme === 'light' ? 'bg-[#2C3E50] text-[#F5E6D3]' : 'bg-[#F5E6D3] text-[#2C3E50]'} bg-opacity-20 hover:bg-opacity-30 transition-colors duration-200`}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </button>
                </div>
                <div className={`${theme === 'light' ? 'bg-[#ECE0C8]' : 'bg-[#34495E]'} p-6 rounded-lg shadow-md mb-8`}>
                    <p className="mb-4">
                        I'm always open to new opportunities and collaborations. Feel free to reach out to me through any of the following channels:
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Email: your.email@example.com</li>
                        <li>LinkedIn: linkedin.com/in/yourprofile</li>
                        <li>GitHub: github.com/yourusername</li>
                        <li>Twitter: @yourhandle</li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} className={`flex items-center ${theme === 'light' ? 'bg-[#ECE0C8]' : 'bg-[#34495E]'} p-4 rounded-lg shadow-md`}>
                    <span className={`mr-2 ${theme === 'light' ? 'text-[#34495E]' : 'text-[#ECE0C8]'}`}>$</span>
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        className={`flex-grow bg-transparent outline-none ${theme === 'light' ? 'text-[#2C3E50]' : 'text-[#F5E6D3]'}`}
                        placeholder={initialMessage}
                    />
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
                            {/* Cursor SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="32"
                                viewBox="0 0 32 32"
                                width="32"
                                style={{
                                    opacity: 1 - index * 0.1,
                                }}
                            >
                                {/* SVG content */}
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
