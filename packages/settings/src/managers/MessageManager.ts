import PostMessage from "adapters/PostMessage"
import { isDev } from "../constants"
import { IStrings } from "../interfases/IStrings"
import { IHistoryItem } from "design-system/molecules/HistoryList/interface"
import { IPermissionItem } from "design-system/molecules/PermissionList/interface"
import {
  getLanguageName,
  LanguageCode,
  LanguageName
} from "../helpers/language"

export default class MessageManager {
  postMessage: PostMessage

  constructor() {
    this.postMessage = new PostMessage()
  }

  getStrings(): Promise<IStrings | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          lang: "en",
          Settings: "Settings",
          General: "General",
          "Search History": "Search History",
          "Visit History": "Visit History",
          Permissions: "Permissions",
          Language: "Language",
          "Search Engine": "Search Engine",
          "Screen Mode": "Screen Mode",
          "Retention Period": "Retention Period",
          "Show More": "Show More",
          Delete: "Delete",
          Cancel: "Cancel",
          Notification: "Notification",
          Location: "Location",
          allowed: "allowed",
          denied: "denied",
          "There is no domain with permissions set.":
            "There is no domain with permissions set.",
          "There is no search history.": "There is no search history.",
          "There is no visit history.": "There is no visit history.",
          "Tracker Blocking": "Tracker Blocking",
          "Learn More": "Learn More",
          "Clear All": "Clear All",
          Library: "Library",
          version: "1.0.10",
          Korean: "Korean",
          English: "English",
          German: "German",
          Spanish: "Spanish",
          Japanese: "Japanese",
          Chinese: "Chinese",
          French: "French",
          Hindi: "Hindi",
          Norwegian: "Norwegian",
          "Blocks unnecessary ads and trackers using DuckDuckGo’s tracking protection list along with additional rules.":
            "Blocks unnecessary ads and trackers using DuckDuckGo’s tracking protection list along with additional rules.",
          "The changes will take effect after restarting the app.":
            "The changes will take effect after restarting the app."
        })
      )
    }

    return this.postMessage.request<IStrings | "error">(
      "getPageStrings",
      "settings"
    )
  }

  updateLanguage(languageCode: LanguageCode): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "updateLanguage",
      languageCode
    )
  }

  async getLanguage(): Promise<{ id: string; name: string } | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          id: "en",
          name: "English"
        })
      )
    }

    const langCode = await this.postMessage.request<LanguageCode>("getLanguage")
    return {
      id: langCode,
      name: getLanguageName(langCode)
    }
  }

  getLanguageList(): LanguageName[] {
    return [
      "English",
      "Norwegian",
      "Hindi",
      "Korean",
      "Chinese",
      "German",
      "Japanese",
      "Spanish",
      "French"
    ]
  }

  getScreenMode(): Promise<{ id: string; name: string } | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          id: "Light",
          name: "Light"
        })
      )
    }

    return this.postMessage.request<{ id: string; name: string } | "error">(
      "getScreenMode"
    )
  }

  getScreenModeList(): Promise<Array<{ id: string; name: string }> | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve([
          {
            id: "System",
            name: "System"
          },
          {
            id: "Light",
            name: "Light"
          },
          {
            id: "Dark",
            name: "Dark"
          }
        ])
      )
    }

    return this.postMessage.request<
      Array<{ id: string; name: string }> | "error"
    >("getScreenModeList")
  }

  updateScreenMode(screenMode: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "updateScreenMode",
      screenMode
    )
  }

  getSearchEngine(): Promise<{ id: string; name: string } | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          id: "Google",
          name: "Google"
        })
      )
    }

    return this.postMessage.request<{ id: string; name: string } | "error">(
      "getSearchEngine"
    )
  }

  getSearchEngineList(): Promise<
    Array<{ id: string; name: string }> | "error"
  > {
    if (isDev) {
      return new Promise((resolve) =>
        resolve([
          {
            id: "Google",
            name: "Google"
          },
          {
            id: "Bing",
            name: "Bing"
          },
          {
            id: "Yahoo",
            name: "Yahoo"
          },
          {
            id: "DuckDuckGo",
            name: "DuckDuckGo"
          }
        ])
      )
    }

    return this.postMessage.request<
      Array<{ id: string; name: string }> | "error"
    >("getSearchEngineList")
  }

  updateSearchEngine(searchEngine: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "updateSearchEngine",
      searchEngine
    )
  }

  getRetentionPeriod(): Promise<{ id: string; name: string } | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          id: "1 Week",
          name: "1 Week"
        })
      )
    }

    return this.postMessage.request<{ id: string; name: string } | "error">(
      "getRetentionPeriod"
    )
  }

  getRetentionPeriodList(): Promise<
    Array<{ id: string; name: string }> | "error"
  > {
    if (isDev) {
      return new Promise((resolve) =>
        resolve([
          {
            id: "1 Week",
            name: "1 Week"
          },
          {
            id: "1 Month",
            name: "1 Month"
          },
          {
            id: "Indefinite",
            name: "Indefinite"
          }
        ])
      )
    }

    return this.postMessage.request<
      Array<{ id: string; name: string }> | "error"
    >("getRetentionPeriodList")
  }

  updateRetentionPeriod(retentionPeriod: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "updateRetentionPeriod",
      retentionPeriod
    )
  }

  getTrackerBlocking(): Promise<boolean | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve(true))
    }

    return this.postMessage.request<boolean | "error">("getTrackerBlocking")
  }

  updateTrackerBlocking(isBlocking: boolean): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "updateTrackerBlocking",
      isBlocking.toString()
    )
  }

  getSearchHistoryList(
    yearMonth: string
  ): Promise<{ firstDate: string; list: IHistoryItem[] } | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          firstDate: "2024-03",
          list: [
            // {
            //   id: "a",
            //   title:
            //     "keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword",
            //   createDate: "2024-03-01 12:00:00"
            // },
            // {
            //   id: "b",
            //   title: "keyword",
            //   createDate: "2024-03-01 12:00:00"
            // },
            // {
            //   id: "c",
            //   title: "keyword keyword ",
            //   createDate: "2024-03-03 12:00:00"
            // }
          ]
        })
      )
    }

    return this.postMessage.request<
      { firstDate: string; list: IHistoryItem[] } | "error"
    >("getSearchHistoryList", yearMonth)
  }

  deleteSearchHistory(id: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "deleteSearchHistory",
      id
    )
  }

  deleteAllSearchHistory(): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "deleteAllSearchHistory"
    )
  }

  getVisitHistoryList(
    yearMonth: string
  ): Promise<{ firstDate: string; list: IHistoryItem[] } | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve({
          firstDate: "2024-03",
          list: [
            {
              id: "a",
              title:
                "Opacity Opacity Opacity Opacity Opacity Opacity Opacity Opacity Opacity",
              url: "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
              createDate: "2024-03-01 12:00:00"
            },
            {
              id: "b",
              title: "Opacity",
              url: "https://opacity.dev",
              createDate: "2024-03-01 12:00:00"
            },
            {
              id: "c",
              title: "Opacity2",
              url: "https://opacity.dev",
              createDate: "2024-03-02 12:00:00"
            },
            {
              id: "d",
              title: "Opacity3",
              url: "https://opacity.dev",
              createDate: "2024-03-02 12:00:00"
            }
          ]
        })
      )
    }

    return this.postMessage.request<
      { firstDate: string; list: IHistoryItem[] } | "error"
    >("getVisitHistoryList", yearMonth)
  }

  deleteVisitHistory(id: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "deleteVisitHistory",
      id
    )
  }

  deleteAllVisitHistory(): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "deleteAllVisitHistory"
    )
  }

  deletePermissions(id: string): Promise<"success" | "error"> {
    if (isDev) {
      return new Promise((resolve) => resolve("success"))
    }

    return this.postMessage.request<"success" | "error">(
      "deletePermissions",
      id
    )
  }

  getLocationPermissions(): Promise<IPermissionItem[] | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve([
          // {
          //   id: "b",
          //   domain:
          //     "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
          //   permission: 2,
          //   isDenied: true
          // }
        ])
      )
    }

    return this.postMessage.request<IPermissionItem[] | "error">(
      "getLocationPermissions"
    )
  }

  getNotificationPermissions(): Promise<IPermissionItem[] | "error"> {
    if (isDev) {
      return new Promise((resolve) =>
        resolve([
          {
            id: "a",
            domain:
              "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
            permission: 1,
            isDenied: false
          }
        ])
      )
    }

    return this.postMessage.request<IPermissionItem[] | "error">(
      "getNotificationPermissions"
    )
  }
}
