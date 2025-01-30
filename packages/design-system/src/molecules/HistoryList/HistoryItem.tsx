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
    <div className="w-full text-sm border-b border-gray-200 py-4">
      <div className={clsx("flex gap-5 items-center")}>
        <p className="truncate start-2">{item.createDate}</p>
        <div className="flex flex-1 min-w-0 max-w-full">
          {item.url ? (
            <div className="flex flex-1 min-w-0 gap-1 items-center">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="truncate flex min-w-0"
              >
                <p className="truncate min-w-0">{item.title}</p>
              </a>
              <span className="truncate min-w-0 text-xs text-primary-200">
                {item.url}
              </span>
            </div>
          ) : (
            item.title
          )}
        </div>
        <button
          className="cursor-pointer rounded-full p-1 hover:bg-gray-200"
          onClick={() => onDelete(item.id)}
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}
