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
      className="group block size-6 p-0.5 rounded border bg-white data-[checked]:bg-primary-700 dark:bg-primary-800 dark:border-primary-600 dark:data-[checked]:bg-white data-[checked]:border-primary-900"
    >
      <CheckIcon className="stroke-white dark:stroke-primary-900 opacity-0 group-data-[checked]:opacity-100 stroke-2" />
    </HUICheckbox>
  )
}
