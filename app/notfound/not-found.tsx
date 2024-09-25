'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { Github, Linkedin, Mail } from "lucide-react"

export default function NotFound() {
    const [command, setCommand] = useState("")
    const router = useRouter()

    const handleCommand = (cmd: string) => {
        if (["home", "about", "projects", "chat"].includes(cmd)) {
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
                <title>404 - Page Not Found</title>
                <meta name="description" content="Oops! The page you&apos;re looking for doesn&apos;t exist." />
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
                        <h1 className="text-4xl font-bold text-[#34495E]">404 - Page Not Found</h1>
                    </div>
                    <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-md mb-8">
                        <p className="mb-4">Oops! It seems you&apos;ve ventured into uncharted territory.</p>
                        <p className="mb-4">Don&apos;t worry, even the best explorers get lost sometimes.</p>
                        <p>Use the command line below to navigate back to safety.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md">
                        <span className="mr-2 text-[#34495E]">$</span>
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-[#2C3E50]"
                            placeholder="Type &quot;home&quot;, &quot;about&quot;, &quot;projects&quot;, or &quot;chat&quot; to navigate"
                        />
                    </form>
                </motion.div>

                <footer className="mt-8 pt-4 border-t border-[#2C3E50] max-w-3xl mx-auto w-full">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex space-x-4">
                            <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer">
                                <Github className="text-[#34495E] hover:text-[#2980B9]" />
                            </a>
                            <a href="https://www.linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="text-[#34495E] hover:text-[#2980B9]" />
                            </a>
                            <a href="mailto:your-email@example.com">
                                <Mail className="text-[#34495E] hover:text-[#2980B9]" />
                            </a>
                        </div>
                        <p>&copy; 2023 Your Name. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}