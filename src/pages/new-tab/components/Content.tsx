import { useEffect, useLayoutEffect } from 'react'
import styled from '@emotion/styled'
import Shortcut from './Shortcut'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'
import { useSetPageStrings } from '../hooks/usePageStrings'
import PostMessages from '../adapters/PostMessages'
import DialogMessage from './DialogMessage'
import { Logo } from '../items/Logo'


export default () => {
  const setPageStrings = useSetPageStrings()
  const [messages, setMessages] = useDialogMessagesStates()
  
  useEffect(() => {
    if(messages.length > 0 && !messages.find(em => em.isActive)) {
      setMessages([])
    }
  }, [messages])

  const getSettingsPageStrings = async () => {
    const res = await PostMessages.getNewTabPageStrings()
    if(res !== "error") {
      setPageStrings(res)
    }
  }

  useLayoutEffect(() => {
    getSettingsPageStrings()
  }, [])

  return (
    <$area>
      <$content>
        <$box>
          <$logo>
            <Logo />
          </$logo>
          <Shortcut />
        </$box>
      </$content>
      {messages.length > 0 && (
        <$dialogArea>
          {messages.map(({isActive, message}, i) => (
            <DialogMessage key={i} isActive={isActive} message={message} index={i} />
          ))}
        </$dialogArea>
      )}
    </$area>
  )
}

const $area = styled.div`
  height: 100%;
`

const $logo = styled.div`
  text-align: center;
  svg {
    width: 80px;
    height: auto;
    filter: invert(100%);
  }

  @media (prefers-color-scheme: dark) {
    svg {
      filter: none;
    }
  }
`

const $content = styled.div`
  height: 100%;
  min-height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`

const $box = styled.div`
  width: 460px;
  margin-top: -60px;
`

const $dialogArea = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
`