import { ChangeEvent, useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import Button from "../../atoms/Button"
import CancelButton from "../../atoms/CancelButton"
import { Ii18n } from "./interface"
import InputField from "../../atoms/InputField"
import Input from "../../atoms/Input"

export default function ShortCutDialog({
  dialogTitle,
  id,
  title,
  address,
  isOpen,
  onClose,
  onUpdate,
  onCreate,
  i18n
}: {
  dialogTitle: string
  id?: string
  title: string
  address: string
  isOpen: boolean
  onClose: () => void
  onUpdate?: (id: string, name: string, address: string) => void
  onCreate?: (name: string, address: string) => void
  i18n: Ii18n
}) {
  const [shortCutTitle, setShortCutTitle] = useState(title)
  const [shortCutAddress, setShortCutAddress] = useState(address)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "title") setShortCutTitle(value)
    if (name === "address") setShortCutAddress(value)
  }

  const handleClickSave = () => {
    if (id) {
      if (onUpdate) onUpdate(id, shortCutTitle, shortCutAddress)
    } else {
      if (onCreate) onCreate(shortCutTitle, shortCutAddress)
    }
    handleClickClose()
  }

  const handleClickClose = () => {
    setShortCutTitle(title)
    setShortCutAddress(address)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={handleClickClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/10 dark:bg-black/40">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 border border-gray/10 text-primary dark:bg-primary-800 dark:border-primary-700 dark:text-primary-100"
          >
            <DialogTitle as="h2" className="text-base/7 font-medium mb-4">
              {dialogTitle}
            </DialogTitle>

            <div className="mb-5 space-y-3">
              <InputField label={i18n["Title"]}>
                <Input
                  name="title"
                  value={shortCutTitle}
                  onChange={handleChangeInput}
                />
              </InputField>
              <InputField label={i18n["Address"]}>
                <Input
                  name="address"
                  value={shortCutAddress}
                  onChange={handleChangeInput}
                />
              </InputField>
            </div>

            <div className="text-right space-x-2">
              <CancelButton onClick={handleClickClose}>
                {i18n["Cancel"]}
              </CancelButton>
              <Button
                onClick={handleClickSave}
                disabled={shortCutTitle === "" || shortCutAddress === ""}
              >
                {i18n["Save"]}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
