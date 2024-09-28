'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { Github, Linkedin, Mail, ChevronRight, Code, ExternalLink } from "lucide-react"

const projects = [
    {
        name: "Scriptoria",
        description: "Where words reign supreme. A no-fuss, distraction-free zone for writers to craft stories, blogs, and ideas in pure markdown bliss.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "https://scriptoria.example.com"
    },
    {
        name: "Finesse",
        description: "Master your money game. A sleek dashboard that turns budgeting into a visual feast, helping you save smarter and spend cooler.",
        tags: ["Vue.js", "Express", "PostgreSQL"],
        link: "https://finesse.example.com"
    },
    {
        name: "LeapSkill",
        description: "Level up your skills, one course at a time. Your gateway to interactive learning, with webinars, quizzes, and everything to make you a pro.",
        tags: ["Next.js", "GraphQL", "AWS"],
        link: "https://leapskill.example.com"
    },
    {
        name: "Ascend",
        description: "Climb the career ladder. A job portal that's got your back with resume-building magic and top job matches—time to land your dream gig!",
        tags: ["React Native", "Firebase", "AI"],
        link: "https://ascend.example.com"
    },
]

export default function Projects() {
    const [command, setCommand] = useState("")
    const [activeProject, setActiveProject] = useState<string | null>(null)
    const router = useRouter()

    const handleCommand = (cmd: string) => {
        if (["home", "about", "chat"].includes(cmd)) {
            router.push(cmd === "home" ? "/" : `/${cmd}`)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(command.toLowerCase().trim())
        setCommand("")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveProject((prev) => {
                const currentIndex = projects.findIndex(p => p.name === prev)
                return projects[(currentIndex + 1) % projects.length].name
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <Head>
                <title>Projects - Shrvan Benke</title>
                <meta name="description" content="Explore the projects of Shrvan Benke, a full-stack developer passionate about creating innovative web solutions." />
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
                        <h1 className="text-4xl font-bold text-[#34495E] tracking-tight">Projects</h1>
                    </div>
                    <p className="mb-8 text-lg text-[#34495E]">An assortment of my works, ranging from professional endeavors to personal coding adventures.</p>
                    <div className="space-y-6">
                        <AnimatePresence>
                            {projects.map((project) => (
                                <motion.div
                                    key={project.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: activeProject === project.name ? 1.05 : 1,
                                        boxShadow: activeProject === project.name ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-[#ECE0C8] p-6 rounded-lg shadow-md group cursor-pointer"
                                    onClick={() => setActiveProject(project.name)}
                                >
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h2 className="text-2xl font-bold text-[#34495E]">{project.name}</h2>
                                    </div>
                                    <p className="text-[#2C3E50] mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="bg-[#34495E] text-white px-2 py-1 rounded-full text-xs">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center mt-8 bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md">
                        <ChevronRight size={18} className="mr-2 text-[#34495E]" />
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