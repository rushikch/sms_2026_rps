'use client'

import { createClient } from '@/utils/supabase/client'
import { LogOut, School } from 'lucide-react'

export default function Header() {
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <header className="header-gradient shadow-colored sticky top-0 z-50 animate-slide-in">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
              <School className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Rainbow Public School
              </h1>
              <p className="text-blue-100 text-xs md:text-sm">
                Management System
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl transition-all duration-300 hover:shadow-xl border border-white/30 group"
          >
            <span className="font-medium text-sm md:text-base">Sign Out</span>
            <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  )
}
