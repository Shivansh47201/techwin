import fs from 'fs'
import path from 'path'

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const file = path.join(process.cwd(), 'backend', 'blog.json')
    const arr = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : []
    const item = arr.find((p: any) => String(p.id) === String(id))
    return new Response(JSON.stringify(item || null), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify(null), { status: 500 })
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await req.json()
    const file = path.join(process.cwd(), 'backend', 'blog.json')
    const arr = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : []
    const idx = arr.findIndex((p: any) => String(p.id) === String(id))
    if (idx === -1) return new Response(JSON.stringify({ success: false }), { status: 404 })
    arr[idx] = { ...arr[idx], ...body }
    fs.writeFileSync(file, JSON.stringify(arr, null, 2))
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false }), { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const file = path.join(process.cwd(), 'backend', 'blog.json')
    const arr = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : []
    const filtered = arr.filter((p: any) => String(p.id) !== String(id))
    fs.writeFileSync(file, JSON.stringify(filtered, null, 2))
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false }), { status: 500 })
  }
}
