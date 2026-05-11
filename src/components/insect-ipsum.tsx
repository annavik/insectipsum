import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useText } from "@/lib/useText"
import { getTextUrl } from "@/lib/utils"
import { useState } from "react"
import { CopyButton } from "./copy-button"
import { Field, FieldLabel } from "./field"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const TYPES = [
  { label: "Paragraphs", value: "paragraphs" },
  { label: "Sentences", value: "sentences" },
  { label: "Words", value: "words" },
]
const MIN_COUNT = 1
const MAX_COUNT = 100

export const InsectIpsum = () => {
  const [count, setCount] = useState(3)
  const [type, setType] = useState("paragraphs")
  const [textUrl, setTextUrl] = useState(getTextUrl({ count, type }))
  const { text, refetch } = useText(textUrl)

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="font-heading text-4xl font-medium text-primary dark:text-foreground">
        Insect Ipsum
      </h1>
      <form
        className="mb-8 flex flex-wrap items-end gap-4"
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
        <Field>
          <FieldLabel htmlFor="type">Type</FieldLabel>
          <Select value={type} onValueChange={(value) => setType(value)}>
            <SelectTrigger id="type">
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
        </Field>
        <Field>
          <FieldLabel htmlFor="count">Count</FieldLabel>
          <Input
            className="w-24"
            id="count"
            max={MAX_COUNT}
            min={MIN_COUNT}
            onChange={(e) => setCount(Number(e.currentTarget.value))}
            type="number"
            value={count}
          />
        </Field>
        <Button>Generate</Button>
      </form>
      <div className="relative mb-8 rounded-lg border bg-muted p-4">
        <p className="font-mono text-sm">{textUrl}</p>
        <div className="absolute top-2 right-2 rounded-lg bg-muted">
          <CopyButton text={textUrl} />
        </div>
      </div>
      <div className="relative space-y-4 rounded-lg border bg-muted p-4 font-serif md:p-12">
        <div className="absolute top-2 right-2 rounded-lg bg-muted">
          <CopyButton text={text} />
        </div>
        {text.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  )
}
