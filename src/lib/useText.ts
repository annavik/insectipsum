import { useEffect, useState } from "react"

export const useText = (textUrl: string) => {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(new Date().getTime())

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const fetchText = async () => {
      try {
        const res = await fetch(textUrl)
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`)
        }

        const data = await res.json()
        if (!cancelled) {
          setText(data.text)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchText()

    return () => {
      cancelled = true
    }
  }, [textUrl, trigger])

  return {
    text,
    loading,
    error,
    refetch: () => setTrigger(new Date().getTime()),
  }
}
