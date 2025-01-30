import { IHistoryItem } from "./interface"
import HistoryItem from "./HistoryItem"

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
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="border-t border-gray-200">
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
