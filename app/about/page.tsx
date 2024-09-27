'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { Github, Linkedin, Mail, ChevronRight } from "lucide-react"

const skills = [
    "JavaScript",
    "React & Next.js",
    "Node.js",
    "TypeScript",
    "GraphQL",
    "MongoDB",
    "AWS",
    "Docker",
]

export default function About() {
    const [command, setCommand] = useState("")
    const router = useRouter()
    const [currentSkillIndex, setCurrentSkillIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length)
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    const handleCommand = (cmd: string) => {
        if (["home", "projects", "chat"].includes(cmd)) {
            router.push(cmd === "home" ? "/" : `/${cmd}`)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(command.toLowerCase().trim())
        setCommand("")
    }

    return (
        <>
            <Head>
                <title>About - Shrvan Benke</title>
                <meta name="description" content="Discover the journey of Shrvan Benke, a full-stack developer passionate about crafting efficient and innovative web solutions." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F5E6D3] to-[#E6D0B8] text-[#2C3E50] font-mono p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-grow max-w-3xl mx-auto w-full"
                >
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-[#34495E] tracking-tight">About Me</h1>
                    </div>
                    <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-lg mb-8 border border-[#D1B894]">
                        <p className="mb-4">
                            I'm Shrvan, a dedicated full-stack engineer driven by a deep passion for building web applications that are scalable, performant, and user-friendly. With a wealth of experience across different projects, I continually strive for excellence in every line of code.
                        </p>
                        <p className="mb-4">
                            My journey into tech began with an innate curiosity to understand how things work under the hood. That curiosity quickly led me to the world of programming, where I've since honed my skills across a range of tools and technologies. Whether it's contributing to dynamic startups or enhancing large-scale enterprise systems, my goal has always been to solve complex problems with clean, efficient code.
                        </p>
                        <p>
                            Outside of coding, I enjoy exploring cutting-edge technologies, contributing to open-source initiatives, and sharing my insights through tech talks and writing blog posts. I believe in constant growth and aim to learn something new every day.
                        </p>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-[#34495E]">Skills</h2>
                    <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-lg mb-8 border border-[#D1B894]">
                        <motion.div
                            key={currentSkillIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-semibold text-center"
                        >
                            {skills[currentSkillIndex]}
                        </motion.div>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: index === currentSkillIndex ? 1 : 0.5, scale: index === currentSkillIndex ? 1 : 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-[#D1B894] text-[#2C3E50] px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center bg-[#ECE0C8]
text-[#2C3E50] p-4 rounded-lg shadow-lg border border-[#D1B894]">
                        <ChevronRight size={18} className="mr-2 text-[#34495E]" />
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-[#2C3E50]"
                            placeholder="Type 'home', 'projects', or 'chat' to navigate"
                        />
                    </form>
                </motion.div>

                <footer className="mt-8 pt-4 border-t border-[#2C3E50] max-w-3xl mx-auto w-full">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex space-x-4">
                            <a href="https://github.com/pix-panther24" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-200">
                                <Github size={18} />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/shrvanbenke/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-200">
                                <Linkedin size={18} />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="mailto:benkeshrvan@gmail.com" className="hover:opacity-70 transition-opacity duration-200">
                                <Mail size={18} />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span>Mumbai, India</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}