import { atom, useAtom } from "jotai"
import { IStrings } from "../interfases/IStrings"
import MessageManager from "../managers/MessageManager"

const stringsAtom = atom<IStrings>({
  lang: "en",
  headTitle: "Settings",
  Settings: "Settings",
  General: "General",
  "Search History": "Search History",
  "Visit History": "Visit History",
  Permissions: "Permissions",
  Language: "Language",
  "Search Engine": "Search Engine",
  "Screen Mode": "Screen Mode",
  "Retention Period": "Retention Period",
  "View More": "View More",
  Delete: "Delete",
  Cancel: "Cancel",
  Notification: "Notification",
  Location: "Location",
  allowed: "allowed",
  denied: "denied",
  "There is no domain with permissions set.":
    "There is no domain with permissions set.",
  "There is no search history.": "There is no search history.",
  "There is no visit history.": "There is no visit history.",
  "Tracker Blocking": "Tracker Blocking",
  "Learn More": "Learn More",
  "Clear All": "Clear All",
  Library: "Library",
  "Ad Blocking": "Ad Blocking",
  version: "1.0.10",
  Korean: "Korean",
  English: "English",
  German: "German",
  Spanish: "Spanish",
  Japanese: "Japanese",
  Chinese: "Chinese",
  French: "French",
  Hindi: "Hindi",
  "Blocks unnecessary ads and trackers using DuckDuckGo’s tracking protection list along with additional rules.":
    "Blocks unnecessary ads and trackers using DuckDuckGo’s tracking protection list along with additional rules."
})

export default function useStrings() {
  const messageManager = new MessageManager()
  const [strings, setStrings] = useAtom(stringsAtom)

  const getStrings = async () => {
    const res = await messageManager.getStrings()
    if (res === "error") return
    setStrings(res)
  }

  return { strings, getStrings }
}
