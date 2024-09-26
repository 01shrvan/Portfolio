"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { Github, Linkedin, Mail, Cpu, Wifi, Battery, Clock, Monitor } from "lucide-react"

export default function EnhancedDevExposed() {
    const [command, setCommand] = useState("")
    const [exposed, setExposed] = useState(false)
    const [devInfo, setDevInfo] = useState({
        browser: "",
        os: "",
        screenSize: "",
        battery: "",
        time: "",
        network: "",
        cpuCores: 0
    })
    const router = useRouter()

    useEffect(() => {
        const updateDevInfo = async () => {
            const ua = navigator.userAgent;
            const browserRegex = /(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i;
            const osRegex = /(mac|win|linux)/i;
            const [, browser] = ua.match(browserRegex) || [];
            const [, os] = ua.match(osRegex) || [];

            setDevInfo(prev => ({
                ...prev,
                browser: browser || "Unknown",
                os: os ? os.charAt(0).toUpperCase() + os.slice(1) : "Unknown",
                screenSize: `${window.screen.width}x${window.screen.height}`,
                time: new Date().toLocaleTimeString(),
                cpuCores: navigator.hardwareConcurrency || 0,
                network: navigator.onLine ? "Online" : "Offline",
            }))

            if ("getBattery" in navigator) {
                const bat: any = await (navigator as any).getBattery()
                setDevInfo(prev => ({
                    ...prev,
                    battery: `${Math.round(bat.level * 100)}%`
                }))
            }
        }

        updateDevInfo()
        const interval = setInterval(updateDevInfo, 1000)
        return () => clearInterval(interval)
    }, [])

    const handleCommand = async (cmd: string) => {
        if (["home", "about", "projects", "chat"].includes(cmd)) {
            router.push(cmd === "home" ? "/" : `/${cmd}`)
        } else if (cmd === "expose") {
            setExposed(true)
            await sendExposeDetails()  // Silent data sharing, no alerts to user
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCommand(command.toLowerCase().trim())
        setCommand("")
    }

    const sendExposeDetails = async () => {
        const details = `
            Browser: ${devInfo.browser}
            OS: ${devInfo.os}
            Screen Size: ${devInfo.screenSize}
            Time: ${devInfo.time}
            CPU Cores: ${devInfo.cpuCores}
            Network: ${devInfo.network}
            Battery: ${devInfo.battery || "N/A"}
        `;

        await fetch("/api/expose", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ details })
        });
    }

    const infoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <>
            <Head>
                <title>DevExposed 2.0 - Shrvan Benke</title>
                <meta name="description" content="Bro, get ready to be roasted by the code!" />
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
                        <h1 className="text-4xl font-bold text-[#34495E]">DevExposed 2.0</h1>
                    </div>
                    <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-md mb-8">
                        <AnimatePresence>
                            {!exposed ? (
                                <motion.div
                                    key="unexposed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p className="text-2xl font-bold mb-4">Yo, you think you're slick?</p>
                                    <p className="text-xl mb-4">Bet you won't drop 'expose' though....No cap.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="exposed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <p className="text-2xl font-bold mb-4">Caught in 4K! You thought you were safe?</p>
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            visible: { transition: { staggerChildren: 0.1 } },
                                        }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <motion.div variants={infoVariants} className="flex items-center">
                                            <Monitor className="mr-2" /> {devInfo.browser} on {devInfo.os} 🖥️
                                        </motion.div>
                                        <motion.div variants={infoVariants} className="flex items-center">
                                            <Cpu className="mr-2" /> {devInfo.cpuCores} CPU cores? flex, bro 💪
                                        </motion.div>
                                        <motion.div variants={infoVariants} className="flex items-center">
                                            <Wifi className="mr-2" /> {devInfo.network} - weak af Wi-Fi, bruh 📡
                                        </motion.div>
                                        <motion.div variants={infoVariants} className="flex items-center">
                                            <Battery className="mr-2" /> Battery: {devInfo.battery || "lol... plug in 🔌"}
                                        </motion.div>
                                        <motion.div variants={infoVariants} className="flex items-center">
                                            <Clock className="mr-2" /> Caught laggin' at {devInfo.time}, smh 😴
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <form onSubmit={handleSubmit} className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md">
                        <span className="mr-2 text-[#34495E]">$</span>
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            className="flex-grow bg-transparent outline-none text-[#2C3E50]"
                            placeholder="Type 'expose', 'home', 'about', 'projects', 'chat'"
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
                            <span>mumbai, India</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}
