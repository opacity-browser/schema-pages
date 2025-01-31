import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import clsx from "clsx"
import ErrorMessage from "design-system/atoms/ErrorMessage"
import { IStrings } from "../../interfases/IStrings"
import MessageManager from "../../managers/MessageManager"
import DocumentMeta from "../atoms/DocumentMeta"

export default function Error() {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const errorType = searchParams.get("errorType")
  const decodeURL = atob(searchParams.get("url") || "")
  const messageManager = new MessageManager()

  const [strings, setStrings] = useState<IStrings>({
    lang: "",
    headTitle: "",
    title: "",
    message: "",
    buttonText: ""
  })

  const getStrings = async (errorType: string) => {
    const strings = await messageManager.getStrings(errorType)
    document.documentElement.lang = strings.lang
    setStrings(strings)
  }

  const handleClickRefresh = () => {
    if (decodeURL) messageManager.replacePage(decodeURL)
  }

  useEffect(() => {
    if (errorType) getStrings(errorType)
  }, [])

  return (
    <div
      className={clsx(
        "w-full h-full flex justify-start items-center flex-col",
        strings.lang === "" ? "hidden" : ""
      )}
    >
      <div className="mt-24">
        <ErrorMessage
          title={strings.title}
          message={strings.message}
          btnText={strings.buttonText}
          onClick={handleClickRefresh}
        />
      </div>
      <DocumentMeta title={strings.headTitle} />
    </div>
  )
}
