import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, ShieldAlert, MapPin, Tag, ToggleLeft, ToggleRight, CheckCircle } from 'lucide-react'
import { cn } from '../lib/utils'

const formVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

const Upload = () => {
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateUpload(e.target.files[0])
    }
  }

  const simulateUpload = (selectedFile: File) => {
    setUploading(true)
    setProgress(0)
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setFile(selectedFile)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">Report an Issue</h1>
        <p className="text-gray-400 text-lg font-light mb-12">Help keep the community clean. Your report goes directly to the local authorities.</p>

        {/* Warning Card */}
        <motion.div 
          whileHover={{ x: 5 }}
          className="glass-card-premium rounded-2xl p-5 mb-10 border-l-4 border-l-orange-500 flex items-start space-x-4 shadow-lg"
        >
          <div className="p-2 bg-orange-500/10 rounded-xl shrink-0 mt-0.5">
            <ShieldAlert className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h4 className="text-white font-bold mb-1 tracking-wide">Community Guidelines</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-light">Avoid uploading harmful, abusive, or fake content. False reporting may lead to IP bans and account suspension.</p>
          </div>
        </motion.div>

        <motion.form 
          variants={formVariants}
          initial="hidden"
          animate="show"
          className="space-y-10" 
          onSubmit={(e) => e.preventDefault()}
        >
          
          {/* Media Upload */}
          <motion.div variants={inputVariants} className="space-y-4">
            <label className="text-sm font-bold text-gray-300 tracking-wider uppercase block">Upload Media (Photo/Video)</label>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "w-full h-72 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden group cursor-pointer",
                isDragging ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.3)] scale-[1.02]" : "border-white/20 bg-white/[0.02] hover:border-emerald-500/50 hover:bg-white/[0.05]"
              )}
            >
              <AnimatePresence mode="wait">
                {uploading ? (
                  <motion.div 
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center z-10 w-full px-12"
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin"></div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        className="h-full bg-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-emerald-400 font-bold mt-4 tracking-wide">{progress}% Uploaded</p>
                  </motion.div>
                ) : file ? (
                  <motion.div 
                    key="file"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center z-10"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto mb-5 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <p className="text-white font-bold tracking-wide">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-2 uppercase tracking-wider font-semibold">Click or drag to replace</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center z-10 pointer-events-none"
                  >
                    <div className="w-20 h-20 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-5 text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                      <UploadCloud className="w-10 h-10" />
                    </div>
                    <p className="text-white font-bold mb-2 tracking-wide text-lg">Drag and drop here</p>
                    <p className="text-sm text-gray-500 font-light">or click to browse from your device</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Animated Glow on Drag */}
              {isDragging && (
                <motion.div 
                  layoutId="glow"
                  className="absolute inset-0 bg-emerald-500/10 blur-2xl"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" onChange={handleFileChange} />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Category */}
            <motion.div variants={inputVariants} className="space-y-4">
              <label className="text-sm font-bold text-gray-300 tracking-wider uppercase block">Category</label>
              <div className="relative group">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                <select className="w-full bg-[#09090b] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all appearance-none shadow-inner hover:bg-white/[0.02]">
                  <option value="" disabled selected>Select an issue category</option>
                  <option value="garbage">Garbage Dumping</option>
                  <option value="water">Water Wastage</option>
                  <option value="plastic">Plastic Waste</option>
                  <option value="damage">Public Damage</option>
                </select>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div variants={inputVariants} className="space-y-4">
              <label className="text-sm font-bold text-gray-300 tracking-wider uppercase block">Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="E.g., Sector 14, Main Market" 
                  className="w-full bg-[#09090b] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner hover:bg-white/[0.02]"
                />
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div variants={inputVariants} className="space-y-4">
            <label className="text-sm font-bold text-gray-300 tracking-wider uppercase block">Description</label>
            <textarea 
              rows={4}
              placeholder="Provide more details about the issue..."
              className="w-full bg-[#09090b] border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none shadow-inner hover:bg-white/[0.02]"
            ></textarea>
          </motion.div>

          {/* Anonymity Toggle */}
          <motion.div variants={inputVariants} className="glass-card-premium p-8 rounded-3xl flex items-center justify-between">
            <div className="flex items-start space-x-5">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 mt-1 border border-emerald-500/20 shadow-inner">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 tracking-wide text-lg">Post Anonymously</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">Your identity will be completely hidden via a randomized cryptographic Resident ID.</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button" 
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="text-emerald-400 focus:outline-none"
            >
              {isAnonymous ? <ToggleRight className="w-12 h-12 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" /> : <ToggleLeft className="w-12 h-12 text-gray-600" />}
            </motion.button>
          </motion.div>

          {/* Submit */}
          <motion.div variants={inputVariants} className="pt-8">
            <div className="relative group inline-block w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500 animate-[pulse-glow_2s_ease-in-out_infinite]"></div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full bg-[#09090b] text-white py-5 rounded-2xl font-black text-xl hover:bg-white/[0.02] transition-colors border border-white/10 uppercase tracking-widest"
              >
                Submit Report
              </motion.button>
            </div>
          </motion.div>

        </motion.form>
      </motion.div>
    </div>
  )
}

export default Upload
