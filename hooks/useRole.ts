'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useRole() {
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const getRole = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        const { data } = await supabase.from('user_roles').select('role').eq('user_id', session.user.id).single()
        setRole(data?.role || null)
      }
      setLoading(false)
    }
    getRole()
  }, [])

  return { role, loading }
}