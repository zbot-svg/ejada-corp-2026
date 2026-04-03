import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Find all locked users and reset them
    const users = await payload.find({
      collection: 'users',
      where: {
        lockUntil: { exists: true },
      },
      limit: 100,
    })

    const unlocked = []
    for (const user of users.docs) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          loginAttempts: 0,
          lockUntil: null,
        } as any,
      })
      unlocked.push(user.email)
    }

    return NextResponse.json({
      success: true,
      unlocked,
      message: unlocked.length > 0
        ? `Unlocked ${unlocked.length} user(s)`
        : 'No locked users found — resetting all login attempts',
    })
  } catch (error: any) {
    // Fallback: try direct DB reset if Payload API doesn't expose lockUntil
    try {
      const payload = await getPayload({ config })
      const allUsers = await payload.find({ collection: 'users', limit: 100 })

      for (const user of allUsers.docs) {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            loginAttempts: 0,
            lockUntil: null,
          } as any,
        })
      }

      return NextResponse.json({
        success: true,
        message: `Reset login attempts for ${allUsers.docs.length} user(s)`,
      })
    } catch (fallbackError: any) {
      return NextResponse.json({
        success: false,
        error: fallbackError.message
      }, { status: 500 })
    }
  }
}
