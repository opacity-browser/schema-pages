import { useEffect, useState } from "react"
import clsx from "clsx"
import HistoryList from "design-system/molecules/HistoryList"
import { IHistoryItem } from "design-system/molecules/HistoryList/interface"
import BaseLayout from "../templatets/BaseLayout"
import useStrings from "../../hooks/useStrings"
import MessageManager from "../../managers/MessageManager"
import {
  getDateObj,
  getPrevYearMonth,
  getYearMonth
} from "../../helpers/dateParser"
import Button from "design-system/atoms/Button"
import CancelButton from "design-system/atoms/CancelButton"

export default function VisitHistory() {
  const messageManager = new MessageManager()
  const { strings, getStrings } = useStrings()

  const [firstYearMonth, setFirstYearMonth] = useState("")
  const [yearMonth, setYearMonth] = useState(getYearMonth())
  const [visitHistories, setVisitHistories] = useState<
    Array<{
      yearMonth: string
      list: IHistoryItem[]
    }>
  >([])

  const getVisitHistories = async (isReset: boolean = false) => {
    const res = await messageManager.getVisitHistory(yearMonth)
    if (res === "error") return

    setFirstYearMonth(res.firstDate)
    res.list.sort(
      (a, b) =>
        getDateObj(b.createDate).getTime() - getDateObj(a.createDate).getTime()
    )
    const newVisitHistories: Array<{
      yearMonth: string
      list: IHistoryItem[]
    }> = isReset
      ? [
          {
            yearMonth: yearMonth,
            list: res.list
          }
        ]
      : [
          ...visitHistories,
          {
            yearMonth: yearMonth,
            list: res.list
          }
        ]

    setVisitHistories(newVisitHistories)
  }

  useEffect(() => {
    getVisitHistories()
  }, [yearMonth])

  useEffect(() => {
    getStrings()
  }, [])

  const handleClickMoreBtn = () => {
    setYearMonth(getPrevYearMonth(yearMonth))
  }

  const handleClickClearAllBtn = async () => {
    const res = await messageManager.deleteAllVisitHistory()
    if (res === "error") return
    getVisitHistories(true)
  }

  const handleClickDeleteBtn = async (id: string) => {
    const res = await messageManager.deleteVisitHistory(id)
    if (res === "error") return
    const newVisitHistories = visitHistories.map((d) => {
      return {
        ...d,
        list: d.list.filter((item: IHistoryItem) => {
          return item.id !== id
        })
      }
    })
    setVisitHistories(newVisitHistories)
  }

  return (
    <BaseLayout strings={strings}>
      <div className={clsx("max-w-6xl mx-auto px-8 pt-6 pb-12")}>
        <h2 className="text-xl/8 mb-6 flex items-center justify-between">
          {strings["Visit History"]}
          <CancelButton onClick={handleClickClearAllBtn} size="medium">
            {strings["Clear All"]}
          </CancelButton>
        </h2>
        <div className="border-t border-gray-200 pt-6">
          {visitHistories.map((visitHistory) => (
            <div className="mb-6" key={visitHistory.yearMonth}>
              <HistoryList
                title={visitHistory.yearMonth}
                list={visitHistory.list}
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
