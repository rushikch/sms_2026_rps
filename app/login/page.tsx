'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="p-4 border rounded">
        <h1 className="text-xl mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign In</button>
      </form>
    </div>
  )
}