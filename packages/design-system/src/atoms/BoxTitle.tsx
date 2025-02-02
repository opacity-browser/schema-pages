import { ReactNode } from "react"

export default function BoxTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm/6 font-medium mb-2 text-primary dark:text-primary-50">
      {children}
    </h2>
  )
}
