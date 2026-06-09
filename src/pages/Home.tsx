import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Activity, Users, MapPin, Bell } from 'lucide-react'
import { mockStats } from '../data/mock'
import LiveActivity from '../components/LiveActivity'

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const yCards = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-[0.03] mix-blend-overlay"></div>

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between mt-10">

          {/* Left 55%: Hero Text */}
          <motion.div
            style={{ y: yHeroText, opacity: opacityHero }}
            className="w-full lg:w-[55%] text-center lg:text-left z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center space-x-2 bg-white/[0.05] backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full mb-8 lg:mb-10 shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[pulse-glow_2s_ease-in-out_infinite]"></span>
                <span className="text-sm font-medium text-emerald-50 tracking-wide">Live in 14 neighborhoods</span>
              </motion.span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Report. Improve. <br />
                <span className="text-gradient text-shadow-glow">Keep Your Colony Clean.</span>
              </h1>

              <p className="mt-4 lg:mt-6 text-lg md:text-xl lg:text-2xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 lg:mb-12 font-light leading-relaxed tracking-wide">
                An anonymous community-driven platform helping residents build cleaner and safer neighborhoods through transparent reporting.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 lg:gap-6">
                <Link to="/upload" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group w-full sm:w-auto px-8 py-4 bg-emerald-500 text-[#09090b] rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-all shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)]"
                  >
                    <span>Report Issue</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  </motion.button>
                </Link>

                <Link to="/feed" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-zinc-900/90 text-white rounded-2xl font-bold text-lg backdrop-blur-xl border border-white/20 transition-all shadow-lg"
                  >
                    Explore Feed
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 45%: Floating Cards Zone */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[700px] relative mt-16 lg:mt-0 z-10 pointer-events-none">

            {/* Dynamic Feed Cards (Restricted to this box) */}
            <LiveActivity />

            {/* Static Floating Activity Cards */}
            <motion.div
              style={{ y: yCards }}
              className="hidden lg:block absolute top-[15%] right-[5%] glass-card-premium p-5 rounded-2xl w-64 xl:w-72 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-start space-x-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shrink-0">
                  <Bell className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">Just now</p>
                  <p className="text-sm font-semibold text-white leading-snug">New report in Sector 14</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">Water pipe leaking near Main Market.</p>
            </motion.div>

            <motion.div
              style={{ y: yCards }}
              className="hidden lg:block absolute bottom-[20%] left-[10%] glass-card-premium p-4 rounded-2xl w-56 xl:w-64 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Riverfront</p>
                  <p className="text-sm font-semibold text-emerald-400">Issue Resolved</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-24 border-y border-white/5 bg-[#09090b]/50 backdrop-blur-2xl relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Total Reports", value: mockStats.totalReports, isNumeric: true },
              { label: "Resolved Issues", value: mockStats.resolvedIssues, isNumeric: true },
              { label: "Active Users", value: mockStats.activeUsers, isNumeric: true },
              { label: "Community Impact", value: mockStats.impactScore, isNumeric: false }
            ].map((stat, i) => {
              // Creating a live updating feel for numeric stats
              const [liveValue, setLiveValue] = useState(stat.value as number);

              useEffect(() => {
                if (!stat.isNumeric) return;
                const interval = setInterval(() => {
                  if (Math.random() > 0.7) {
                    setLiveValue(prev => prev + Math.floor(Math.random() * 3));
                  }
                }, Math.random() * 5000 + 3000);
                return () => clearInterval(interval);
              }, [stat.isNumeric]);

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1, type: "spring" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="text-center group cursor-default"
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-3 tracking-tighter"
                    whileHover={{ scale: 1.1, textShadow: "0px 0px 20px rgba(255,255,255,0.5)" }}
                  >
                    {stat.isNumeric ? liveValue : stat.value}
                  </motion.div>
                  <div className="text-xs md:text-sm text-emerald-400/80 font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2">
                    {stat.isNumeric && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>}
                    <span>{stat.label}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Designed for <span className="text-gradient">Impact</span></h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">
              Everything you need to make your community better, built with privacy and speed in mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Anonymous",
                desc: "Your identity is completely shielded via cryptographically generated tags. Report without fear."
              },
              {
                icon: Activity,
                title: "Real-time Tracking",
                desc: "Watch as issues go from reported to resolved with live status updates and push notifications."
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Upvote pressing issues to organically bring them to the immediate attention of authorities."
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className="glass-card-premium p-10 rounded-3xl group flex flex-col items-start"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-500"></div>

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-white/[0.05] border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner"
                >
                  <feature.icon className="w-8 h-8 text-emerald-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
