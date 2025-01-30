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
    <div className="w-full text-sm border-b border-gray-200 py-4">
      <div className={clsx("flex gap-5 items-center")}>
        <p className="truncate start-2">{item.createDate}</p>
        <p
          className={clsx(
            "truncate start-2",
            item.isDenied ? "text-red-400" : "text-green-400"
          )}
        >
          {item.isDenied ? "denied" : "allowed"}
        </p>
        <div className="flex flex-1 min-w-0 max-w-full">
          <div className="flex flex-1 min-w-0 gap-1 items-center">
            <a
              href={item.domain}
              target="_blank"
              rel="noreferrer"
              className="truncate flex min-w-0"
            >
              <p className="truncate min-w-0">{item.domain}</p>
            </a>
          </div>
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
