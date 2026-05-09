import { HeartIcon } from "lucide-react"

const GITHUB_URL = "https://github.com/annavik"

export const Footer = () => (
  <div className="flex items-center justify-center gap-1.5 font-cursive text-lg text-muted-foreground">
    <span>Made with</span>
    <HeartIcon className="inline fill-[#E46C3E] stroke-none" />
    <span>
      by{" "}
      <a
        className="text-foreground underline"
        href={GITHUB_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Anna
      </a>
    </span>
  </div>
)
