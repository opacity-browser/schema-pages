import { useEffect, useState } from "react"
import InputField from "design-system/atoms/InputField"
import Listbox, { IListboxItem } from "design-system/atoms/Listbox"
import MessageManager from "../../managers/MessageManager"

export default function ScreenModeField({ label }: { label: string }) {
  const [screenMode, setScreenMode] = useState<IListboxItem>({
    id: "",
    name: ""
  })
  const [screenModeList, setScreenModeList] = useState<IListboxItem[]>([])
  const messageManager = new MessageManager()

  const handleChange = async (checked: IListboxItem) => {
    const res = await messageManager.updateScreenMode(checked.id)
    if (res === "error") return
    setScreenMode(checked)
  }

  const getScreenModeList = async () => {
    const res = await messageManager.getScreenModeList()
    if (res === "error") return
    setScreenModeList(res)
  }

  const getScreenMode = async () => {
    const res = await messageManager.getScreenMode()
    if (res === "error") return
    setScreenMode(res)
  }

  useEffect(() => {
    getScreenMode()
    getScreenModeList()
  }, [])

  return (
    <InputField label={label}>
      <Listbox
        list={screenModeList}
        selected={screenMode}
        onChange={handleChange}
      />
    </InputField>
  )
}
