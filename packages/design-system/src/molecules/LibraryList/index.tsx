import { ILibraryItem } from "./interface"
import LibraryItem from "./LibraryItem"

export default function LibraryList({
  title,
  list
}: {
  title: string
  list: Array<ILibraryItem>
}) {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="border-t border-gray-200">
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
