'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Github, Linkedin, Mail } from 'lucide-react'

const projects = [
    { name: "Scriptoria", description: "Where words reign supreme. A no-fuss, distraction-free zone for writers to craft stories, blogs, and ideas in pure markdown bliss." },
    { name: "Finesse", description: "Master your money game. A sleek dashboard that turns budgeting into a visual feast, helping you save smarter and spend cooler." },
    { name: "LeapSkill", description: "Level up your skills, one course at a time. Your gateway to interactive learning, with webinars, quizzes, and everything to make you a pro." },
    { name: "Ascend", description: "Climb the career ladder. A job portal that's got your back with resume - building magic and top job matches—time to land your dream gig!" },
]

export default function Projects() {
    const [command, setCommand] = useState('')
    const router = useRouter()

    const handleCommand = (cmd: string) => {
        if ([`home`, `about`, `chat`].includes(cmd)) {
            router.push(cmd === `home` ? `/` : `/${cmd}`)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(command.toLowerCase().trim())
        setCommand('')
    }

    return (
        <>
            <Head>
                <title>Projects - Shrvan Benke</title>
                <meta name="description" content="Explore the projects of Shrvan Benke, a full-stack developer passionate about creating innovative web solutions." />
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
                        <h1 className="text-4xl font-bold text-[#34495E]">Projects</h1>
                    </div>
                    <p className="mb-8 text-lg">An assortment of my works, ranging from professional endeavors to personal coding adventures.</p>
                    <div className="space-y-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#ECE0C8] p-6 rounded-lg shadow-md group"
                            >
                                <div className="flex justify-between items-baseline mb-2">
                                    <h2 className="text-2xl font-bold text-[#34495E]">{project.name}</h2>
                                </div>
                                <p className="text-[#2C3E50] overflow-hidden transition-all duration-300 ease-in-out group-hover:h-auto">
                                    {project.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center mt-8 bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md">
                        <span className="mr-2 text-[#34495E]">$</span>
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-[#2C3E50]"
                            placeholder="Type 'home', 'about', or 'chat' to navigate"
                        />
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