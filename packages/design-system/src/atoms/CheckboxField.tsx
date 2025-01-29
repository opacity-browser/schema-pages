import { Description, Field, Label } from "@headlessui/react"
import { ReactNode } from "react"

export default function CheckboxField({
  label,
  description,
  children
}: {
  label: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="w-full">
      <Field>
        <div className="flex items-center mb-1 gap-2">
          {children}
          <Label className="text-sm/6 font-medium text-primary dark:text-primary-50 pt-0.5">
            {label}
          </Label>
        </div>
        {description && (
          <Description className="text-sm/6 text-primary-300 dark:text-primary-100 mt-1">
            {description}
          </Description>
        )}
      </Field>
    </div>
  )
}
