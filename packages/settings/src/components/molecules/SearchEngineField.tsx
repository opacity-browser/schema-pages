import InputField from "design-system/atoms/InputField"
import Listbox, { IListboxItem } from "design-system/atoms/Listbox"
import { useEffect, useState } from "react"
import MessageManager from "../../managers/MessageManager"

export default function SearchEngineField({ label }: { label: string }) {
  const messageManager = new MessageManager()

  const [searchEngine, setSearchEngine] = useState<IListboxItem>({
    id: "",
    name: ""
  })
  const [searchEngineList, setSearchEngineList] = useState<IListboxItem[]>([])

  const handleChange = async (checked: IListboxItem) => {
    const res = await messageManager.updateSearchEngine(checked.id)
    if (res === "error") return
    setSearchEngine(checked)
  }

  const getSearchEngineList = async () => {
    const res = await messageManager.getSearchEngineList()
    if (res === "error") return
    setSearchEngineList(res)
  }

  const getSearchEngine = async () => {
    const res = await messageManager.getSearchEngine()
    if (res === "error") return
    setSearchEngine(res)
  }

  useEffect(() => {
    getSearchEngine()
    getSearchEngineList()
  }, [])

  return (
    <InputField label={label}>
      <Listbox
        list={searchEngineList}
        selected={searchEngine}
        onChange={handleChange}
      />
    </InputField>
  )
}
