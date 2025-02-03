import { useEffect, useState } from "react"
import ShortCutList from "design-system/molecules/ShortCutList"
import { IFavorite } from "../../interfases/IFavorite"
import { IStrings } from "../../interfases/IStrings"
import MessageManager from "../../managers/MessageManager"

export default function Shortcut({
  i18n,
  className
}: {
  i18n: IStrings
  className?: string
}) {
  const messageManager = new MessageManager()
  const [favorites, setFavorites] = useState<IFavorite[]>([])

  const getFavoriteList = async () => {
    const res = await messageManager.getFavoriteList()
    if (res === "error") return

    setFavorites(res)
  }

  useEffect(() => {
    getFavoriteList()
  }, [])

  const handleAddFavorite = async (name: string, address: string) => {
    await messageManager.cratedFavorite(name, address)
    getFavoriteList()
  }

  const handleEditFavorite = async (
    id: string,
    name: string,
    address: string
  ) => {
    console.log("A")
    await messageManager.updateFavorite(id, name, address)
    console.log("C")
    getFavoriteList()
  }

  const handleDeleteFavorite = async (id: string) => {
    await messageManager.deleteFavorite(id)
    getFavoriteList()
  }

  return (
    <ShortCutList
      length={6}
      list={favorites}
      onCreate={handleAddFavorite}
      onUpdate={handleEditFavorite}
      onDelete={handleDeleteFavorite}
      i18n={i18n}
      {...{ className }}
    />
  )
}
