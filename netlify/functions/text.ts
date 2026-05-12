import { WORD_BANK } from "./constants"

const MAX_COUNT = 100

export default async (req: Request) => {
  // Extract type and count from the path
  const url = new URL(req.url)
  const parts = url.pathname.split("/").filter(Boolean)
  const type = parts[1]
  const count = parseInt(parts[2])

  // Validate type
  if (!["paragraphs", "sentences", "words"].includes(type)) {
    return new Response(
      'Invalid type, use "paragraphs", "sentences", or "words"',
      { status: 400 }
    )
  }

  // Validate count
  if (isNaN(count) || count <= 0) {
    return new Response("Invalid count", { status: 400 })
  }

  if (count > MAX_COUNT) {
    return new Response(`Max count is ${MAX_COUNT}`, { status: 400 })
  }

  // Generate text
  let result = ""
  switch (type) {
    case "paragraphs":
      result = Array.from({ length: count }, generateParagraph).join("\n\n")
      break
    case "sentences":
      result = Array.from({ length: count }, generateSentence).join(" ")
      break
    case "words":
      result = generateWords(count)
      break
  }

  return new Response(JSON.stringify({ type, count, text: result }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export const config = {
  path: "/text/:type/:count",
}

// Helpers
const pick = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

const generateWord = (): string => pick(WORD_BANK)

const generateWords = (wordCount: number): string => {
  const result: string[] = []
  let totalCount = 0

  while (totalCount < wordCount) {
    const word = generateWord()
    const count = word.trim().split(/\s+/).length

    if (totalCount + count > wordCount) {
      continue
    }

    result.push(word)
    totalCount += count
  }

  result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1)

  return result.join(" ") + "."
}

const generateSentence = (): string => {
  const wordCount = 6 + Math.floor(Math.random() * 10) // 6–15 words

  return generateWords(wordCount)
}

const generateParagraph = (): string => {
  const sentenceCount = 3 + Math.floor(Math.random() * 4) // 3–6 sentences

  return Array.from({ length: sentenceCount }, generateSentence).join(" ")
}
