import { Link, useLocation } from "react-router"
import clsx from "clsx"
import Logo from "design-system/atoms/Logo"
import { IStrings } from "../../interfases/IStrings"

export default function Sidebar({ i18n }: { i18n: IStrings }) {
  const location = useLocation()
  return (
    <div>
      <div className="flex items-center gap-2 p-6 border-b border-gray-200 mb-4">
        <Logo className="size-6 invert" />
        <h1 className="text-lg/8">{i18n["Settings"]}</h1>
      </div>
      <nav className="flex-1 overflow-y-auto text-sm">
        <ul>
          {[
            { path: "/", label: i18n["General"] },
            { path: "/search-history", label: i18n["Search History"] },
            { path: "/visit-history", label: i18n["Visit History"] },
            { path: "/permissions", label: i18n["Permissions"] },
            { path: "/library", label: i18n["Library"] }
          ].map(({ path, label }) => (
            <li key={path} className="relative flex items-center pl-3 pr-3">
              <span
                className={clsx(
                  "absolute top-2.5 left-0 w-0.5 h-5 bg-primary transition-opacity",
                  location.pathname === path ? "opacity-100" : "opacity-0"
                )}
              ></span>
              <Link
                to={path}
                className={clsx(
                  "block w-full py-2.5 px-3 rounded-md",
                  "hover:bg-primary-50/50",
                  location.pathname === path
                    ? "text-primary font-medium"
                    : "text-primary-500"
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
