export interface ISearchHistoriesDTO {
  firstDate: string,
  list: ISearchHistories[]
}

export interface ISearchHistories {
  id: string
  searchText: string
  createDate: string
}