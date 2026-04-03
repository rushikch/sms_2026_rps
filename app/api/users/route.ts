import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(req: NextRequest) {
  try {
    const { action, email, password, userId, role } = await req.json()

    // Verify the request comes from a SuperAdmin
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { error: 'Missing authentication token' },
        { status: 401 }
      )
    }

    // Verify user is SuperAdmin
    const { data: { user: authUser }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !authUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user has superadmin role
    const { data: userRoleData } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', authUser.id)
      .single()

    if (userRoleData?.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'Only SuperAdmin can manage users' },
        { status: 403 }
      )
    }

    if (action === 'list') {
      // Get all auth users
      const { data: { users: authUsers }, error: listError } = await supabaseAdmin.auth.admin.listUsers()

      if (listError) {
        return NextResponse.json(
          { error: 'Failed to fetch users: ' + listError.message },
          { status: 400 }
        )
      }

      // Get all user roles
      const { data: rolesData, error: rolesError } = await supabaseAdmin
        .from('user_roles')
        .select('*')

      if (rolesError) {
        return NextResponse.json(
          { error: 'Failed to fetch user roles: ' + rolesError.message },
          { status: 400 }
        )
      }

      // Combine users with their roles
      const combinedUsers = authUsers.map(authUserItem => {
        const userRole = rolesData?.find(r => r.user_id === authUserItem.id)
        return {
          id: authUserItem.id,
          email: authUserItem.email || '',
          role: userRole?.role || 'user',
          created_at: authUserItem.created_at || ''
        }
      })

      return NextResponse.json({
        success: true,
        users: combinedUsers
      })
    } else if (action === 'create') {
      // Create new user
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })

      if (createError) {
        return NextResponse.json(
          { error: 'Failed to create user: ' + createError.message },
          { status: 400 }
        )
      }

      if (!newUser.user) {
        return NextResponse.json(
          { error: 'Failed to create user' },
          { status: 400 }
        )
      }

      // Assign role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: newUser.user.id,
          role: role || 'user'
        })

      if (roleError) {
        return NextResponse.json(
          { error: 'Failed to assign role: ' + roleError.message },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.user.id,
          email: newUser.user.email,
          role: role || 'user',
          created_at: newUser.user.created_at
        }
      })
    } else if (action === 'delete') {
      // Delete user
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)

      if (deleteError) {
        return NextResponse.json(
          { error: 'Failed to delete user: ' + deleteError.message },
          { status: 400 }
        )
      }

      // Delete user role
      await supabaseAdmin
        .from('user_roles')
        .delete()
        .eq('user_id', userId)

      return NextResponse.json({
        success: true,
        message: 'User deleted successfully'
      })
    } else if (action === 'updateRole') {
      // Update user role
      const { error: updateError } = await supabaseAdmin
        .from('user_roles')
        .update({ role })
        .eq('user_id', userId)

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update role: ' + updateError.message },
          { status: 400 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Role updated successfully'
      })
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('User management error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}