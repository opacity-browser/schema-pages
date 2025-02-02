import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { Ii18n } from "./interface"

export default function ShortCutDropdown({
  onClick,
  i18n
}: {
  onClick: (type: string) => void
  i18n: Ii18n
}) {
  return (
    <>
      <Menu>
        <MenuButton className="">
          <EllipsisVerticalIcon className="size-5 text-primary-600 dark:text-primary-400" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-24 origin-top-right rounded-xl border border-gray/5 bg-white p-1 text-sm/6 text-primary transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 [--anchor-gap:-20px] z-50 dark:bg-primary-800 dark:border-primary-700 dark:text-primary-100"
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1 px-3 data-[focus]:bg-gray-100 dark:data-[focus]:bg-primary-900"
              onClick={() => onClick("edit")}
            >
              {i18n["Edit"]}
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1 px-3 data-[focus]:bg-gray-100 dark:data-[focus]:bg-primary-900"
              onClick={() => onClick("delete")}
            >
              {i18n["Delete"]}
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  )
}
