'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, Send, User, Briefcase, HelpCircle, AtSign } from "lucide-react"

type FormData = {
    name: string
    company: string
    project: string
    email: string
}

export default function EnhancedChatPage() {
    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch("/api/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                const errorData = await response.json()
                setError(errorData.error || 'Failed to send email')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    const inputFields = [
        { id: 'name', label: 'My name is', icon: <User size={18} /> },
        { id: 'company', label: 'I work for', icon: <Briefcase size={18} /> },
        { id: 'project', label: '& need help with', icon: <HelpCircle size={18} /> },
        { id: 'email', label: 'You can email me at', icon: <AtSign size={18} /> },
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
                            onSubmit={handleSubmit(onSubmit)}
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
                                        {...register(field.id as keyof FormData, { required: true })}
                                        className="w-full bg-transparent border-b-2 border-[#34495E] outline-none text-lg text-[#2C3E50] p-2 transition-all duration-300 focus:border-[#3498db]"
                                    />
                                    {errors[field.id as keyof FormData] && (
                                        <span className="text-red-500 text-sm">This field is required</span>
                                    )}
                                </motion.div>
                            ))}

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#34495E] text-white py-3 rounded-lg text-lg mt-6 hover:bg-[#2C3E50] transition-colors flex items-center justify-center disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <span>Sending...</span>
                                ) : (
                                    <>
                                        <Send size={18} className="mr-2" />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#ECE0C8] p-6 rounded-lg shadow-lg text-center"
                        >
                            <h2 className="text-2xl font-bold text-[#34495E] mb-4">Thank you!</h2>
                            <p className="text-lg text-[#2C3E50]">I've received your message and will get back to you soon.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <footer className="mt-8 pt-4 border-t border-[#2C3E50] max-w-3xl mx-auto w-full">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex space-x-4">
                            <a href="https://github.com/01shrvan" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity duration-200">
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