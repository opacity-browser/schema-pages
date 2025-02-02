import { Description, Field, Label } from "@headlessui/react"
import { ReactNode } from "react"
import Checkbox from "./Checkbox"

export default function CheckboxField({
  label,
  description,
  checked,
  onChange
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="w-full">
      <Field>
        <div className="flex items-center mb-1 gap-2">
          <Checkbox checked={checked} onChange={onChange} />
          <Label className="text-sm/6 font-medium text-primary dark:text-primary-50 pt-0.5">
            {label}
          </Label>
        </div>
        {description && (
          <Description className="text-sm/6 text-primary-300 dark:text-primary-300 mt-1">
            {description}
          </Description>
        )}
      </Field>
    </div>
  )
}
