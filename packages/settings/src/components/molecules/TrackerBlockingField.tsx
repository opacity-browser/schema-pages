import { useEffect, useState } from "react"
import MessageManager from "../../managers/MessageManager"
import CheckboxField from "design-system/atoms/CheckboxField"

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
    if (res === "error") return
    setTrackerBlocking(checked)
  }

  const getTrackerBlocking = async () => {
    const res = await messageManager.getTrackerBlocking()
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
