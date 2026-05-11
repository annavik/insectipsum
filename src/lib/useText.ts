/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react"

export function useText(textUrl: string) {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [trigger, setTrigger] = useState(new Date().getTime())

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(textUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`)
        }

        return res.json()
      })
      .then((data) => {
        if (!cancelled) {
          setText(data.text)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

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
