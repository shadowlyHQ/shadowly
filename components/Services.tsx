'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Professional SVG Icons
const icons = {
  strategy: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  revenue: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  growth: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  audience: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const services = [
    {
      title: 'Platform Monetization Strategy',
      description: 'We help creators develop comprehensive monetization strategies tailored to their unique platform and audience. From identifying revenue streams to optimizing conversion funnels.',
      icon: icons.strategy,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Revenue Stream Development',
      description: 'Building and diversifying revenue streams including sponsorships, affiliate marketing, digital products, memberships, and more to maximize your earning potential.',
      icon: icons.revenue,
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Creator Business Growth',
      description: 'Strategic guidance on scaling your creator business, building sustainable income, and creating systems that allow you to focus on what you do best: creating.',
      icon: icons.growth,
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'Audience Engagement & Conversion',
      description: 'Optimizing your content and platform to better engage your audience and convert followers into paying customers and loyal community members.',
      icon: icons.audience,
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-purple-darker relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-purple-light/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-lighter/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-purple-light/10 text-purple-lighter text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            Services
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            From initial strategy to ongoing optimization, we're with you every step of the way transforming your creator platform into a profitable business.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
              }}
              className="group relative p-8 rounded-2xl border border-purple-light/20 bg-gradient-to-br from-purple-dark/80 to-purple-darker/80 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-10`} />
              </div>

              {/* Icon container */}
              <motion.div 
                className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} p-3 mb-6 text-white`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {service.icon}
              </motion.div>

              <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-purple-lighter transition-colors">
                {service.title}
              </h3>
              <p className="relative text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.a
            href="#book-call"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-light to-purple-lighter text-white px-8 py-4 rounded-full text-lg font-medium"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
