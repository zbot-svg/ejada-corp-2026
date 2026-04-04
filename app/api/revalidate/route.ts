import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const { path, secret } = await request.json()

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path })
    }

    // Revalidate all known paths
    revalidatePath('/')
    revalidatePath('/ar')
    revalidatePath('/insights')
    revalidatePath('/case-studies')
    revalidatePath('/about')

    return NextResponse.json({ revalidated: true, all: true })
  } catch (error) {
    return NextResponse.json({ error: 'Revalidation failed', details: String(error) }, { status: 500 })
  }
}
