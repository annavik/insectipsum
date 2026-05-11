import { cn, getPhotoUrl } from "@/lib/utils"
import { ExternalLinkIcon } from "lucide-react"
import { useState } from "react"
import { CopyButton } from "./copy-button"
import { Field, FieldLabel } from "./field"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"

const DEFAULT_WIDTH = 200
const DEFAULT_HEIGHT = 300
const MIN_SIZE = 1
const MAX_SIZE = 1024

export const Photos = () => {
  const [photoUrl, setPhotoUrl] = useState(
    getPhotoUrl({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  )

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="font-heading text-3xl font-medium text-primary md:text-4xl dark:text-foreground">
        Photos
      </h1>
      <form
        className="flex flex-wrap items-end gap-4"
        onSubmit={(e) => {
          e.preventDefault()

          const width = e.target.width.value
          const height = e.target.height.value
          setPhotoUrl(getPhotoUrl({ width, height }))
        }}
      >
        <Field>
          <FieldLabel htmlFor="width">Width</FieldLabel>
          <Input
            className="w-24"
            defaultValue={DEFAULT_WIDTH}
            id="width"
            max={MAX_SIZE}
            min={MIN_SIZE}
            required
            type="number"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="height">Height</FieldLabel>
          <Input
            className="w-24"
            defaultValue={DEFAULT_HEIGHT}
            id="height"
            max={MAX_SIZE}
            min={MIN_SIZE}
            required
            type="number"
          />
        </Field>
        <Button>Generate</Button>
      </form>
      <div className="relative rounded-lg border bg-muted">
        <div className="overflow-x-auto">
          <div className="w-max p-4 pr-12">
            <p className="font-mono text-sm">{photoUrl}</p>
          </div>
        </div>
        <div className="absolute top-2 right-2 rounded-lg bg-muted">
          <CopyButton text={photoUrl} />
        </div>
      </div>
      <Image src={photoUrl} />
    </div>
  )
}

const Image = ({ src }: { src: string }) => (
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
