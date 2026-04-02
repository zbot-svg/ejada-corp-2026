/**
 * Temporary bootstrap endpoint — creates the first Payload admin user.
 * Self-destructs: returns 410 Gone if any user already exists.
 * Remove this file after the first user is created.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { importMap } from '@/app/(payload)/admin/importMap'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config, importMap })

    // Safety: only works when no users exist
    const existing = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
    })

    if (existing.totalDocs > 0) {
      return NextResponse.json(
        { error: 'Users already exist — this endpoint is disabled.' },
        { status: 410 },
      )
    }

    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'ali@moderngrind.com',
        password: 'EjadaAdmin2026!',
      },
      overrideAccess: true,
    })

    return NextResponse.json(
      { message: 'Admin user created', id: user.id, email: user.email },
      { status: 201 },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
