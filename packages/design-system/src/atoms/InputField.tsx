import { ReactNode } from "react"
import { Description, Field, Label } from "@headlessui/react"

export default function InputField({
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
        <div className="mb-1">
          <Label className="text-sm/6 font-medium text-primary dark:text-primary-50">
            {label}
          </Label>
          {description && (
            <Description className="text-sm/6 text-primary-300 dark:text-primary-100">
              {description}
            </Description>
          )}
        </div>
        {children}
      </Field>
    </div>
  )
}
