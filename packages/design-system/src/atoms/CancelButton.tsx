import { ReactNode } from "react"
import { Button as BTN } from "@headlessui/react"

export default function CancelButton({
  size = "medium",
  onClick,
  children
}: {
  size?: "small" | "medium" | "large"
  onClick?: () => void
  children: ReactNode
}) {
  const styles = () => {
    const className =
      "bg-transparent text-primary data-[hover]:bg-gray-100 transition-colors dark:text-primary-100 dark:data-[hover]:bg-primary-900/60"

    switch (size) {
      case "small":
        return `py-1 px-2 text-xs rounded-sm ${className}`
      case "medium":
        return `py-1.5 px-2.5 text-sm rounded-md ${className}`
      case "large":
        return `py-2 px-4 text-lg rounded-lg ${className}`
    }
  }

  return (
    <BTN className={styles()} onClick={onClick}>
      {children}
    </BTN>
  )
}
