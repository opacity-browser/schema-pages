import { useEffect, useState } from "react"
import clsx from "clsx"
import { IStrings } from "../../interfases/IStrings"
import MessageManager from "../../managers/MessageManager"
import DocumentMeta from "../atoms/DocumentMeta"
import Logo from "design-system/atoms/Logo"
import Shortcut from "../molecules/ShortCut"

export default function NewTab() {
  const messageManager = new MessageManager()

  const [isInit, setIsInit] = useState(false)
  const [strings, setStrings] = useState<IStrings>({
    lang: "",
    headTitle: "",
    "Add Favorite": "",
    "Edit Favorite": "",
    Title: "",
    Address: "",
    Edit: "",
    Delete: "",
    Save: "",
    Cancel: ""
  })

  const getStrings = async () => {
    const strings = await messageManager.getStrings()
    if (strings === "error") {
      setIsInit(true)
      return
    }

    document.documentElement.lang = strings.lang
    setStrings(strings)
    setIsInit(true)
  }

  useEffect(() => {
    getStrings()
  }, [])

  return (
    <div
      className={clsx(
        "w-full h-full flex justify-center items-center flex-col min-h-[500px]",
        isInit ? "" : "hidden"
      )}
    >
      <div className="flex flex-col">
        <figure className="m-auto mt-6 mb-20">
          <Logo className="invert size-20" />
        </figure>
        <Shortcut className="mb-14" i18n={strings} />
      </div>
      <DocumentMeta title={strings.headTitle} />
    </div>
  )
}
