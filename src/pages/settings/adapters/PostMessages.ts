import PostMessageManager from '../../../managers/PostMessageManager'
import { IGeneralSettingList, IGeneralSettings } from '../interfaces/general'
import { ISearchHistoriesDTO } from '../interfaces/searchHistories'

class PostMessages {
  postMessage: PostMessageManager

  constructor() {
    this.postMessage = new PostMessageManager()
  }

  async deleteSearchHistory(historyIds: string[]) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("deleteSearchHistory", JSON.stringify(historyIds))
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
          searchText: "keyword",
          createDate: "2024-03-01 12:00:00"          
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

  async setBrowserTheme(themeId: string) {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<"success" | "error">("setBrowserTheme", themeId)
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

  async getGeneralSettings() {
    if((window as any)?.webkit?.messageHandlers?.opacityBrowser) {
      return await this.postMessage.request<IGeneralSettings | "error">("getGeneralSettings")
    } else {
      return {
        searchEngine: {
          id: "Google",
          name: "Google"
        },
        theme: {
          id: "System",
          name: "System"
        },
        retentionPeriod: {
          id: "1 Week",
          name: "1 Week"
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
        theme: [{ 
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
        }]
      }
    }
  }

}

export default new PostMessages()