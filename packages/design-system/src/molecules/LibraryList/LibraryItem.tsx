import clsx from "clsx"
import { ILibraryItem } from "./interface"

export default function LibraryItem({ item }: { item: ILibraryItem }) {
  return (
    <div
      className={clsx(
        "w-full text-sm border-b border-primary-200 dark:border-primary-300 py-4",
        "text-primary dark:text-primary-50"
      )}
    >
      <div className={clsx("flex gap-2 items-center")}>
        <p className={clsx("truncate")}>{item.title}</p>
        <div className="flex flex-1 min-w-0 max-w-full">
          <div className="flex flex-1 min-w-0 gap-1 items-center">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="truncate flex min-w-0 text-primary-200 hover:text-primary-400"
            >
              <p className="truncate min-w-0">{item.url}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
