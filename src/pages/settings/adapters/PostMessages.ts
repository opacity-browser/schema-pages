import PostMessageManager from '../../../managers/PostMessageManager'
import { IGeneralSettingList, IGeneralSettings } from '../interfaces/general'
import { ISearchHistoriesDTO, IVisitHistoriesDTO } from '../interfaces/histories'
import { IStringData } from '../interfaces/localizable'
import { INotificationPermission } from '../interfaces/permissions'

class PostMessages {
  postMessage: PostMessageManager

  constructor() {
    this.postMessage = new PostMessageManager()
  }

  async getSettingsPageStrings() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IStringData | "error">("getPageStrings", "settings")
    } else {
      return "error"
    }
  }

  async updateNotificationPermissions(permissionId: string, isDenied: boolean) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("updateNotificationPermissions", JSON.stringify({
        id: permissionId,
        isDenied: isDenied
      }))
    } else {
      return "success"
    }
  }

  async deleteNotificationPermissions(permissionIds: string[]) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteNotificationPermissions", JSON.stringify(permissionIds))
    } else {
      return "success"
    }
  }

  async getNotificationPermisions() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<INotificationPermission[] | "error">("getNotificationPermisions")
    } else {
      return [{
        id: "a",
        domain: "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
        permission: 1,
        isDenied: false
      }]
    }
  }

  async deleteVisitHistory(historyIds: string[]) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteVisitHistory", JSON.stringify(historyIds))
    } else {
      return "success"
    }
  }

  async deleteAllVisitHistory() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteAllVisitHistory")
    } else {
      return "success"
    }
  }

  async getVisitHistoryList(yearMonth: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IVisitHistoriesDTO | "error">("getVisitHistoryList", yearMonth)
    } else {
      return {
        firstDate: "2024-03",
        list: [{
          id: "a",
          title: "Opacity Opacity Opacity Opacity Opacity Opacity Opacity Opacity Opacity",
          url: "https://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.devhttps://opacity.dev",
          createDate: "2024-03-01 12:00:00"          
        }, {
          id: "b",
          title: "Opacity",
          url: "https://opacity.dev",
          createDate: "2024-03-01 12:00:00"          
        }, {
          id: "c",
          title: "Opacity2",
          url: "https://opacity.dev",
          createDate: "2024-03-02 12:00:00"          
        }, {
          id: "d",
          title: "Opacity3",
          url: "https://opacity.dev",
          createDate: "2024-03-02 12:00:00"          
        }]
      }
    }
  }

  async deleteSearchHistory(historyIds: string[]) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteSearchHistory", JSON.stringify(historyIds))
    } else {
      return "success"
    }
  }

  async deleteAllSearchHistory() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteAllSearchHistory")
    } else {
      return "success"
    }
  }

  async getSearchHistoryList(yearMonth: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<ISearchHistoriesDTO | "error">("getSearchHistoryList", yearMonth)
    } else {
      return {
        firstDate: "2024-03",
        list: [{
          id: "a",
          searchText: "keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword keyword",
          createDate: "2024-03-01 12:00:00"          
        }, {
          id: "b",
          searchText: "keyword",
          createDate: "2024-03-01 12:00:00"          
        }, {
          id: "c",
          searchText: "keyword keyword ",
          createDate: "2024-03-03 12:00:00"          
        }]
      }
    }
  }

  async setRetentionPeriod(periodId: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("setRetentionPeriod", periodId)
    } else {
      return "success"
    }
  }

  async setScreenMode(screenModeId: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("setScreenMode", screenModeId)
    } else {
      return "success"
    }
  }

  async setSearchEngine(searchEngineId: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("setSearchEngine", searchEngineId)
    } else {
      return "success"
    }
  }

  async setBlockingTracker(blcokingLevelId: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("setBlockingTracker", blcokingLevelId)
    } else {
      return "success"
    }
  }

  async getGeneralSettings() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IGeneralSettings | "error">("getGeneralSettings")
    } else {
      return {
        searchEngine: {
          id: "Google",
          name: "Google"
        },
        screenMode: {
          id: "System",
          name: "System"
        },
        retentionPeriod: {
          id: "1 Week",
          name: "1 Week"
        },
        blockingLevel: {
          id: "blocking-moderate",
          name: "blocking-moderate"
        }
      }
    }
  }

  async getGeneralSettingList() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IGeneralSettingList | "error">("getGeneralSettingList")
    } else {
      return {
        searchEngine: [{ 
          id: 'Google',
          name: 'Google' 
        }, { 
          id: 'Bing',
          name: 'Bing' 
        }, { 
          id: 'Yahoo',
          name: 'Yahoo' 
        }, { 
          id: 'DuckDuckGo',
          name: 'DuckDuckGo' 
        }],
        screenMode: [{ 
          id: 'System',
          name: 'System' 
        }, { 
          id: 'Light',
          name: 'Light' 
        }, { 
          id: 'Dark',
          name: 'Dark' 
        }],
        retentionPeriod: [{ 
          id: '1 Week',
          name: '1 Week' 
        }, { 
          id: '1 Month',
          name: '1 Month' 
        }, { 
          id: 'Indefinite',
          name: 'Indefinite' 
        }],
        blockingLevel: [{
          id: "blocking-strong",
          name: "blocking-strong"
        }, {
          id: "blocking-moderate",
          name: "blocking-moderate"
        }, {
          id: "blocking-light",
          name: "blocking-light"
        }, {
          id: "blocking-none",
          name: "blocking-none"
        }]
      }
    }
  }

}

export default new PostMessages()