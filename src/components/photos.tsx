import { useState } from "react"
import { CopyButton } from "./copy-button"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"

const BASE_URL = "http://localhost:8888"
const MIN_SIZE = 1
const MAX_SIZE = 1024

const getPhotoUrl = ({ width, height }: { width: number; height: number }) =>
  `${BASE_URL}/photos/${width}/${height}`

export const Photos = () => {
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(300)
  const [photoUrl, setPhotoUrl] = useState(getPhotoUrl({ width, height }))

  return (
    <div>
      <h1 className="mb-8 font-heading text-4xl font-medium text-primary dark:text-foreground">
        Photos
      </h1>
      <form
        className="mb-8 flex items-end gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          setPhotoUrl(getPhotoUrl({ width, height }))
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Width</span>
          <Input
            className="w-24"
            max={MAX_SIZE}
            min={MIN_SIZE}
            onChange={(e) => setWidth(Number(e.currentTarget.value))}
            required
            type="number"
            value={width}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Height</span>
          <Input
            className="w-24"
            max={MAX_SIZE}
            min={MIN_SIZE}
            onChange={(e) => setHeight(Number(e.currentTarget.value))}
            required
            type="number"
            value={height}
          />
        </div>
        <Button>Generate</Button>
      </form>
      <div className="relative mb-8 rounded-lg border bg-muted p-4">
        <p className="font-mono text-sm">{photoUrl}</p>
        <div className="absolute top-2 right-2">
          <CopyButton text={photoUrl} />
        </div>
      </div>
      <Image src={photoUrl} filename={`${width}x${height}.jpg`} />
    </div>
  )
}

const Image = ({ src }: { filename: string; src: string }) => (
  <div className="relative flex min-h-24 items-center justify-center overflow-hidden rounded-lg border bg-muted">
    <img alt="Photo" className="max-h-full max-w-full" src={src} />
    <a
      className={cn(
        "absolute top-2 right-2",
        buttonVariants({ size: "icon", variant: "outline" })
      )}
      href={src}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ExternalLinkIcon />
    </a>
  </div>
)
