import { Select } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

export default function Selectbox({ ...props }) {
  return (
    <div className="relative min-w-48">
      <Select
        className={clsx(
          "block w-full appearance-none rounded-lg border py-1.5 px-3 text-sm/6",
          "border-primary-200 dark:border-primary-500",
          "text-primary dark:text-primary-50 bg-white dark:bg-primary-600",
          "*:text-black"
        )}
      >
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="delayed">Delayed</option>
        <option value="canceled">Canceled</option>
      </Select>
      <ChevronDownIcon
        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-primary-700 dark:fill-primary-50"
        aria-hidden="true"
      />
    </div>
  )
}
