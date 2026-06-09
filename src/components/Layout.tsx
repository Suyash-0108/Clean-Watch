import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MouseGlow from './MouseGlow'
import { motion } from 'framer-motion'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505] ambient-gradient">
      <MouseGlow />
      
      {/* Animated background orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0, -50, 0],
          y: [0, 50, -50, 50, 0],
          scale: [1, 1.2, 0.8, 1.1, 1] 
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0, 50, 0],
          y: [0, -50, 50, -50, 0],
          scale: [1, 1.1, 0.9, 1.2, 1] 
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen" 
      />
      
      <Navbar />
      <main className="flex-grow z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
