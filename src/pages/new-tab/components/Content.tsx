import { useEffect, useLayoutEffect } from 'react'
import styled from '@emotion/styled'
import { Clock } from '../items/Clock'
import { Logo } from '../items/Logo'
import Shortcut from './Shortcut'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'
import { useSetPageStrings } from '../hooks/usePageStrings'
import PostMessages from '../adapters/PostMessages'
import DialogMessage from './DialogMessage'


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
          <Clock />
          <Shortcut />
        </$box>
      </$content>
      <$logo>
        <Logo />
      </$logo>
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
  padding: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #bbb;
  font-size: 12px;
  line-height: 16px;
  img {
    filter: invert(100%);
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
  // padding-top: 80px;
  margin-top: -60px;
`

const $dialogArea = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
`