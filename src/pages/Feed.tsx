import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, ArrowUp, MessageSquare, AlertTriangle, Plus, Filter } from 'lucide-react'
import { mockPosts } from '../data/mock'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

const Feed = () => {
  const [filter, setFilter] = useState('All')
  
  const filters = ['All', 'Latest', 'Trending', 'Garbage Dumping', 'Water Wastage', 'Public Damage']

  const filteredPosts = filter === 'All' || filter === 'Latest' || filter === 'Trending' 
    ? mockPosts 
    : mockPosts.filter(p => p.category === filter)

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      
      {/* Header & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">Community Feed</h1>
          <p className="text-gray-400 text-lg font-light">See what's happening around you, in real-time.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-2 mr-2 text-gray-500">
            <Filter className="w-5 h-5" />
          </div>
          {filters.map((f) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-md",
                filter === f 
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                  : "bg-white/[0.03] text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              )}
            >
              {f}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Masonry-like Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -8, rotate: Math.random() > 0.5 ? 1 : -1 }}
            className="glass-card-premium rounded-[2rem] overflow-hidden group flex flex-col cursor-pointer relative"
          >
            {/* Dynamic Hover Shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

            {/* Image Preview */}
            <div className="relative h-56 overflow-hidden bg-[#050505] rounded-t-[2rem]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10"></div>
              <div className="absolute inset-0 bg-emerald-500/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <img 
                src={post.image} 
                alt="Reported issue" 
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 z-20">
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-xl border shadow-lg",
                  post.status === 'resolved' ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/50" :
                  post.status === 'in-progress' ? "bg-blue-500/20 text-blue-400 border-blue-500/50" :
                  "bg-orange-500/20 text-orange-400 border-orange-500/50"
                )}>
                  {post.status}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-grow flex flex-col relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

              <div className="flex items-center space-x-3 mb-5 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/10 shadow-inner">
                  <span className="text-sm font-black text-gray-300 tracking-tighter">{post.anonymousId.split('-')[1]}</span>
                </div>
                <span className="text-sm font-medium text-gray-400 tracking-wide">{post.anonymousId}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">{post.category}</h3>
              <p className="text-gray-400 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed font-light relative z-10">
                {post.description}
              </p>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex items-center text-sm text-gray-400 font-medium">
                  <MapPin className="w-4 h-4 mr-3 text-emerald-500" />
                  {post.location}
                </div>
                <div className="flex items-center text-sm text-gray-400 font-medium">
                  <Clock className="w-4 h-4 mr-3 text-emerald-500" />
                  {post.timestamp}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto relative z-10">
                <div className="flex space-x-6">
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-colors group/btn relative"
                  >
                    <div className="relative p-2 rounded-full group-hover/btn:bg-emerald-500/20 transition-colors">
                      <div className="absolute inset-0 bg-emerald-500/40 rounded-full blur animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      <ArrowUp className="w-5 h-5 relative z-10" />
                    </div>
                    <span className="text-sm font-bold">{post.upvotes}</span>
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group/btn"
                  >
                    <div className="p-2 rounded-full group-hover/btn:bg-white/10 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold">{post.comments}</span>
                  </motion.button>
                </div>
                <motion.button 
                  whileHover={{ rotate: 15 }}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors" 
                  title="Report Abuse"
                >
                  <AlertTriangle className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Action Button */}
      <motion.div 
        className="fixed bottom-10 right-10 z-50"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/upload">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-[pulse-glow_3s_ease-in-out_infinite]"></div>
            <button className="relative w-20 h-20 bg-[#09090b] border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Plus className="w-10 h-10 text-emerald-400 relative z-10" />
            </button>
          </div>
        </Link>
      </motion.div>

    </div>
  )
}

export default Feed
