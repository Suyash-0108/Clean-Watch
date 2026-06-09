import { Link } from 'react-router-dom'
import { Leaf, Twitter, Github, Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#09090b]/50 backdrop-blur-md z-10 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="w-6 h-6 text-emerald-400" />
              <span className="text-xl font-bold tracking-tight text-white">Clean<span className="text-emerald-400">Watch</span></span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              An anonymous community-driven platform helping residents build cleaner and safer neighborhoods.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/feed" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Community Feed</Link></li>
              <li><Link to="/upload" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">Report Issue</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Data Anonymity</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CleanWatch. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0 text-sm text-gray-500">
            <span>Built for a cleaner future</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
