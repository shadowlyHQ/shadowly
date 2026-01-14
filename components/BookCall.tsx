'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function BookCall() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Your Calendly link - update this in .env.local
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/your-username/30min'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Open Calendly after successful form submission
      setTimeout(() => {
        window.open(calendlyUrl, '_blank')
      }, 1500)

    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrorMessage('')
  }

  const formFields = [
    { 
      id: 'name', 
      label: 'Name', 
      type: 'text',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      id: 'email', 
      label: 'Email', 
      type: 'email',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ]

  const benefits = [
    { icon: '✓', text: 'Free 30-min consultation' },
    { icon: '✓', text: 'No commitment required' },
    { icon: '✓', text: 'Personalized strategy session' },
  ]

  return (
    <section id="book-call" className="py-24 px-4 sm:px-6 lg:px-8 bg-purple-darker relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-light/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-20 -right-20 w-96 h-96 bg-purple-lighter/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <div>
            <motion.span 
              className="inline-block px-4 py-2 rounded-full bg-purple-light/10 text-purple-lighter text-sm font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              Book a Call
            </motion.span>

            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              Ready to monetize your platform?
            </motion.h2>

            <motion.p 
              className="text-xl text-white/70 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's create something extraordinary together. Book a free consultation and let's discuss how I can help grow your creator business.
            </motion.p>

            {/* Benefits */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-sm">
                    {benefit.icon}
                  </span>
                  <span className="text-white/80">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <motion.div 
            className="bg-gradient-to-br from-purple-dark/80 to-purple-darker/80 border border-purple-light/20 rounded-3xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/70 mb-4">Opening Calendly to book your call...</p>
                  <p className="text-white/50 text-sm mb-6">Check your email for confirmation</p>
                  <button
                    onClick={resetForm}
                    className="text-purple-lighter hover:text-white transition-colors underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {formFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <label htmlFor={field.id} className="block text-sm font-medium text-white/90 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-lighter/50">
                          {field.icon}
                        </div>
                        <motion.input
                          type={field.type}
                          id={field.id}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3 bg-purple-darker/80 border border-purple-light/30 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-light focus:border-purple-light outline-none transition-all duration-300 disabled:opacity-50"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          animate={{
                            borderColor: focusedField === field.id ? "rgba(139, 92, 246, 0.8)" : "rgba(107, 70, 193, 0.3)",
                            boxShadow: focusedField === field.id ? "0 0 30px rgba(139, 92, 246, 0.2)" : "none"
                          }}
                          disabled={status === 'loading'}
                          required
                        />
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                      Tell me about your platform
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 text-purple-lighter/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <motion.textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className="w-full pl-12 pr-4 py-3 bg-purple-darker/80 border border-purple-light/30 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-light focus:border-purple-light outline-none resize-none transition-all duration-300 disabled:opacity-50"
                        placeholder="What's your platform about? What are your goals?"
                        animate={{
                          borderColor: focusedField === 'message' ? "rgba(139, 92, 246, 0.8)" : "rgba(107, 70, 193, 0.3)",
                          boxShadow: focusedField === 'message' ? "0 0 30px rgba(139, 92, 246, 0.2)" : "none"
                        }}
                        disabled={status === 'loading'}
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3"
                      >
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-300 text-sm">{errorMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-light to-purple-lighter text-white px-8 py-4 rounded-xl text-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileHover={status !== 'loading' ? { scale: 1.02, boxShadow: "0 20px 40px -15px rgba(139, 92, 246, 0.5)" } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Book a call
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-white/50 text-sm">
                    You'll receive a confirmation email and be redirected to schedule your call
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
