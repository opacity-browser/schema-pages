import { useEffect, useLayoutEffect, useState } from 'react'
import styled from '@emotion/styled'
import PostMessages from '../adapters/PostMessages'
import { usePageStringsStates } from '../hooks/usePageStrings'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'
import Sidebar from '../components/Sidebar'
import General from '../components/General'
import SearchHistory from '../components/SearchHistory'
import VisitHistory from '../components/VisitHistory'
import Permission from '../components/Permission'
import DialogMessage from '../components/DialogMessage'
import Library from '../components/Library'

export default () => {
  const [pageStrings, setPageStrings] = usePageStringsStates()

  const menuList = [{
    name: pageStrings["General"] ?? "General",
    link: "#general"
  }, {
    name: pageStrings["Search History"] ?? "Search History",
    link: "#search-history"
  }, {
    name: pageStrings["Visit History"] ?? "Visit History",
    link: "#visit-history"
  }, {
    name: pageStrings["Permission"] ?? "Permission",
    link: "#permission"
  }, {
    name: pageStrings["Library"] ?? "Library",
    link: "#library"
  }]
  const [pageName, setPageName] = useState<string>(location.hash || menuList[0].link)
  const [messages, setMessages] = useDialogMessagesStates()

  useEffect(() => {
    if(messages.length > 0 && !messages.find(em => em.isActive)) {
      setMessages([])
    }
  }, [messages])

  const getSettingsPageStrings = async () => {
    const res = await PostMessages.getSettingsPageStrings()
    if(res !== "error") {
      setPageStrings(res)
    }
  }

  useLayoutEffect(() => {
    getSettingsPageStrings()
  }, [])

  return (
    <$area>
      <Sidebar pageName={pageName} setPageName={setPageName} menuList={menuList} />    
      <$content>
        {pageName == "#general" && (
          <General />
        )}
        {pageName == "#search-history" && (
          <SearchHistory />
        )}
        {pageName == "#visit-history" && (
          <VisitHistory />
        )}
        {pageName == "#permission" && (
          <Permission />
        )}
        {pageName == "#library" && (
          <Library />
        )}
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
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 1000px;
`

const $content = styled.div`
  flex-grow: 1;
  margin-left: 280px;
`

const $dialogArea = styled.div`
  position: fixed;
  bottom: 10px;
  width: 100%;
`