import { ChangeEvent } from "react"
import { Input as HUIInput } from "@headlessui/react"

export default function Input({
  name,
  value,
  onChange,
  autoFocus = false,
  placeholder = ""
}: {
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  placeholder?: string
}) {
  return (
    <HUIInput
      className="block w-full rounded-lg border-none bg-gray-100 py-1.5 px-3 text-sm/6 text-primary font-medium dark:bg-primary-700 dark:text-primary-100"
      name={name}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  )
}
