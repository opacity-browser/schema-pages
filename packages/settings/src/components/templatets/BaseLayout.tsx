import { cloneElement, ReactNode, useEffect, useState } from "react"
import clsx from "clsx"
import MessageManager from "../../managers/MessageManager"
import { IStrings } from "../../interfases/IStrings"
import DocumentMeta from "../atoms/DocumentMeta"
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
      <div className="fixed w-64 h-full border-r border-gray-200 bg-background z-10">
        <Sidebar i18n={strings} />
        <p className="sticky top-full px-6 py-4 text-xs text-primary-500">
          {strings["version"] ? `v${strings["version"]}` : ""}
        </p>
      </div>
      <main className="w-full h-full pl-64 bg-white">{children}</main>
      <DocumentMeta title={strings.headTitle} />
    </div>
  )
}
