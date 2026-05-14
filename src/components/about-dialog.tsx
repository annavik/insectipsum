import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FUNDRAISING_URL,
  GITHUB_REPO_URL,
  GITHUB_USER_URL,
  LICENSE_URL,
  PHOTOS_URL,
  STICKERS_URL,
} from "@/lib/constants"

export const AboutDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost">About</Button>
    </DialogTrigger>
    <DialogContent className="p-6 sm:max-w-lg md:p-12">
      <DialogHeader className="gap-6">
        <DialogTitle className="text-3xl font-medium text-primary md:text-4xl dark:text-foreground">
          About
        </DialogTitle>
        <DialogDescription className="text-base">
          This tool was made by me, <Link href={GITHUB_USER_URL}>Anna</Link>.
          I'm a frontend developer and insect enthusiast 🐛 If you like the
          tool, feel free to support{" "}
          <Link href={FUNDRAISING_URL}>my fundraising</Link> for pollinators.
        </DialogDescription>
      </DialogHeader>
      <p className="text-base text-muted-foreground">
        To keep the tool lightweight, text and images are served without AI, but
        the text word bank was set up with some AI help. Text and images are
        available via the web interface and the API. Both are served on demand
        and not permanently stored. Images are cached for one hour. For
        technical details, check out the{" "}
        <Link href={GITHUB_REPO_URL}>code repo</Link>.
      </p>
      <p className="text-base text-muted-foreground">
        The stickers in the header come from{" "}
        <Link href={STICKERS_URL}>Flaticon</Link>.
      </p>
      <p className="text-base text-muted-foreground">
        The original insect photos come from{" "}
        <Link href={PHOTOS_URL}>Unsplash</Link>. They all have a{" "}
        <Link href={LICENSE_URL}>free license</Link> and can be downloaded and
        used without permission.
      </p>
    </DialogContent>
  </Dialog>
)

const Link = ({ children, href }: { children: string; href: string }) => (
  <a
    className="text-foreground underline"
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
  </a>
)
