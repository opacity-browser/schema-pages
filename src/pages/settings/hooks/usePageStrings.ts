import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IStringData } from '../interfaces/localizable';

const pageStrings = atom<IStringData>({
  key: 'pageStrings',
  default: {
    "Settings": "Settings",
    "General": "General",
    "Search History": "Search History",
    "Visit History": "Visit History",
    "Permission": "Permission",
    "Search Engine": "Search Engine",
    "Screen Mode": "Screen Mode",
    "History Data Retention Period": "History Data Retention Period",
    "View More": "View More",
    "$n were selected.": "$n were selected.",
    "Delete": "Delete",
    "Cancel": "Cancel",
    "An error occurred": "An error occurred",
    "Notification": "Notification",
    "allowed": "allowed",
    "denied": "denied",
    "There are no domains with notification permissions set.": "There are no domains with notification permissions set.",
    "There is no search history.": "There is no search history.",
    "There is no visit history.": "There is no visit history.",
    "Tracker Blocking": "Tracker Blocking",
    "blocking-change-text": "Changes take effect starting from newly created tabs.",
    "Learn More": "Learn More",
    "Clear All": "Clear All",
    "Library": "Library",
    "Ad Blocking": "Ad Blocking",
    "version": ""
  }
});

const pageStringsState = selector({
  key: 'pageStringsState',
  get: ({ get }) => get(pageStrings)
});

export const useGetPageStrings = () => {
  return useRecoilValue(pageStringsState)
}

export const useSetPageStrings = () => {
  return useSetRecoilState(pageStrings)
}

export const usePageStringsStates = () => {
  return useRecoilState(pageStrings)
}