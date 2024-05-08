import { ISearchHistory, IVisitHistory } from "../interfaces/histories"

export const getYearMonth = () => {
  const date = new Date()

  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0")
}

export const getPrevYearMonth = (yearMonth: string) => {
  const year = Number(yearMonth.split("-")[0])
  const month = Number(yearMonth.split("-")[1])

  if(month > 1) {
    return year + "-" + String(month - 1).padStart(2, "0")
  } else {
    return (year - 1) + "-12"
  }
}

export const getDateObj = (stringDate: string) => {
  const yyyymmdd = stringDate.split(" ")[0].split("-")
  const hhmmss = stringDate.split(" ")[1].split(":")

  return new Date(Number(yyyymmdd[0]), Number(yyyymmdd[1]) - 1, Number(yyyymmdd[2]), Number(hhmmss[0]), Number(hhmmss[1]), Number(hhmmss[2]))
}

export const groupByDate = (data: ISearchHistory[] | IVisitHistory[]) => {
  const groupedData = {}

  data.forEach((item: ISearchHistory | IVisitHistory) => {
    const date = item.createDate.split(' ')[0]
    if (!groupedData[date]) groupedData[date] = []
    groupedData[date].push(item)
  })

  const result = Object.keys(groupedData).map(date => ({
    day: date,
    list: groupedData[date]
  }))

  return result
}