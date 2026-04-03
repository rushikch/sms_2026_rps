'use client'

import { createClient } from '@/utils/supabase/client'

export default function Header() {
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <header className="p-4 bg-gray-100 flex justify-between items-center">
      <h1 className="text-xl font-bold">Rainbow Public School Management System</h1>
      <button onClick={handleSignOut} className="bg-red-500 text-white p-2 rounded">Sign Out</button>
    </header>
  )
}