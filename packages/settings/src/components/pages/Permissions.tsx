import { useEffect, useState } from "react"
import clsx from "clsx"
import { IPermissionItem } from "design-system/molecules/PermissionList/interface"
import PermissionList from "design-system/molecules/PermissionList"
import useStrings from "../../hooks/useStrings"
import MessageManager from "../../managers/MessageManager"
import BaseLayout from "../templatets/BaseLayout"

export default function Permissions() {
  const messageManager = new MessageManager()
  const { strings, getStrings } = useStrings()

  const [locationPermissions, setLocationPermissions] = useState<
    IPermissionItem[]
  >([])
  const [notificationPermissions, setNotificationPermissions] = useState<
    IPermissionItem[]
  >([])

  const getLocationPermissions = async () => {
    const res = await messageManager.getLocationPermissions()
    if (res === "error") return
    setLocationPermissions(res)
  }

  const getNotificationPermissions = async () => {
    const res = await messageManager.getNotificationPermissions()
    if (res === "error") return
    setNotificationPermissions(res)
  }

  useEffect(() => {
    getStrings()
    getLocationPermissions()
    getNotificationPermissions()
  }, [])

  const handleClickDeletePermissions = async (id: string) => {
    const res = await messageManager.deletePermissions(id)
    if (res === "error") return
    getLocationPermissions()
    getNotificationPermissions()
  }

  return (
    <BaseLayout strings={strings}>
      <div className={clsx("max-w-6xl mx-auto px-8 pt-6 pb-12")}>
        <h2 className="text-xl/8 mb-6 flex items-center">
          {strings["Permissions"]}
        </h2>
        <div className="border-t border-gray-200 pt-6">
          <div className="mb-6">
            <PermissionList
              title={strings["Notification"]}
              list={notificationPermissions}
              onDelete={handleClickDeletePermissions}
            />
          </div>
          <div className="mb-6">
            <PermissionList
              title={strings["Location"]}
              list={locationPermissions}
              onDelete={handleClickDeletePermissions}
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
