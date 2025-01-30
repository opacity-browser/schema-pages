import { ReactNode } from "react"

export default function BoxTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-semibold mb-2 text-primary dark:text-primary-50">
      {children}
    </h2>
  )
}
