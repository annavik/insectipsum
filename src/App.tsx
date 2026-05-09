import type { ReactNode } from "react"
import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { InsectIpsum } from "./components/insect-ipsum"
import { Photos } from "./components/photos"
import { ThemeToggle } from "./components/theme-toggle"
import { Button } from "./components/ui/button"

export function App() {
  return (
    <div className="h-screen w-screen">
      <div className="fixed top-4 right-4 z-1 flex items-center gap-4">
        <Button variant="ghost">About</Button>
        <ThemeToggle />
      </div>
      <div className="border-b bg-muted px-16 py-8">
        <Content>
          <Header />
        </Content>
      </div>
      <div className="p-16 pt-32">
        <Content>
          <InsectIpsum />
        </Content>
      </div>
      <div className="p-16 pb-32">
        <Content>
          <Photos />
        </Content>
      </div>
      <div className="border-t bg-muted px-16 py-12">
        <Content>
          <Footer />
        </Content>
      </div>
    </div>
  )
}

const Content = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto max-w-3xl">{children}</div>
)

export default App
