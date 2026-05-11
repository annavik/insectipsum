import * as fs from "fs"
import * as path from "path"
import sharp from "sharp"

const MAX_SIZE = 1024
const QUALITY = 85

export default async (req: Request) => {
  // Extract dimensions from the path
  const url = new URL(req.url)
  const parts = url.pathname.split("/").filter(Boolean)
  const width = parseInt(parts[1])
  const height = parseInt(parts[2])

  // Validate dimensions
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return new Response("Invalid dimensions", { status: 400 })
  }

  if (width > MAX_SIZE || height > MAX_SIZE) {
    return new Response(`Max size is ${MAX_SIZE}x${MAX_SIZE}`, { status: 400 })
  }

  // Pick a random image from the photos folder
  const photosDir = path.join(process.cwd(), "photos")
  const files = fs
    .readdirSync(photosDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))

  if (files.length === 0) {
    return new Response("No images found", { status: 404 })
  }

  const randomFile = files[Math.floor(Math.random() * files.length)]
  const imagePath = path.join(photosDir, randomFile)

  // Resize with sharp
  const resized = await sharp(imagePath)
    .resize(width, height, { fit: "cover" })
    .jpeg({ quality: QUALITY })
    .toBuffer()

  return new Response(resized, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=3600",
    },
  })
}

export const config = {
  path: "/photos/:width/:height",
}
