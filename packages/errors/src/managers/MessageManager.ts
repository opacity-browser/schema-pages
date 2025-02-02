import PostMessage from "adapters/PostMessage"
import { IStrings } from "../interfases/IStrings"
import { isDev } from "../constants"

export default class MessageManager {
  postMessage: PostMessage

  constructor() {
    this.postMessage = new PostMessage()
  }

  getStrings(type: string): Promise<IStrings | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          lang: "en",
          headTitle: "Unknown error",
          title: "Unknown error",
          message: "An unknown error occurred.",
          buttonText: "Refresh"
        })
      )
    }

    return this.postMessage.request<IStrings | "error">("getPageStrings", type)
  }

  replacePage(url: string): void {
    if (isDev) {
      return
    }

    this.postMessage.request("replacePage", url)
  }
}
