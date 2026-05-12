import { getSystemTheme, useTheme } from "./theme-provider"

const LOREM_IPSUM_URL = "https://en.wikipedia.org/wiki/Lorem_ipsum"

export const Header = () => {
  const { theme } = useTheme()
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme

  return (
    <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
      <img
        alt=""
        className="h-32 md:h-48"
        src={resolvedTheme === "light" ? "/butterfly.png" : "/moths.png"}
      />
      <div>
        <h1 className="mb-6 font-heading text-4xl font-medium text-primary md:text-5xl dark:text-foreground">
          Insect Ipsum
        </h1>
        <p className="text-muted-foreground">
          Have you seen enough of{" "}
          <a
            className="text-foreground underline"
            href={LOREM_IPSUM_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Lorem ipsum
          </a>{" "}
          text and generic placeholder photos? Are you also into insects? Then
          this tool is for you! Here you can generate insect themed placeholder
          content for design and code.
        </p>
      </div>
    </div>
  )
}
