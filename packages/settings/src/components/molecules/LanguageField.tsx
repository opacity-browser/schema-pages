import { useEffect, useState } from "react"
import Listbox, { IListboxItem } from "design-system/atoms/Listbox"
import InputField from "design-system/atoms/InputField"
import MessageManager from "../../managers/MessageManager"
import useStrings from "../../hooks/useStrings"
import {
  getLanguageCode,
  LanguageCode,
  LanguageName
} from "../../helpers/language"

export default function LanguageField({ label }: { label: string }) {
  const messageManager = new MessageManager()
  const { strings } = useStrings()

  const [description, setDescription] = useState<string>("")
  const [language, setLanguage] = useState<IListboxItem>({
    id: "",
    name: ""
  })
  const [languageList, setLanguageList] = useState<IListboxItem[]>([])

  const handleChange = async (checked: IListboxItem) => {
    const res = await messageManager.updateLanguage(checked.id as LanguageCode)
    if (res === "error") return
    setLanguage(checked)
    setDescription(
      strings["The changes will take effect after restarting the app."]
    )
  }

  const getLanguageList = () => {
    const langList = messageManager.getLanguageList()
    setLanguageList(
      langList.map((langName) => ({
        id: getLanguageCode(langName),
        name: strings[langName]
      }))
    )
  }

  const getLanguage = async () => {
    const res = await messageManager.getLanguage()
    console.log(res)
    if (res === "error") return
    setLanguage({
      id: res.id,
      name: strings[res.name as LanguageName]
    })
  }

  useEffect(() => {
    getLanguage()
    getLanguageList()
  }, [strings])

  return (
    <InputField label={label} description={description}>
      <div className="max-w-60">
        <Listbox
          list={languageList}
          selected={language}
          onChange={handleChange}
        />
      </div>
    </InputField>
  )
}
