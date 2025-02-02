import clsx from "clsx"
import {
  Listbox as HUIListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

export interface IListboxItem {
  id: string
  name: string
}

export default function Listbox({
  list,
  selected,
  onChange
}: {
  list: Array<IListboxItem>
  selected: IListboxItem
  onChange: (selected: IListboxItem) => void
}) {
  return (
    <HUIListbox value={selected} onChange={onChange}>
      <ListboxButton
        className={clsx(
          "relative block w-full rounded-lg border py-1.5 pl-3 pr-8 text-sm/6",
          "min-w-56 text-left",
          "border-primary-100 dark:border-primary-500",
          "text-primary dark:text-primary-50 bg-white dark:bg-primary-600"
        )}
      >
        {selected.name}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--button-width)] rounded-lg border p-1 [--anchor-gap:4px] focus:outline-none",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          "border-primary-100 dark:border-primary-500",
          "text-sm bg-white dark:bg-primary-600"
        )}
      >
        {list.map((item) => (
          <ListboxOption
            key={item.id}
            value={item}
            className={clsx(
              "group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            )}
          >
            {" "}
            <CheckIcon className="invisible size-4 group-data-[selected]:visible stroke-primary-700 dark:stroke-primary-900" />
            {item.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HUIListbox>
  )
}
