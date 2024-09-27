'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Send, User, Briefcase, HelpCircle, AtSign } from "lucide-react"

export default function EnhancedChatPage() {
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [project, setProject] = useState("")
    const [email, setEmail] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ name, company, project, email })
        setSubmitted(true)
    }

    const inputFields = [
        { id: 'name', value: name, setter: setName, label: 'My name is', icon: <User size={18} /> },
        { id: 'company', value: company, setter: setCompany, label: 'I work for', icon: <Briefcase size={18} /> },
        { id: 'project', value: project, setter: setProject, label: '& need help with', icon: <HelpCircle size={18} /> },
        { id: 'email', value: email, setter: setEmail, label: 'You can email me at', icon: <AtSign size={18} /> },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F5E6D3] to-[#E6D0B8] text-[#2C3E50] font-mono p-8">
            <main className="flex-grow max-w-3xl mx-auto w-full">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-[#34495E] mb-4"
                >
                    Let's Chat
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-[#34495E] mb-8"
                >
                    I'm excited to hear about your project! Fill out the form below, and I'll get back to you soon.
                </motion.p>
                <AnimatePresence>
                    {!submitted ? (
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            onSubmit={handleSubmit}
                            className="space-y-6 bg-[#ECE0C8] p-6 rounded-lg shadow-lg"
                        >
                            <p className="text-2xl font-bold text-[#34495E]">Hello,</p>

                            {inputFields.map((field, index) => (
                                <motion.div
                                    key={field.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="space-y-1"
                                >
                                    <label htmlFor={field.id} className="text-lg font-bold text-[#34495E] flex items-center">
                                        {field.icon}
                                        <span className="ml-2">{field.label}</span>
                                    </label>
                                    <input
                                        type={field.id === 'email' ? 'email' : 'text'}
                                        id={field.id}
                                        value={field.value}
                                        onChange={(e) => field.setter(e.target.value)}
                                        className="w-full bg-transparent border-b-2 border-[#34495E] outline-none text-lg text-[#2C3E50] p-2 transition-all duration-300 focus:border-[#3498db]"
                                        required
                                    />
                                </motion.div>
                            ))}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-[#34495E] text-white py-3 rounded-lg text-lg mt-6 hover:bg-[#2C3E50] transition-colors flex items-center justify-center"
                            >
                                <Send size={18} className="mr-2" />
                                Send Message
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#ECE0C8] p-6 rounded-lg shadow-lg text-center"
                        >
                            <h2 className="text-2xl font-bold text-[#34495E] mb-4">Thank you, {name}!</h2>
                            <p className="text-lg text-[#2C3E50]">I've received your message and will get back to you soon at {email}.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
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
    )
}