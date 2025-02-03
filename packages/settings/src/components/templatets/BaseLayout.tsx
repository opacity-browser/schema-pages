import { ReactNode } from "react"
import clsx from "clsx"
import { IStrings } from "../../interfases/IStrings"
import Sidebar from "../organisms/Sidebar"

export default function BaseLayout({
  strings,
  children
}: {
  strings: IStrings
  children: ReactNode
}) {
  return (
    <div className={clsx("w-full h-full min-w-[768px]")}>
      <div className="fixed w-64 h-full border-r border-gray-200 dark:border-primary-600 bg-background dark:bg-background-dark z-10 overflow-auto">
        <Sidebar i18n={strings} />
        <p className="sticky top-full px-6 py-4 text-xs text-primary-500 dark:text-primary-300">
          {strings["version"] ? `v${strings["version"]}` : ""}
        </p>
      </div>
      <main className="w-full h-full pl-64 bg-white dark:bg-background-dark">
        {children}
      </main>
    </div>
  )
}
