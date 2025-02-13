import BoxTitle from "../../atoms/BoxTitle"
import { ILibraryItem } from "./interface"
import LibraryItem from "./LibraryItem"

export default function LibraryList({
  title,
  list
}: {
  title?: string
  list: Array<ILibraryItem>
}) {
  return (
    <div>
      {title && <BoxTitle>{title}</BoxTitle>}
      <div className="border-t border-primary-50 dark:border-primary-600">
        <ul>
          {list.map((item) => (
            <li key={item.title}>
              <LibraryItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
