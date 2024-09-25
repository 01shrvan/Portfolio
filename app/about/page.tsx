'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Github, Linkedin, Mail } from 'lucide-react'

const skills = [
    'JavaScript (ES6+)',
    'React & Next.js',
    'Node.js & Express',
    'TypeScript',
    'GraphQL',
    'AWS & Serverless',
]

export default function About() {
    const [command, setCommand] = useState('')
    const router = useRouter()

    const handleCommand = (cmd: string) => {
        if (['home', 'projects', 'chat'].includes(cmd)) {
            router.push(cmd === 'home' ? '/' : `/${cmd}`)
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
                <title>About - Shrvan Benke</title>
                <meta name="description" content="Learn more about Shrvan Benke, a full-stack developer passionate about creating innovative web solutions." />
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
                        <h1 className="text-4xl font-bold text-[#34495E]">About Me</h1>
                    </div>
                    <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-md mb-8">
                        <p className="mb-4">
                            I'm a full-stack engineer with a passion for building scalable and performant web applications. With years of experience in the industry, I've developed a keen eye for detail and a love for clean, efficient code.
                        </p>
                        <p className="mb-4">
                            My journey in tech started with a fascination for how things work, which naturally led me to programming. Since then, I've worked on a variety of projects, from small startups to large enterprise applications, always striving to learn and improve my craft.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through tech talks and blog posts.
                        </p>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-[#34495E]">Skills</h2>
                    <ul className="list-disc list-inside mb-8 bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-md">
                        {skills.map((skill, index) => (
                            <motion.li
                                key={skill}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="mb-2"
                            >
                                {skill}
                            </motion.li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit} className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md">
                        <span className="mr-2 text-[#34495E]">$</span>
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