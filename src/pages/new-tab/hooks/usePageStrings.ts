import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IStringData } from '../interfaces/localizable'

const pageStrings = atom<IStringData>({
  key: 'pageStrings',
  default: {
    "Bookmarks": "Bookmarks",
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