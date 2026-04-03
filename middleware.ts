import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from './utils/supabase/server'

export async function middleware(request: NextRequest) {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
}