import { FUNDRAISING_URL } from "@/lib/constants"
import { HeartIcon } from "lucide-react"

export const Footer = () => (
  <div className="text-center font-cursive text-lg text-muted-foreground">
    <span>
      If you like the tool, feel free to support{" "}
      <a
        className="text-foreground underline"
        href={FUNDRAISING_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        this fundraising
      </a>{" "}
      for pollinators{" "}
      <HeartIcon className="inline fill-[#E46C3E] stroke-none" />
    </span>
  </div>
)
