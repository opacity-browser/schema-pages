import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IStringData } from '../interfaces/localizable'

const pageStrings = atom<IStringData>({
  key: 'pageStrings',
  default: {
    "Favorite": "Favorite",
    "Frequent": "Frequent",
    "Add Favorite": "Add Favorite",
    "Title": "Title",
    "Address": "Address",
    "Add": "Add",
    "Cancel": "Cancel",
    "An error occurred": "An error occurred",
    "Please enter title or address": "Please enter title or address"
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