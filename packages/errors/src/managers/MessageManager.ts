import PostMessage from "adapters/PostMessage"
import { IStrings } from "../interfases/IStrings"

export default class MessageManager {
  postMessage: PostMessage

  constructor() {
    this.postMessage = new PostMessage()
  }

  getStrings(type: string): Promise<IStrings> {
    if (!(window as any)?.webkit?.messageHandlers?.opacityBrowser) {
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

    return this.postMessage.request<IStrings>("getPageStrings", type)
  }

  replacePage(url: string): void {
    if (!(window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return
    }

    this.postMessage.request("replacePage", url)
  }
}
