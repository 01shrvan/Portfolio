"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  Github,
  Linkedin,
  Mail,
  Cpu,
  Wifi,
  Battery,
  Clock,
  Monitor,
  Globe,
} from "lucide-react";

interface DevInfo {
  browser: string;
  os: string;
  screenSize: string;
  battery: string;
  time: string;
  network: string;
  cpuCores: number;
  ip: string;
}

export default function EnhancedDevExposed() {
  const [command, setCommand] = useState<string>("");
  const [exposed, setExposed] = useState<boolean>(false);
  const [devInfo, setDevInfo] = useState<DevInfo>({
    browser: "",
    os: "",
    screenSize: "",
    battery: "",
    time: "",
    network: "",
    cpuCores: 0,
    ip: "Fetching IP...",
  });
  const [exposeMessage, setExposeMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const updateDevInfo = async () => {
      const ua = navigator.userAgent;
      const browserRegex =
        /(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i;
      const osRegex = /(mac|win|linux)/i;
      const [, browser] = ua.match(browserRegex) || [];
      const [, os] = ua.match(osRegex) || [];

      setDevInfo((prev) => ({
        ...prev,
        browser: browser || "Unknown",
        os: os ? os.charAt(0).toUpperCase() + os.slice(1) : "Unknown",
        screenSize: `${window.screen.width}x${window.screen.height}`,
        time: new Date().toLocaleTimeString(),
        cpuCores: navigator.hardwareConcurrency || 0,
        network: navigator.onLine ? "Online" : "Offline",
      }));

      if ("getBattery" in navigator) {
        const bat = await (navigator as any).getBattery();
        setDevInfo((prev) => ({
          ...prev,
          battery: `${Math.round(bat.level * 100)}%`,
        }));
      }

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
    };

    updateDevInfo();
    const interval = setInterval(updateDevInfo, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateExposeMessage = () => {
    const messages = [
      "Yo, you're rockin' a " +
        devInfo.browser +
        " on " +
        devInfo.os +
        "? Straight up vintage vibes! 😎",
      "Look at you, strutting around with that " +
        devInfo.browser +
        " on " +
        devInfo.os +
        ". Who do you think you are, huh? 😏",
      "You call that a screen size? I’ve seen bigger on my grandma’s TV! 😂",
      "Screen size: " +
        devInfo.screenSize +
        ". Who you trying to impress with that tiny screen, huh? 😂",
      "With " +
        devInfo.cpuCores +
        " CPU cores, you could probably power a toaster! 🔥",
      "With " +
        devInfo.cpuCores +
        " CPU cores, you're still out here laggin'? No excuses! 🙈",
      "Your Wi-Fi is so slow, it’s practically a dial-up connection! 📞",
      "Caught you wasting time at " +
        devInfo.time +
        ". Shouldn’t you be coding? ⏰",
      "Battery at " +
        (devInfo.battery || "plug it in, buddy!") +
        " — might as well start planning your funeral! ⚰️",
      "Caught you at " +
        devInfo.time +
        " — should be grinding, but here you are! 🤷‍♂️",
      "Your IP is " +
        devInfo.ip +
        ". Sooo sneaky! Not like we can’t find you! 😜",
      "Running that " +
        devInfo.browser +
        " on " +
        devInfo.os +
        " is like wearing socks with sandals—questionable choices! 😅",
      "With " +
        devInfo.cpuCores +
        " CPU cores, I bet your computer's nickname is 'Slowpoke'! 🐢",
      "Your screen size of " +
        devInfo.screenSize +
        " is basically a phone. Is this a workstation or a snack? 📱",
      "Your Wi-Fi's looking " +
        (devInfo.network === "Online"
          ? "barely stable"
          : "like it's taking a nap") +
        " — try harder! 😤",
      "Battery at " +
        (devInfo.battery || "who cares, plug it in!") +
        " — time to stop playing! 🔌",
      "IP: " + devInfo.ip + ". We see you, trying to hide behind that IP! 👀",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleCommand = async (cmd: string) => {
    if (["home", "about", "projects", "chat"].includes(cmd)) {
      router.push(cmd === "home" ? "/" : `/${cmd}`);
    } else if (cmd === "expose") {
      setExposed(true);
      setExposeMessage(generateExposeMessage());
      await sendExposeDetails();
      await sendToDiscord();
    } else {
      setExposeMessage(generateExposeMessage());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(command.toLowerCase().trim());
    setCommand("");
  };

  const sendExposeDetails = async () => {
    const details = `
            Browser: ${devInfo.browser}
            OS: ${devInfo.os}
            Screen Size: ${devInfo.screenSize}
            Time: ${devInfo.time}
            CPU Cores: ${devInfo.cpuCores}
            Network: ${devInfo.network}
            Battery: ${devInfo.battery || "N/A"}
            IP: ${devInfo.ip}
        `;

    await fetch("/api/expose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ details }),
    });
  };

  const sendToDiscord = async () => {
    const discordWebhookUrl = "YOUR_DISCORD_WEBHOOK_URL"; // Replace with your actual Discord webhook URL
    const details = {
      content: `
                **Exposed User Info**
                - Browser: ${devInfo.browser}
                - OS: ${devInfo.os}
                - Screen Size: ${devInfo.screenSize}
                - Time: ${devInfo.time}
                - CPU Cores: ${devInfo.cpuCores}
                - Network: ${devInfo.network}
                - Battery: ${devInfo.battery || "N/A"}
                - IP: ${devInfo.ip}
            `,
    };

    await fetch(discordWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Head>
        <title>DevExposed 2.0 - Shrvan Benke</title>
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
            <h1 className="text-4xl font-bold text-[#34495E]">
              DevExposed 2.0
            </h1>
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
                    Yo, you think you&apos;re slick?
                  </p>
                  <p className="text-xl mb-4">
                    Bet you won&apos;t drop &apos;expose&apos; though... No cap.
                  </p>
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
                      <Monitor className="mr-2" /> {devInfo.browser} on{" "}
                      {devInfo.os} 🖥️
                    </motion.div>
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Wifi className="mr-2" /> Network: {devInfo.network}
                    </motion.div>
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Battery className="mr-2" /> Battery: {devInfo.battery}
                    </motion.div>
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Clock className="mr-2" /> Time: {devInfo.time}
                    </motion.div>
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Cpu className="mr-2" /> CPU Cores: {devInfo.cpuCores}
                    </motion.div>
                    <motion.div
                      variants={infoVariants}
                      className="flex items-center"
                    >
                      <Globe className="mr-2" /> Your IP: {devInfo.ip}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-[#ECE0C8] text-[#2C3E50] p-4 rounded-lg shadow-md"
          >
            <span className="mr-2 text-[#34495E]">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-grow bg-transparent outline-none text-[#2C3E50]"
              placeholder="Type 'home', 'projects', or 'chat' to vibe in the safe zone, fam! "
            />
          </form>
        </motion.div>
      </div>
    </>
  );
}
