import { useEffect, useState } from "react"
import clsx from "clsx"
import HistoryList from "design-system/molecules/HistoryList"
import { IHistoryItem } from "design-system/molecules/HistoryList/interface"
import Button from "design-system/atoms/Button"
import CancelButton from "design-system/atoms/CancelButton"
import BaseLayout from "../templatets/BaseLayout"
import useStrings from "../../hooks/useStrings"
import MessageManager from "../../managers/MessageManager"
import {
  getDateObj,
  getPrevYearMonth,
  getYearMonth
} from "../../helpers/dateParser"

export default function SearchHistory() {
  const messageManager = new MessageManager()
  const { strings, getStrings } = useStrings()

  const [firstYearMonth, setFirstYearMonth] = useState("")
  const [yearMonth, setYearMonth] = useState(getYearMonth())
  const [searchHistories, setSearchHistories] = useState<
    Array<{
      yearMonth: string
      list: IHistoryItem[]
    }>
  >([])

  const getSearchHistories = async () => {
    const res = await messageManager.getSearchHistory(yearMonth)
    if (res === "error") return

    setFirstYearMonth(res.firstDate)
    res.list.sort(
      (a, b) =>
        getDateObj(b.createDate).getTime() - getDateObj(a.createDate).getTime()
    )

    const newSearchHistories: Array<{
      yearMonth: string
      list: IHistoryItem[]
    }> = [
      ...searchHistories,
      {
        yearMonth,
        list: res.list
      }
    ]

    setSearchHistories(newSearchHistories)
  }

  useEffect(() => {
    getSearchHistories()
  }, [yearMonth])

  useEffect(() => {
    getStrings()
  }, [])

  const handleClickMoreBtn = () => {
    setYearMonth(getPrevYearMonth(yearMonth))
  }

  const handleClickClearAllBtn = async () => {
    const res = await messageManager.deleteAllSearchHistory()
    if (res === "error") return

    const nowYearMonth = getYearMonth()
    setYearMonth(nowYearMonth)
    setFirstYearMonth("")
    setSearchHistories([
      {
        yearMonth: nowYearMonth,
        list: []
      }
    ])
  }

  const handleClickDeleteBtn = async (id: string) => {
    const res = await messageManager.deleteSearchHistory(id)
    if (res === "error") return
    const newSearchHistories = searchHistories.map((d) => {
      return {
        ...d,
        list: d.list.filter((item: IHistoryItem) => {
          return item.id !== id
        })
      }
    })
    setSearchHistories(newSearchHistories)
  }

  return (
    <BaseLayout strings={strings}>
      <div className={clsx("max-w-6xl mx-auto px-8 pt-6 pb-12")}>
        <h2 className="text-xl/8 mb-6 flex items-center justify-between">
          {strings["Search History"]}
          <CancelButton onClick={handleClickClearAllBtn} size="medium">
            {strings["Clear All"]}
          </CancelButton>
        </h2>
        <div className="border-t border-gray-200 dark:border-primary-600 pt-6">
          {searchHistories.map((searchHistory) => (
            <div className="mb-6" key={searchHistory.yearMonth}>
              <HistoryList
                title={searchHistory.yearMonth}
                list={searchHistory.list}
                emptyMessage={strings["There is no search history."]}
                onDelete={handleClickDeleteBtn}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          {firstYearMonth !== "" && firstYearMonth !== yearMonth && (
            <Button onClick={handleClickMoreBtn}>{strings["Show More"]}</Button>
          )}
        </div>
      </div>
    </BaseLayout>
  )
}
