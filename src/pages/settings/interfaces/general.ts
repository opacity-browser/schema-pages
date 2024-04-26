export interface IGeneralSettingItem {
  id: string
  name: string
}

export interface IGeneralSettings {
  searchEngine: IGeneralSettingItem | null
  screenMode: IGeneralSettingItem | null
  retentionPeriod: IGeneralSettingItem | null
  blockingLevel: IGeneralSettingItem | null
}

export interface IGeneralSettingList {
  searchEngine: IGeneralSettingItem[]
  screenMode: IGeneralSettingItem[]
  retentionPeriod: IGeneralSettingItem[]
  blockingLevel: IGeneralSettingItem[]
}