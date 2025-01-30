import clsx from "clsx"
import { ILibraryItem } from "./interface"

export default function LibraryItem({ item }: { item: ILibraryItem }) {
  return (
    <div className="w-full text-sm border-b border-gray-200 py-4">
      <div className={clsx("flex gap-5 items-center")}>
        <p className={clsx("truncate start-2")}>{item.title}</p>
        <div className="flex flex-1 min-w-0 max-w-full">
          <div className="flex flex-1 min-w-0 gap-1 items-center">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="truncate flex min-w-0"
            >
              <p className="truncate min-w-0">{item.url}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
