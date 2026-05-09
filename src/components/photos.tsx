import { CopyIcon, DownloadIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const Photos = () => {
  const [width, setWidth] = useState(200)
  const [height, setHeight] = useState(300)

  return (
    <div>
      <h1 className="mb-8 font-heading text-4xl font-medium text-primary dark:text-foreground">
        Photos
      </h1>
      <div className="mb-8 flex items-end gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Width</span>
          <Input
            className="w-24"
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.currentTarget.value))}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Height</span>
          <Input
            className="w-24"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.currentTarget.value))}
          />
        </div>
        <Button>Generate</Button>
      </div>
      <div className="relative mb-8 rounded-lg border bg-muted p-4">
        <p className="font-mono text-sm">
          {`https://placeinsects.com/photos/${width}/${height}`}
        </p>
        <Button
          aria-label="Copy"
          className="absolute top-2 right-2"
          variant="outline"
          size="icon"
        >
          <CopyIcon />
        </Button>
      </div>
      <div className="relative flex items-center justify-center overflow-hidden rounded-lg border bg-muted">
        <img className="w-[200px]" src="/photos/photo-01.jpg" />
        <Button
          aria-label="Download"
          className="absolute top-2 right-2"
          variant="outline"
          size="icon"
        >
          <DownloadIcon />
        </Button>
      </div>
    </div>
  )
}
