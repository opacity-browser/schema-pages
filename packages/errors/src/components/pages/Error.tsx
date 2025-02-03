import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import clsx from "clsx"
import ErrorMessage from "design-system/atoms/ErrorMessage"
import { IStrings } from "../../interfases/IStrings"
import MessageManager from "../../managers/MessageManager"

export default function Error() {
  const { search } = useLocation()
  const messageManager = new MessageManager()
  const searchParams = new URLSearchParams(search)
  const errorType = searchParams.get("type")

  const [isInit, setIsInit] = useState(false)
  const [strings, setStrings] = useState<IStrings>({
    title: "Unknown error",
    message: "An unknown error occurred.",
    buttonText: "Refresh"
  })

  const getStrings = async (errorType: string) => {
    const strings = await messageManager.getStrings(errorType)
    if (strings === "error") {
      setIsInit(true)
      return
    }
    setStrings(strings)
    setIsInit(true)
  }

  const handleClickRefresh = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (errorType) getStrings(errorType)
  }, [])

  return (
    <div
      className={clsx(
        "w-full h-full flex justify-start items-center flex-col",
        isInit ? "" : "hidden"
      )}
    >
      <div className="mt-[16vh] min-h-72">
        <ErrorMessage
          title={strings.title}
          message={strings.message}
          btnText={strings.buttonText}
          onClick={handleClickRefresh}
        />
      </div>
    </div>
  )
}
