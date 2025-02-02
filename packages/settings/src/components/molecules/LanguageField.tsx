import { useEffect, useState } from "react"
import Listbox, { IListboxItem } from "design-system/atoms/Listbox"
import InputField from "design-system/atoms/InputField"
import MessageManager from "../../managers/MessageManager"
import useStrings from "../../hooks/useStrings"

export default function LanguageField({ label }: { label: string }) {
  const { getStrings } = useStrings()

  const messageManager = new MessageManager()
  const [language, setLanguage] = useState<IListboxItem>({
    id: "",
    name: ""
  })
  const [languageList, setLanguageList] = useState<IListboxItem[]>([])

  const handleChange = (checked: IListboxItem) => {
    getStrings()
    setLanguage(checked)
  }

  const getLanguageList = async () => {
    const res = await messageManager.getLanguageList()
    if (res === "error") return
    setLanguageList(res)
  }

  const getLanguage = async () => {
    const res = await messageManager.getLanguage()
    if (res === "error") return
    setLanguage(res)
  }

  useEffect(() => {
    getLanguage()
    getLanguageList()
  }, [])

  return (
    <InputField label={label}>
      <Listbox
        list={languageList}
        selected={language}
        onChange={handleChange}
      />
    </InputField>
  )
}
