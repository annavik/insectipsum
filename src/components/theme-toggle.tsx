import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { MoonIcon, SunIcon } from "lucide-react"
import { getSystemTheme, useTheme } from "./theme-provider"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme

  return (
    <ToggleGroup
      onValueChange={(value) => {
        if (value === "light" || value === "dark") {
          setTheme(value)
        }
      }}
      type="single"
      value={resolvedTheme}
      variant="outline"
    >
      <ToggleGroupItem aria-label="Light" value="light">
        <SunIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Dark" value="dark">
        <MoonIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
