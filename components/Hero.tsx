'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import InteractiveBackground from './InteractiveBackground'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-dark via-purple-darker to-purple-darker px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
      {/* Interactive particle background */}
      <InteractiveBackground />

      {/* Large watermark text in background with parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[15rem] sm:text-[20rem] lg:text-[25rem] font-bold text-purple-light/10 select-none"
        >
          shadowly
        </motion.h2>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Main heading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block"
              >
                Monetizing Platforms
              </motion.span>
              <br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-purple-lighter/80 inline-block"
              >
                That Inspire
              </motion.span>
            </h1>
          </motion.div>

          {/* Right side - Description and CTA */}
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.p 
              className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              I help micro-creators and creators monetize their platforms and turn their passion into profit.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.a
                href="#book-call"
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium text-center"
                whileHover={{ scale: 1.05, backgroundColor: "#1a1a1a" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Book a call
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="#services"
                  className="block text-white px-8 py-4 rounded-full text-lg font-medium hover:text-purple-lighter transition-colors text-center"
                >
                  View services
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
