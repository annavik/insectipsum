import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, getPhotoUrl } from "@/lib/utils"
import { ExternalLinkIcon, Loader2Icon } from "lucide-react"
import { useEffect, useState } from "react"
import { CopyButton } from "./copy-button"
import { Field, FieldLabel } from "./field"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "./ui/input"

const DEFAULT_HEIGHT = 300
const DEFAULT_IMAGE_ID = -1 // Random image
const DEFAULT_WIDTH = 200
const MAX_SIZE = 1024
const MIN_SIZE = 1
const NUM_IMAGES = 16

export const Photos = () => {
  const [generating, setGenerating] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(
    getPhotoUrl({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      imageId: DEFAULT_IMAGE_ID,
    })
  )

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="mb-4 font-heading text-3xl font-medium text-primary md:text-4xl dark:text-foreground">
          Photos
        </h1>
        <p className="text-sm text-muted-foreground">
          Specify image size, generate a photo and save it! You can also access
          images directly from the URL. Images are served on demand and cached
          for one hour. They are not permanently stored.
        </p>
      </div>
      <form
        className="flex flex-wrap items-end gap-4"
        onSubmit={(e) => {
          e.preventDefault()

          const width = e.target.width.value
          const height = e.target.height.value
          const imageId = e.target.image.value
          const newPhotoUrl = getPhotoUrl({ width, height, imageId })

          if (newPhotoUrl === photoUrl) {
            // Simulate loading
            setGenerating(true)
            setTimeout(() => setGenerating(false), 200)
          } else {
            setPhotoUrl(newPhotoUrl)
          }
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
        <Field>
          <FieldLabel htmlFor="image">Image</FieldLabel>
          <Select defaultValue={`${DEFAULT_IMAGE_ID}`} name="image">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={`${DEFAULT_IMAGE_ID}`}>Random</SelectItem>
              {Array.from({ length: NUM_IMAGES }).map((_, index) => {
                const value = `${index + 1}`

                return (
                  <SelectItem key={value} value={value}>
                    Image {value}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
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
      <Image generating={generating} src={photoUrl} />
    </div>
  )
}

const Image = ({ generating, src }: { generating: boolean; src: string }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => setLoading(true), [src])

  return (
    <div className="relative flex min-h-24 items-center justify-center overflow-hidden rounded-lg border bg-muted">
      {generating || loading ? (
        <Loader2Icon className="absolute z-1 size-12 animate-spin text-foreground" />
      ) : null}
      <img
        alt=""
        className={cn("max-h-full max-w-full", {
          "opacity-50": generating || loading,
        })}
        src={src}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      <div className="absolute top-2 right-2 rounded-lg bg-muted">
        <a
          className={cn(
            "",
            buttonVariants({ size: "icon", variant: "outline" })
          )}
          href={src}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  )
}
