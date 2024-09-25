'use client'

import { useState } from "react"
import Head from "next/head"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Prepare the data to send
        const data = { name, email, message }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            setResponseMessage("Your message has been sent successfully!")
            // Reset form fields
            setName("")
            setEmail("")
            setMessage("")
        } catch (error) {
            console.error("Error:", error)
            setResponseMessage("There was an error sending your message.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Head>
                <title>Contact - Shrvan Benke</title>
                <meta name="description" content="Contact Shrvan Benke, a full-stack developer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen flex flex-col bg-[#F5E6D3] text-[#2C3E50] font-mono p-8">
                <h1 className="text-4xl font-bold text-[#34495E] mb-6 text-center">Contact Me</h1>
                <form onSubmit={handleSubmit} className="bg-[#ECE0C8] p-8 rounded-lg shadow-md mx-auto max-w-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-[#2C3E50] p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-[#2C3E50] p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            rows={4}
                            className="w-full bg-transparent border-b border-[#34495E] outline-none text-[#2C3E50] p-2"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#34495E] text-white p-2 rounded ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
                {responseMessage && <p className={`text-center mt-4 ${responseMessage.includes("error") ? 'text-red-500' : 'text-green-500'}`}>{responseMessage}</p>}

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
                            <span>mumbai, ndia</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}