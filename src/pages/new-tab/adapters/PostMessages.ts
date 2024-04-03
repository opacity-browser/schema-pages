import PostMessageManager from '../../../managers/PostMessageManager'
import { IFavorite } from '../interfaces/favorite'
import { IStringData } from '../interfaces/localizable'

class PostMessages {
  postMessage: PostMessageManager

  constructor() {
    this.postMessage = new PostMessageManager()
  }

  async getNewTabPageStrings() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IStringData | "error">("getPageStrings", "new-tab")
    } else {
      return "error"
    }
  }

  async goPage(address: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("goPage", address)
    } else {
      return "success"
    }
  }

  async getFavoriteList() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IFavorite[] | "error">("getFavoriteList")
    } else {
      return [{
        id: "a",
        title: "Opacity",
        address: "https://opacity.dev/"
      }]
    }
  }

  async addFavorite(title: string, address: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("addFavorite", JSON.stringify({
        title, address
      }))
    } else {
      return "success"
    }
  }

  async deleteFavorite(favoriteId: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteFavorite", favoriteId)
    } else {
      return "success"
    }
  }

  async getFrequentList() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IFavorite[] | "error">("getFrequentList")
    } else {
      return [{
        id: "a",
        title: "Opacity",
        address: "https://opacity.dev/"
      }]
    }
  }
}

export default new PostMessages()