import { useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import ShortCutDialog from "./ShortCutDialog"
import ShortCutItem from "./ShortCutItem"
import { Ii18n } from "./interface"

export default function ShortCutList({
  length = 6,
  list,
  onUpdate,
  onCreate,
  onDelete,
  className,
  i18n = {
    "Add Favorite": "Add Favorite",
    "Edit Favorite": "Edit Favorite",
    Title: "Title",
    Address: "Address",
    Edit: "Edit",
    Delete: "Delete",
    Save: "Save",
    Cancel: "Cancel"
  }
}: {
  length?: number
  list: Array<{
    id: string
    title: string
    address: string
  }>
  onUpdate?: (id: string, name: string, address: string) => void
  onCreate?: (name: string, address: string) => void
  onDelete?: (id: string) => void
  className?: string
  i18n?: Ii18n
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [openDialogId, setDialogOpenId] = useState("")

  const listLen = list.length
  const loopList = Array.from({ length }, () => null)

  const handleClickDropdown = (id: string, type: string) => {
    if (type === "delete") {
      if (onDelete) onDelete(id)
      return
    }
    setDialogOpenId(id)
    setIsOpen(true)
  }

  const handleClickClose = () => {
    setDialogOpenId("")
    setIsOpen(false)
  }

  return (
    <div {...{ className }}>
      <ul className="grid md:grid-cols-6 grid-cols-3 gap-4">
        {loopList.map((_, i) => {
          if (i === listLen)
            return (
              <li key={i}>
                <div className="relative size-28 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg cursor-pointer dark:bg-primary-800 dark:hover:bg-primary-900">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    onClick={() => handleClickDropdown("", "add")}
                  >
                    <PlusIcon className="size-7 text-gray-600 dark:text-gray-100" />
                  </div>
                  <ShortCutDialog
                    dialogTitle={i18n["Add Favorite"]}
                    title={""}
                    address={""}
                    isOpen={isOpen && openDialogId === ""}
                    onClose={handleClickClose}
                    onCreate={onCreate}
                    i18n={i18n}
                  />
                </div>
              </li>
            )

          if (i > listLen)
            return (
              <li key={i}>
                <div className="size-28 rounded-lg border-2 border-dashed border-gray dark:border-primary-800"></div>
              </li>
            )

          const { id, title, address } = list[i]

          return (
            <li key={id}>
              <ShortCutItem
                id={id}
                title={title}
                address={address}
                i={i}
                handleClickDropdown={handleClickDropdown}
                i18n={i18n}
              />
              <ShortCutDialog
                dialogTitle={i18n["Edit Favorite"]}
                title={title}
                address={address}
                isOpen={isOpen && openDialogId === id}
                onClose={handleClickClose}
                onUpdate={onUpdate}
                i18n={i18n}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
