import BoxTitle from "../../atoms/BoxTitle"
import { IPermissionItem } from "./interface"
import PermissionItem from "./PermissionItem"

export default function PermissionList({
  title,
  list,
  onDelete
}: {
  title: string
  list: Array<IPermissionItem>
  onDelete: (id: string) => void
}) {
  return (
    <div>
      <BoxTitle>{title}</BoxTitle>
      <div className="border-t border-primary-50 dark:border-primary-300">
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              <PermissionItem item={item} onDelete={onDelete} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
