import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setIsCopied] = useState(false)

  return (
    <Button
      aria-label="Copy"
      onClick={() => {
        navigator.clipboard.writeText(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      }}
      size="icon"
      variant="outline"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  )
}
