import { ReactNode } from "react"
import { Button as BTN } from "@headlessui/react"

export default function Button({
  size = "medium",
  onClick,
  disabled = false,
  children
}: {
  size?: "small" | "medium" | "large"
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
}) {
  const styles = () => {
    const className =
      "bg-primary text-onPrimary data-[hover]:bg-primary/80 transition-colors disabled:bg-gray-400 dark:bg-primary-500 dark:text-primary-100 dark:data-[hover]:bg-primary-400 dark:disabled:bg-primary-700"

    switch (size) {
      case "small":
        return `py-1 px-2 text-xs rounded-sm ${className}`
      case "medium":
        return `py-2 px-3 text-sm rounded-md ${className}`
      case "large":
        return `py-2 px-4 text-lg rounded-lg ${className}`
    }
  }

  return (
    <BTN className={styles()} onClick={onClick} disabled={disabled}>
      {children}
    </BTN>
  )
}
