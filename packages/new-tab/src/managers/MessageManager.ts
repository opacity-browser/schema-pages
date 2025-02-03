import PostMessage from "adapters/PostMessage"
import { isDev } from "../constants"
import { IStrings } from "../interfases/IStrings"
import { IFavorite } from "../interfases/IFavorite"

export default class MessageManager {
  postMessage: PostMessage

  constructor() {
    this.postMessage = new PostMessage()
  }

  getStrings(): Promise<IStrings | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          "Add Favorite": "Add Favorite",
          "Edit Favorite": "Edit Favorite",
          Title: "Title",
          Address: "Address",
          Edit: "Edit",
          Delete: "Delete",
          Save: "Save",
          Cancel: "Cancel"
        })
      )
    }

    return this.postMessage.request<IStrings | "error">(
      "getPageStrings",
      "new-tab"
    )
  }

  goPage(address: string): void {
    if (isDev) {
      return
    }

    this.postMessage.request<"success" | "error">("goPage", address)
  }

  getFavoriteList(): Promise<IFavorite[] | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve([
          {
            id: "a",
            title: "Opacity",
            address: "https://opacity.dev/"
          }
        ])
      )
    }

    return this.postMessage.request<IFavorite[] | "error">("getFavoriteList")
  }

  cratedFavorite(title: string, address: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "cratedFavorite",
      JSON.stringify({
        title,
        address
      })
    )
  }

  updateFavorite(
    id: string,
    title: string,
    address: string
  ): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }
    console.log("B")
    return this.postMessage.request<"success" | "error">(
      "updateFavorite",
      JSON.stringify({
        id,
        title,
        address
      })
    )
  }

  deleteFavorite(favoriteId: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "deleteFavorite",
      favoriteId
    )
  }
}
