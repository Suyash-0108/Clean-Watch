import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, MapPin, CheckCircle2, ThumbsUp } from 'lucide-react'

const liveEvents = [
  { id: 1, text: "New garbage report in Sector 14", icon: Bell, color: "text-cyan-400", bg: "bg-cyan-500/20", border: "border-cyan-500/30" },
  { id: 2, text: "Issue resolved near Main Market", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
  { id: 3, text: "12 residents upvoted a report", icon: ThumbsUp, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  { id: 4, text: "Water leakage reported 2 mins ago", icon: MapPin, color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30" },
  { id: 5, text: "Streetlight issue verified in Central Park", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30" },
];

export default function LiveActivity() {
  const [activeEvent, setActiveEvent] = useState<typeof liveEvents[0] | null>(null)
  const [position, setPosition] = useState<React.CSSProperties>({ top: '20%', right: '5%' })

  useEffect(() => {
    const showRandomEvent = () => {
      const event = liveEvents[Math.floor(Math.random() * liveEvents.length)]
      
      // Since this is now contained in the 45% right-side box, we can just use 100% clamping
      // The card width is 256px (w-64), and height is roughly 80px.
      // calc(100% - 256px) ensures it never pushes outside the right edge.
      const newPosition = {
        top: `clamp(0%, ${Math.floor(Math.random() * 100)}%, calc(100% - 120px))`,
        left: `clamp(0%, ${Math.floor(Math.random() * 100)}%, calc(100% - 256px))`
      };
        
      setPosition(newPosition)
      setActiveEvent(event)

      // Hide after 4 seconds
      setTimeout(() => {
        setActiveEvent(null)
      }, 4000)
    }

    // Show initial event after 3 seconds
    const initialTimeout = setTimeout(showRandomEvent, 3000)
    
    // Then show events every 10-15 seconds
    const interval = setInterval(() => {
      showRandomEvent()
    }, Math.random() * 5000 + 10000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <AnimatePresence>
        {activeEvent && (
          <motion.div
            key={activeEvent.id + JSON.stringify(position)}
            initial={{ opacity: 0, scale: 0.9, y: 15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, y: -15, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="absolute glass-card-premium p-4 rounded-2xl w-64 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            style={position}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full ${activeEvent.bg} flex items-center justify-center border ${activeEvent.border} shrink-0`}>
                <activeEvent.icon className={`w-4 h-4 ${activeEvent.color}`} />
              </div>
              <div className="pt-0.5">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">Live Activity</p>
                <p className="text-sm font-semibold text-white leading-snug">{activeEvent.text}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
