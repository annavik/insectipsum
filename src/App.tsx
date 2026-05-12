import type { ReactNode } from "react"
import { AboutDialog } from "./components/about-dialog"
import { Footer } from "./components/footer"
import { Header } from "./components/header"
import { Photos } from "./components/photos"
import { Text } from "./components/text"
import { ThemeToggle } from "./components/theme-toggle"

export const App = () => (
  <div className="h-screen w-screen min-w-[320px]">
    <div className="top-0 right-0 z-1 flex w-full items-center justify-end gap-4 p-4 md:fixed md:w-auto">
      <AboutDialog />
      <ThemeToggle />
    </div>
    <div className="border-b p-6 py-12 md:px-16 md:py-8">
      <Content>
        <Header />
      </Content>
    </div>
    <div className="bg-background p-6 md:p-16 md:pt-32">
      <Content>
        <Text />
      </Content>
    </div>
    <div className="bg-background p-6 md:p-16 md:pb-32">
      <Content>
        <Photos />
      </Content>
    </div>
    <div className="border-t p-6 md:px-16 md:py-12">
      <Content>
        <Footer />
      </Content>
    </div>
  </div>
)

const Content = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto w-full max-w-3xl">{children}</div>
)

export default App
