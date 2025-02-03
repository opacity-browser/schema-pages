import { format, parse } from "date-fns"
import { IHistoryItem } from "./interface"
import HistoryItem from "./HistoryItem"
import BoxTitle from "../../atoms/BoxTitle"

export default function HistoryList({
  title,
  list,
  emptyMessage,
  onDelete
}: {
  title: string
  list: Array<IHistoryItem>
  emptyMessage: string
  onDelete: (id: string) => void
}) {
  const date = parse(title, "yyyy-MM", new Date())
  const formattedDate = format(date, "MMM yyyy")

  return (
    <div>
      <BoxTitle>{formattedDate}</BoxTitle>
      <div className="border-t border-primary-50 dark:border-primary-600">
        {list.length === 0 && <p className="py-2 text-sm/7">{emptyMessage}</p>}
        {list.length > 0 && (
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <HistoryItem item={item} onDelete={onDelete} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
