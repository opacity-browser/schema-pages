export interface IGeneralSettingItem {
  id: string
  name: string
}

export interface IGeneralSettings {
  searchEngine: IGeneralSettingItem | null
  theme: IGeneralSettingItem | null
  retentionPeriod: IGeneralSettingItem | null
}

export interface IGeneralSettingList {
  searchEngine: IGeneralSettingItem[]
  theme: IGeneralSettingItem[]
  retentionPeriod: IGeneralSettingItem[]
}