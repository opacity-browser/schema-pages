import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Button from "./Button"

export default function ErrorMessage({
  title,
  message,
  btnText,
  onRefresh
}: {
  title: string
  message: React.ReactNode
  btnText: string
  onRefresh: () => void
}) {
  return (
    <div className="flex flex-col items-center">
      <figure className="mb-2">
        <ExclamationTriangleIcon className="size-16 dark:text-primary-50" />
      </figure>
      <h1 className="text-primary text-4xl mb-1 font-semibold dark:text-primary-50">
        {title}
      </h1>
      <p className="text-primary-300 dark:text-primary-100 mb-12">{message}</p>
      <Button onClick={onRefresh}>{btnText}</Button>
    </div>
  )
}
