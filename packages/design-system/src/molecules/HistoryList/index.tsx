import { IHistoryItem } from "./interface"
import HistoryItem from "./HistoryItem"
import BoxTitle from "../../atoms/BoxTitle"

export default function HistoryList({
  title,
  list,
  onDelete
}: {
  title: string
  list: Array<IHistoryItem>
  onDelete: (id: string) => void
}) {
  return (
    <div>
      <BoxTitle>{title}</BoxTitle>
      <div className="border-t border-primary-50 dark:border-primary-400">
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              <HistoryItem item={item} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
