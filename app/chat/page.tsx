'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Chat() {
    const [command, setCommand] = useState('')
    const [chatMessages, setChatMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
        { text: "Hey there! I'm your AI assistant. What can I help you with today?", sender: 'bot' }
    ])
    const [userInput, setUserInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isTyping, setIsTyping] = useState(false) // Typing indicator state
    const router = useRouter()
    const chatContainerRef = useRef<HTMLDivElement>(null)

    // Load chat history from local storage
    useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages')
        if (storedMessages) {
            setChatMessages(JSON.parse(storedMessages))
        }
    }, [])

    // Save chat history to local storage
    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages))
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [chatMessages])

    const handleCommand = (cmd: string) => {
        if (['home', 'about', 'projects'].includes(cmd)) {
            router.push(cmd === 'home' ? '/' : `/${cmd}`)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(command.toLowerCase().trim())
        setCommand('')
    }

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (userInput.trim() === '' || isLoading) return

        const userMessage = { text: userInput, sender: 'user' as const }
        setChatMessages(prev => [...prev, userMessage])
        setUserInput('')
        setIsLoading(true)
        setIsTyping(true) // Start typing indicator

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userInput }),
            })

            if (!response.ok) {
                throw new Error('Failed to get response from AI')
            }

            const data = await response.json()
            setChatMessages(prev => [...prev, { text: data.message, sender: 'bot' }])
        } catch (error) {
            console.error('Error:', error)
            let errorMessage = "Sorry, I'm having trouble responding right now. Please try again later."
            if (error instanceof TypeError) {
                errorMessage = "Network error! Please check your connection.";
            }
            setChatMessages(prev => [...prev, { text: errorMessage, sender: 'bot' }])
        } finally {
            setIsLoading(false)
            setIsTyping(false) // Stop typing indicator
        }
    }

    // Handle key press for new lines and sending messages
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow new lines with Shift + Enter
                return;
            }
            handleChatSubmit(e);
        }
    }

    return (
        <>
            <Head>
                <title>Chat - Shrvan Benke</title>
                <meta name="description" content="Chat with an AI assistant on Shrvan Benke's portfolio site." />
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
                        <h1 className="text-4xl font-bold text-[#34495E]">Chat with AI</h1>
                    </div>
                    <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-[#34495E]">AI Assistant</h2>
                        <div ref={chatContainerRef} className="h-64 overflow-y-auto mb-4 p-4 bg-[#F5E6D3] rounded">
                            <AnimatePresence>
                                {chatMessages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                                    >
                                        <span className={`inline-block p-2 rounded ${message.sender === 'user' ? 'bg-[#34495E] text-[#F5E6D3]' : 'bg-[#ECE0C8] text-[#2C3E50]'}`}>
                                            {message.text}
                                        </span>
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="mb-2 text-left"
                                    >
                                        <span className="inline-block p-2 rounded bg-[#ECE0C8] text-[#2C3E50]">
                                            Typing...
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <form onSubmit={handleChatSubmit} className="flex">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyDown={handleKeyDown} // Handle key down events
                                className="flex-grow bg-[#F5E6D3] text-[#2C3E50] p-2 rounded-l outline-none"
                                placeholder="Type your message..."
                                disabled={isLoading}
                            />
                            <button type="submit" className="bg-[#34495E] text-[#F5E6D3] p-2 rounded-r" disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send'}
                            </button>
                        </form>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md">
                        <span className="mr-2 text-[#34495E]">$</span>
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-[#2C3E50]"
                            placeholder="Type 'home', 'about', or 'projects'"
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