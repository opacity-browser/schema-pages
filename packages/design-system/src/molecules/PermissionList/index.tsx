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
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="border-t border-gray-200">
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
