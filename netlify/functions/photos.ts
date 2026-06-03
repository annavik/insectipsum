import * as fs from "fs"
import * as path from "path"
import sharp from "sharp"

const NUM_IMAGES = 16
const MAX_SIZE = 1024
const QUALITY = 85

export default async (req: Request) => {
  const url = new URL(req.url)

  // Parse and validate dimensions
  const parts = url.pathname.split("/").filter(Boolean)
  const width = parseInt(parts[1])
  const height = parseInt(parts[2])

  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    return new Response("Invalid dimensions", { status: 400 })
  }

  if (width > MAX_SIZE || height > MAX_SIZE) {
    return new Response(`Max size is ${MAX_SIZE}x${MAX_SIZE}`, { status: 400 })
  }

  // Parse and validate optional image ID
  const imageIdParam = url.searchParams.get("image_id")
  const imageId = imageIdParam !== null ? parseInt(imageIdParam) : undefined

  if (imageId !== undefined) {
    if (isNaN(imageId) || imageId < 1 || imageId > NUM_IMAGES) {
      return new Response(
        "Invalid image ID, use 1-16 or skip for a random image",
        { status: 400 }
      )
    }
  }

  // Collect available images
  const photosDir = path.join(process.cwd(), "photos")
  const files = fs
    .readdirSync(photosDir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()

  if (files.length === 0) {
    return new Response("No images found", { status: 404 })
  }

  // Select image
  const selectedFile =
    imageId !== undefined
      ? files[imageId - 1]
      : files[Math.floor(Math.random() * files.length)]
  const imagePath = path.join(photosDir, selectedFile)

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
