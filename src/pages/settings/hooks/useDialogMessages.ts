import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const dialogMessages = atom<Array<{
  isActive: boolean
  message: string
}>>({
  key: 'dialogMessages',
  default: []
});

const dialogMessagesState = selector({
  key: 'dialogMessagesState',
  get: ({ get }) => get(dialogMessages)
});

export const useGetDialogMessages = () => {
  return useRecoilValue(dialogMessagesState)
}

export const useSetDialogMessages = () => {
  return useSetRecoilState(dialogMessages)
}

export const useDialogMessagesStates = () => {
  return useRecoilState(dialogMessages)
}