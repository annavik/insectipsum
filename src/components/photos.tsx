import { cn } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import { useState } from "react"
import { CopyButton } from "./copy-button"
import { Field, FieldLabel } from "./field"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"

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
    <div className="space-y-6 md:space-y-8">
      <h1 className="font-heading text-4xl font-medium text-primary dark:text-foreground">
        Photos
      </h1>
      <form
        className="flex flex-wrap items-end gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          setPhotoUrl(getPhotoUrl({ width, height }))
        }}
      >
        <Field>
          <FieldLabel htmlFor="width">Width</FieldLabel>
          <Input
            className="w-24"
            id="width"
            max={MAX_SIZE}
            min={MIN_SIZE}
            onChange={(e) => setWidth(Number(e.currentTarget.value))}
            required
            type="number"
            value={width}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="height">Height</FieldLabel>
          <Input
            className="w-24"
            id="height"
            max={MAX_SIZE}
            min={MIN_SIZE}
            onChange={(e) => setHeight(Number(e.currentTarget.value))}
            required
            type="number"
            value={height}
          />
        </Field>
        <Button>Generate</Button>
      </form>
      <div className="relative rounded-lg border bg-muted p-4">
        <p className="font-mono text-sm">{photoUrl}</p>
        <div className="absolute top-2 right-2 rounded-lg bg-muted">
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
    <div className="absolute top-2 right-2 rounded-lg bg-muted">
      <a
        className={cn("", buttonVariants({ size: "icon", variant: "outline" }))}
        href={src}
        rel="noopener noreferrer"
        target="_blank"
      >
        <ExternalLinkIcon />
      </a>
    </div>
  </div>
)
