"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { FloatingObject } from "@/components/floating-object"

const titles = ["AI Developer", "IoT Enthusiast", "Embedded Systems Engineer", "Web Developer"]

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Nishan Dananjaya</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary mb-8">
          <span className="sr-only">Specializing in</span>
          <motion.span
            key={titleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {titles[titleIndex]}
          </motion.span>
        </h2>
        <Button size="lg" className="mt-8">
          View Projects <ArrowRight className="ml-2" />
        </Button>
      </motion.div>
      <FloatingObject />
      <AnimatedBackground />
    </section>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-primary/20 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}

