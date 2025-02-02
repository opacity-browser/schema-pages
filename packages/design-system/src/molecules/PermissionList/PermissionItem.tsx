import clsx from "clsx"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { IPermissionItem } from "./interface"

export default function PermissionItem({
  item,
  onDelete
}: {
  item: IPermissionItem
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
        <p
          className={clsx(
            "truncate",
            item.isDenied ? "text-red-300" : "text-green-300"
          )}
        >
          {item.isDenied ? "denied" : "allowed"}
        </p>
        <div className="flex flex-1 min-w-0 max-w-full items-center">
          <a
            href={item.domain}
            target="_blank"
            rel="noreferrer"
            className="truncate flex min-w-0"
          >
            <p className="truncate min-w-0">{item.domain}</p>
          </a>
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
