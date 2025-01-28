import { Field, Input, Label } from "@headlessui/react"
import { ChangeEvent } from "react"

export default function InputTextField({
  title,
  name,
  value,
  onChange,
  autoFocus = false,
  placeholder
}: {
  title: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
  placeholder?: string
}) {
  return (
    <Field>
      <Label className="text-sm/6 text-primary dark:text-primary-100">
        {title}
      </Label>
      <Input
        className="mt-1.5 block w-full rounded-lg border-none bg-gray-100 py-1.5 px-3 text-sm/6 text-primary font-medium dark:bg-primary-700 dark:text-primary-100"
        name={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </Field>
  )
}
