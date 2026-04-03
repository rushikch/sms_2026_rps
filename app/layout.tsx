import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rainbow Public School Management System',
  description: 'School Management System',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single()

    if (!roleData || !['admin', 'superadmin'].includes(roleData.role)) {
      redirect('/unauthorized')
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-container">
          <div className="rainbow-bar" />
          <Header />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
