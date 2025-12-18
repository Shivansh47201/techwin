import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const dataDir = path.join(process.cwd(), 'backend')
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

    const file = path.join(dataDir, 'quotes.json')
    let arr: any[] = []
    if (fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, 'utf8')
        arr = JSON.parse(content || '[]')
      } catch (e) {
        arr = []
      }
    }

    const item = { ...body, id: Date.now(), createdAt: new Date().toISOString() }
    arr.push(item)
    fs.writeFileSync(file, JSON.stringify(arr, null, 2))

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('quote API error', err)
    return new Response(JSON.stringify({ success: false, error: 'server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
