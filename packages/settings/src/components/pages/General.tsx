import { useEffect } from "react"
import clsx from "clsx"
import LanguageField from "../molecules/LanguageField"
import useStrings from "../../hooks/useStrings"
import BaseLayout from "../templatets/BaseLayout"
import ScreenModeField from "../molecules/ScreenModeFiled"
import SearchEngineField from "../molecules/SearchEngineField"
import RetentionPeriodField from "../molecules/RetentionPeriodField"
import TrackerBlockingField from "../molecules/TrackerBlockingField"
import Divide from "../atoms/Divide"
import Button from "design-system/atoms/Button"
import CancelButton from "design-system/atoms/CancelButton"

export default function General() {
  const { strings, getStrings } = useStrings()

  useEffect(() => {
    getStrings()
  }, [])

  return (
    <BaseLayout strings={strings}>
      <div className={clsx("max-w-6xl mx-auto px-8 pt-6 pb-12")}>
        <h2 className="text-xl/8 mb-6">General</h2>
        <div className="border-t border-gray-200 pt-6">
          <div className="max-w-60  mb-6">
            <LanguageField label={strings["Language"]} />
          </div>
          <div className="max-w-60  mb-6">
            <ScreenModeField label={strings["Screen Mode"]} />
          </div>
          <div className="max-w-60 mb-6">
            <SearchEngineField label={strings["Search Engine"]} />
          </div>
          <div className="max-w-60 mb-6">
            <RetentionPeriodField label={strings["Retention Period"]} />
          </div>
          <Divide />
          <div className="mb-6">
            <TrackerBlockingField
              label={strings["Tracker Blocking"]}
              description={
                strings[
                  "Blocks unnecessary ads and trackers using DuckDuckGo’s tracking protection list along with additional rules."
                ]
              }
            />
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
