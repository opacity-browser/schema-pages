import clsx from "clsx"
import BaseLayout from "../templatets/BaseLayout"
import useStrings from "../../hooks/useStrings"
import { useEffect } from "react"

export default function SearchHistory() {
  const { strings, getStrings } = useStrings()

  useEffect(() => {
    getStrings()
  }, [])

  return (
    <BaseLayout strings={strings}>
      <div className={clsx()}>
        <p>Search History</p>
      </div>
    </BaseLayout>
  )
}
