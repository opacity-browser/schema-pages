import clsx from "clsx"
import { ILibraryItem } from "./interface"

export default function LibraryItem({ item }: { item: ILibraryItem }) {
  return (
    <div
      className={clsx(
        "w-full text-sm/7 border-b border-primary-50/80 dark:border-primary-600/80 py-2",
        "text-primary dark:text-primary-50"
      )}
    >
      <div className={clsx("flex gap-2 items-center")}>
        <p className={clsx("truncate")}>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="truncate flex min-w-0"
          >
            {item.title}
          </a>
        </p>
        <div className="flex flex-1 min-w-0 max-w-full">
          <p className="truncate min-w-0 text-xs text-primary-200 dark:text-primary-300">
            {item.url}
          </p>
        </div>
      </div>
    </div>
  )
}
