import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'backend', 'blog.json')
    const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '[]'
    return new Response(content, { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify([]), { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const file = path.join(process.cwd(), 'backend', 'blog.json')
    const arr = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8') || '[]') : []
    const item = { ...body, id: Date.now() }
    arr.push(item)
    fs.writeFileSync(file, JSON.stringify(arr, null, 2))
    return new Response(JSON.stringify({ success: true, id: item.id }), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false }), { status: 500 })
  }
}
