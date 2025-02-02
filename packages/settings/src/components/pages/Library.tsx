import { useEffect } from "react"
import clsx from "clsx"
import useStrings from "../../hooks/useStrings"
import BaseLayout from "../templatets/BaseLayout"
import LibraryList from "design-system/molecules/LibraryList"

export default function Library() {
  const { strings, getStrings } = useStrings()

  useEffect(() => {
    getStrings()
  }, [])

  return (
    <BaseLayout strings={strings}>
      <div className={clsx("max-w-6xl mx-auto px-8 pt-6 pb-12")}>
        <h2 className="text-xl/8 mb-6 flex items-center">
          {strings["Library"]}
        </h2>
        <div className="border-t border-gray-200 dark:border-primary-600 pt-6">
          <LibraryList
            title={strings["Library"]}
            list={[
              {
                title: "ASN1Decoder",
                url: "https://github.com/filom/ASN1Decoder"
              },
              {
                title: "TrackerRadarKit",
                url: "https://github.com/duckduckgo/TrackerRadarKit"
              },
              {
                title: "tracker-blocklists",
                url: "https://github.com/duckduckgo/tracker-blocklists"
              },
              {
                title: "RemoveAdblockThing",
                url: "https://github.com/TheRealJoelmatic/RemoveAdblockThing"
              }
            ]}
          />
        </div>
      </div>
    </BaseLayout>
  )
}
