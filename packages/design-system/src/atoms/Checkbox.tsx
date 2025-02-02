import clsx from "clsx"
import { Checkbox as HUICheckbox } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"

export default function Checkbox({
  checked,
  onChange
}: {
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <HUICheckbox
      checked={checked}
      onChange={onChange}
      className={clsx(
        "group block size-6 p-0.5 rounded border",
        "border-primary-100 dark:border-primary-500",
        "bg-white dark:bg-primary-800 data-[checked]:bg-primary-700 dark:data-[checked]:bg-white",
        "data-[checked]:border-primary-900 dark:border-primary-600",
        "cursor-pointer"
      )}
    >
      <CheckIcon
        className={clsx(
          "stroke-2 opacity-0 group-data-[checked]:opacity-100",
          "stroke-primary-50 dark:stroke-primary-900"
        )}
      />
    </HUICheckbox>
  )
}
