import BoxTitle from "../../atoms/BoxTitle"
import { IPermissionItem } from "./interface"
import PermissionItem from "./PermissionItem"

export default function PermissionList({
  title,
  list,
  emptyMessage,
  onDelete
}: {
  title: string
  list: Array<IPermissionItem>
  emptyMessage: string
  onDelete: (id: string) => void
}) {
  return (
    <div>
      <BoxTitle>{title}</BoxTitle>
      <div className="border-t border-primary-50 dark:border-primary-600">
        {list.length === 0 && <p className="py-2 text-sm/7">{emptyMessage}</p>}
        {list.length > 0 && (
          <ul>
            {list.map((item) => (
              <li key={item.id}>
                <PermissionItem item={item} onDelete={onDelete} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
