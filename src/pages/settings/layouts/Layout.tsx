import styled from '@emotion/styled'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import General from '../components/General'
import SearchHistory from '../components/SearchHistory'
import VisitHistory from '../components/VisitHistory'
import Permission from '../components/Permission'

const menuList = [{
  name: "General",
  link: "#general"
}, {
  name: "Search History",
  link: "#search-history"
}, {
  name: "Visit History",
  link: "#visit-history"
}, {
  name: "Permission",
  link: "#permission"
}]

export default () => {

  const [pageName, setPageName] = useState<string>(location.hash || menuList[0].link)

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
      </$content>
    </$area>
  )
}

const $area = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const $content = styled.div`
  flex-grow: 1
`