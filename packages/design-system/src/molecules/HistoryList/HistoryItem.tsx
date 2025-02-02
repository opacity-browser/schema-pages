import clsx from "clsx"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { IHistoryItem } from "./interface"

export default function HistoryItem({
  item,
  onDelete
}: {
  item: IHistoryItem
  onDelete: (id: string) => void
}) {
  return (
    <div
      className={clsx(
        "w-full text-sm/7 border-b border-primary-50/80 dark:border-primary-600/80 py-2",
        "text-primary dark:text-primary-50"
      )}
    >
      <div className={clsx("flex gap-4 items-center")}>
        <p className="truncate">{item.createDate}</p>
        <div className="flex flex-1 min-w-0 max-w-full">
          {item.url ? (
            <div className="flex flex-1 min-w-0 gap-2 items-center">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="truncate flex min-w-0"
              >
                <p className="truncate min-w-0">{item.title}</p>
              </a>
              <span className="truncate min-w-0 text-xs text-primary-200 dark:text-primary-300">
                {item.url}
              </span>
            </div>
          ) : (
            <p className="min-w-0 truncate">{item.title}</p>
          )}
        </div>
        <button
          className="cursor-pointer rounded-full p-1 hover:bg-primary-50 dark:hover:bg-primary-600"
          onClick={() => onDelete(item.id)}
        >
          <XMarkIcon className="size-5 text-primary-300 dark:text-primary-200" />
        </button>
      </div>
    </div>
  )
}
