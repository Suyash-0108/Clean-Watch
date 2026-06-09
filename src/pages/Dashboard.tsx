import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { LayoutDashboard, Users, FileText, Settings, BarChart3, CheckCircle2, XCircle, Clock, Activity } from 'lucide-react'
import { mockPosts } from '../data/mock'

// Animated Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}</span>
}

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20 flex bg-[#050505]">
      
      {/* Sidebar Mock */}
      <aside className="w-72 border-r border-white/5 hidden lg:flex flex-col sticky top-20 h-[calc(100vh-5rem)] bg-white/[0.02] backdrop-blur-3xl z-20">
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Analytics</div>
          <nav className="space-y-3 mb-10">
            <a href="#" className="flex items-center space-x-4 text-emerald-400 bg-emerald-500/10 px-5 py-3 rounded-2xl transition-colors border border-emerald-500/20 shadow-inner">
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-bold tracking-wide">Overview</span>
            </a>
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white hover:bg-white/5 px-5 py-3 rounded-2xl transition-all">
              <BarChart3 className="w-5 h-5" />
              <span className="font-medium tracking-wide">Metrics</span>
            </a>
          </nav>
          
          <div className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6">Management</div>
          <nav className="space-y-3">
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white hover:bg-white/5 px-5 py-3 rounded-2xl transition-all">
              <FileText className="w-5 h-5" />
              <span className="font-medium tracking-wide">Moderation Queue</span>
            </a>
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white hover:bg-white/5 px-5 py-3 rounded-2xl transition-all">
              <Users className="w-5 h-5" />
              <span className="font-medium tracking-wide">Users</span>
            </a>
            <a href="#" className="flex items-center space-x-4 text-gray-400 hover:text-white hover:bg-white/5 px-5 py-3 rounded-2xl transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium tracking-wide">Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto z-10 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6"
          >
            <div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Admin Overview</h1>
              <p className="text-gray-400 text-lg font-light">Welcome back, Moderator. Here is what's happening.</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 bg-white/[0.03] border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-md shadow-lg cursor-default"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
              <span className="text-sm font-bold text-gray-300 tracking-wide">System Normal</span>
            </motion.div>
          </motion.div>

          {/* Activity Ticker (Marquee) */}
          <div className="w-full bg-white/[0.02] border-y border-white/5 py-3 mb-12 overflow-hidden flex items-center relative backdrop-blur-md">
            <div className="absolute left-0 w-20 h-full bg-gradient-to-r from-[#050505] to-transparent z-10"></div>
            <div className="absolute right-0 w-20 h-full bg-gradient-to-l from-[#050505] to-transparent z-10"></div>
            <div className="flex items-center text-sm font-medium text-gray-400 shrink-0 px-4 border-r border-white/10 z-20 bg-[#050505]/50">
              <Activity className="w-4 h-4 mr-2 text-emerald-400" /> Live Feed
            </div>
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex whitespace-nowrap pl-4"
            >
              <span className="mx-4 text-emerald-400">New Report: Water Leak (Sector 14)</span> • 
              <span className="mx-4 text-gray-500">Report Resolved: Garbage (Central Park)</span> • 
              <span className="mx-4 text-orange-400">Trending: Pothole Issue (Main St)</span> •
              <span className="mx-4 text-emerald-400">User Registered: Resident-A12</span> •
              <span className="mx-4 text-emerald-400">New Report: Water Leak (Sector 14)</span>
            </motion.div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { label: "Total Reports", value: 1248, trend: "+12%" },
              { label: "Resolved Issues", value: 892, trend: "+8%" },
              { label: "Pending Review", value: 42, trend: "-5%" },
              { label: "Avg Resolution", value: 2.4, suffix: "d", trend: "-1 day" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card-premium p-8 rounded-3xl relative overflow-hidden group cursor-default"
              >
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                <div className="text-gray-400 text-sm font-bold tracking-wider uppercase mb-4">{stat.label}</div>
                <div className="text-5xl font-black text-white mb-4 tracking-tighter">
                  <AnimatedCounter value={stat.value as number} />
                  {stat.suffix && <span className="text-3xl text-gray-500">{stat.suffix}</span>}
                </div>
                <div className="inline-flex items-center space-x-1 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-md">
                  <span>{stat.trend}</span>
                  <span className="text-gray-500 font-medium">from last month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Moderation Queue */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card-premium rounded-[2rem] overflow-hidden mb-10"
          >
            <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-2xl font-black text-white tracking-tight">Recent Reports Queue</h2>
              <button className="text-sm text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider hover:underline transition-all">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-gray-400 text-xs uppercase tracking-widest font-black">
                    <th className="p-6">Report ID / Location</th>
                    <th className="p-6">Category</th>
                    <th className="p-6">Status</th>
                    <th className="p-6">Time</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockPosts.map((post) => (
                    <motion.tr 
                      key={post.id} 
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      className="transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md">
                            <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white mb-1">#{post.id} • {post.anonymousId}</div>
                            <div className="text-xs font-medium text-gray-500">{post.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-sm font-medium text-gray-300">{post.category}</span>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm ${
                          post.status === 'resolved' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          post.status === 'in-progress' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                          "bg-orange-500/10 text-orange-400 border-orange-500/20"
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="p-6 text-sm font-medium text-gray-500 flex items-center h-full pt-10">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.timestamp}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end space-x-3 opacity-70 group-hover:opacity-100 transition-opacity">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all shadow-sm" title="Approve">
                            <CheckCircle2 className="w-5 h-5" />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all shadow-sm" title="Reject">
                            <XCircle className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>

    </div>
  )
}

export default Dashboard
