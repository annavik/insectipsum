import type { ReactNode } from "react"

export const Field = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col gap-1">{children}</div>
)

export const FieldLabel = ({
  children,
  htmlFor,
}: {
  children: ReactNode
  htmlFor: string
}) => (
  <label className="text-sm font-medium" htmlFor={htmlFor}>
    {children}
  </label>
)
