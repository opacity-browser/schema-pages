import { useEffect, useState } from "react"
import InputField from "design-system/atoms/InputField"
import Listbox, { IListboxItem } from "design-system/atoms/Listbox"
import MessageManager from "../../managers/MessageManager"

export default function RetentionPeriodField({ label }: { label: string }) {
  const messageManager = new MessageManager()

  const [retentionPeriod, setRetentionPeriod] = useState<IListboxItem>({
    id: "",
    name: ""
  })
  const [retentionPeriodList, setRetentionPeriodList] = useState<
    IListboxItem[]
  >([])

  const handleChange = async (checked: IListboxItem) => {
    const res = await messageManager.updateRetentionPeriod(checked.id)
    if (res === "error") return
    setRetentionPeriod(checked)
  }

  const getRetentionPeriodList = async () => {
    const res = await messageManager.getRetentionPeriodList()
    if (res === "error") return
    setRetentionPeriodList(res)
  }

  const getRetentionPeriod = async () => {
    const res = await messageManager.getRetentionPeriod()
    if (res === "error") return
    setRetentionPeriod(res)
  }

  useEffect(() => {
    getRetentionPeriod()
    getRetentionPeriodList()
  }, [])

  return (
    <InputField label={label}>
      <Listbox
        list={retentionPeriodList}
        selected={retentionPeriod}
        onChange={handleChange}
      />
    </InputField>
  )
}
