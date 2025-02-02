import { Ii18n } from "./interface"
import ShortCutDropdown from "./ShortCutDropdown"

export default function ShortCutItem({
  id,
  title,
  address,
  i,
  handleClickDropdown,
  i18n
}: {
  id: string
  title: string
  address: string
  i: number
  handleClickDropdown: (id: string, type: string) => void
  i18n: Ii18n
}) {
  return (
    <div className="relative size-28 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg cursor-pointer flex items-center justify-center group dark:bg-primary-800 dark:hover:bg-primary-900">
      <a
        className="absolute w-full h-full z-10"
        href={address}
        draggable={false}
        aria-label={title}
      >
        &nbsp;
      </a>
      <div className="relative p-2 pt-4 flex flex-col items-center text-center w-full">
        <div
          className={`rounded-full size-8 text-onPrimary flex items-center justify-center uppercase font-bold text-sm mb-3 bg-primary-700 dark:bg-primary-50 dark:text-primary-700 pt-0.5`}
        >
          {title.substring(0, 1)}
        </div>
        <p className="text-sm w-full px-2 truncate dark:text-white">{title}</p>
      </div>
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity group-hover:delay-300 z-20 rounded-full hover:bg-gray-300 dark:hover:bg-primary-700 p-1 size-7 flex items-center justify-center">
        <ShortCutDropdown
          onClick={(type) => handleClickDropdown(id, type)}
          i18n={i18n}
        />
      </div>
    </div>
  )
}
