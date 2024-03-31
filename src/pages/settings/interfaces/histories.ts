export interface ISearchHistoriesDTO {
  firstDate: string,
  list: ISearchHistory[]
}

export interface ISearchHistory {
  id: string
  searchText: string
  createDate: string
}

export interface IVisitHistoriesDTO {
  firstDate: string,
  list: IVisitHistory[]
}

export interface IVisitHistory {
  id: string
  title: string
  url: string
  createDate: string
}