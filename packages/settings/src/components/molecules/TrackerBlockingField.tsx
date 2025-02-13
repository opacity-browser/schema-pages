import { useEffect, useState } from "react"
import CheckboxField from "design-system/atoms/CheckboxField"
import MessageManager from "../../managers/MessageManager"

export default function TrackerBlockingField({
  label,
  description
}: {
  label: string
  description?: string
}) {
  const messageManager = new MessageManager()

  const [trackerBlocking, setTrackerBlocking] = useState<boolean>(false)

  const handleChange = async (checked: boolean) => {
    const res = await messageManager.updateTrackerBlocking(checked)
    console.log(res)
    if (res === "error") return
    setTrackerBlocking(checked)
  }

  const getTrackerBlocking = async () => {
    const res = await messageManager.getTrackerBlocking()
    console.log(res)
    if (res === "error") return
    setTrackerBlocking(res)
  }

  useEffect(() => {
    getTrackerBlocking()
  }, [])

  return (
    <>
      <CheckboxField
        label={label}
        description={description}
        checked={trackerBlocking}
        onChange={handleChange}
      />
    </>
  )
}
