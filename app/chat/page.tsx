'use client'

import { useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"

export default function EnhancedChatPage() {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [project, setProject] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ name, company, project, email })
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F5E6D3] text-[#2C3E50] font-mono p-8">
            <main className="flex-grow max-w-3xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-[#34495E] mb-4">Chat</h1>
                <p className="text-lg text-[#34495E] mb-8">Let's start a conversation about your project. Fill out the form below, and I'll get back to you soon!</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-2xl font-bold text-[#34495E]">Hello,</p>

                    <div className="space-y-1">
                        <label htmlFor="name" className="text-lg font-bold text-[#34495E]">My name is</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-lg text-[#2C3E50] p-1"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="company" className="text-lg font-bold text-[#34495E]">I work for</label>
                        <input
                            type="text"
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-lg text-[#2C3E50] p-1"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="project" className="text-lg font-bold text-[#34495E]">& need help with</label>
                        <input
                            type="text"
                            id="project"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-lg text-[#2C3E50] p-1"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="email" className="text-lg font-bold text-[#34495E]">You can email me at</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-lg text-[#2C3E50] p-1"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#34495E] text-white py-2 rounded text-lg mt-6 hover:bg-[#2C3E50] transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </main>
            <footer className="mt-8 pt-4 border-t border-[#2C3E50] max-w-3xl mx-auto w-full px-8">
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
                        <span>mumbai, India</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}