import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useGetPageStrings } from '../hooks/usePageStrings'
import { Logo } from '../../new-tab/items/Logo'

export default ({ pageName, setPageName, menuList }) => {
  const pageStrings = useGetPageStrings()
  const handleClickMenu = (link: string) => {
    setPageName(link)
    ;(window as any).location.hash = link
  }

  return (
    <$sidebar>
      <$logoArea>
        <div>
          <Logo />
        </div>
        <h1>{ pageStrings["Settings"] ?? "Settings" }</h1>
      </$logoArea>
      <$menuArea>
        <ul>
          { menuList.map(({ name, link }) => {
            return (
              <li key={name}>
                <p 
                  className={pageName === link ? "active-menu" : ""}
                  onClick={() => handleClickMenu(link)} 
                  css={css`
                    cursor: pointer;
                  `}
                >
                  {name}
                </p>
              </li>
            )
          })}
        </ul>
      </$menuArea>
    </$sidebar>
  )
}

const $sidebar = styled.div`
  position: relative;
  width: 280px;
  flex-shrink: 0;
  border-right: 1px solid rgb(228, 228, 228);
`

const $logoArea = styled.div`
  padding: 40px 30px 30px;
  display: flex;
  & > div {
    display: inline-block;
    background: #000;
    line-height: 0;
    padding: 5px;
    border-radius: 10px;
  }

  & > h1 {
    margin-left: 10px;
    font-size: 20px;
    vertical-align: middle;
    line-height: 33px;
    color: #222;
    font-weight: 500;
    padding-top: 2px;
  }
`

const $menuArea = styled.div`
  padding: 0 30px;
  font-size: 14px;
  li {
    line-height: 36px;
    margin-bottom: 5px;
    p {
      padding: 0 15px;
      border-radius: 10px;
      transition: background 0.3s;
    }
    p.active-menu {
      background: rgba(100, 100, 100, 0.1);
    }
  }
`