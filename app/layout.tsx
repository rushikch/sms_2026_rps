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

  // Check user role (session is ensured by middleware for non-login pages)
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
      <body className={`${inter.className} min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 animate-fade-in">
            {children}
          </main>
          <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 py-4 mt-auto">
            <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
              © 2026 Rainbow Public School. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
