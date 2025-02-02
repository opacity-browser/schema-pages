import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Button from "./Button"

export default function ErrorMessage({
  title,
  message,
  btnText,
  onClick
}: {
  title: string
  message: React.ReactNode
  btnText?: string
  onClick?: () => void
}) {
  return (
    <div className="flex flex-col items-center">
      <figure className="mb-2">
        <ExclamationTriangleIcon className="size-16 dark:text-white" />
      </figure>
      <h1 className="text-primary text-4xl mb-1 font-semibold dark:text-white">
        {title}
      </h1>
      <p className="text-primary-300 dark:text-primary-100 mb-12">{message}</p>
      <Button onClick={onClick}>{btnText}</Button>
    </div>
  )
}
