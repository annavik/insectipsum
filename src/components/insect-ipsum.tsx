import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useText } from "@/lib/useText"
import { CopyIcon } from "lucide-react"
import { useState } from "react"
import { CopyButton } from "./copy-button"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const BASE_URL = "http://localhost:8888"
const TYPES = [
  { label: "Paragraphs", value: "paragraphs" },
  { label: "Sentences", value: "sentences" },
  { label: "Words", value: "words" },
]
const MIN_COUNT = 1
const MAX_COUNT = 100

const getTextUrl = ({ count, type }: { count: number; type: string }) =>
  `${BASE_URL}/text/${type}/${count}`

export const InsectIpsum = () => {
  const [count, setCount] = useState(3)
  const [type, setType] = useState("paragraphs")
  const [textUrl, setTextUrl] = useState(getTextUrl({ count, type }))
  const { text, refetch } = useText(textUrl)

  return (
    <div>
      <h1 className="mb-6 font-heading text-4xl font-medium text-primary dark:text-foreground">
        Insect Ipsum
      </h1>
      <form
        className="mb-8 flex items-end gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          const newTextUrl = getTextUrl({ count, type })

          if (textUrl === newTextUrl) {
            refetch()
          } else {
            setTextUrl(newTextUrl)
          }
        }}
      >
        <Input
          className="w-24"
          max={MAX_COUNT}
          min={MIN_COUNT}
          onChange={(e) => setCount(Number(e.currentTarget.value))}
          type="number"
          value={count}
        />
        <Select value={type} onValueChange={(value) => setType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button>Generate</Button>
      </form>
      <div className="relative mb-8 rounded-lg border bg-muted p-4">
        <p className="font-mono text-sm">{textUrl}</p>
        <div className="absolute top-2 right-2">
          <CopyButton text={textUrl} />
        </div>
      </div>
      <div className="relative space-y-4 rounded-lg border bg-muted p-12 font-serif">
        <Button
          aria-label="Copy"
          className="absolute top-2 right-2"
          variant="outline"
          size="icon"
        >
          <CopyIcon />
        </Button>
        {text.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
