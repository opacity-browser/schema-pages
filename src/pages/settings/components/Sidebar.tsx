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
      <$version>
        <span>v</span>{ pageStrings["version"] }
      </$version>
    </$sidebar>
  )
}

const $version = styled.div`
  position: sticky;
  top: 100%;
  margin-left: 30px;
  font-size: 12px;
  letter-spacing: -0.3px;
  height: 35px;
  color: #888;
  span {
    display: inline-block;
    margin-right: 1px;
  }
`

const $sidebar = styled.div`
  position: fixed;
  width: 280px;
  height: 100%;
  flex-shrink: 0;
  border-right: 0.5px solid rgb(228, 228, 228);
  @media (prefers-color-scheme: dark) {
    border-color: rgb(22, 22, 22);
    border-color: rgb(90, 90, 90);
  }
`

const $logoArea = styled.div`
  padding: 40px 30px 30px;
  display: flex;
  & > div {
    display: inline-block;
    line-height: 0;
    padding: 5px;
    svg {
      width: 30px;
      height: auto;
      filter: invert(100%);
    }
    @media (prefers-color-scheme: dark) {
      svg {
        filter: none;
      }
    }
  }

  & > h1 {
    margin-left: 5px;
    font-size: 22px;
    vertical-align: middle;
    line-height: 40px;
    color: #222;
    font-weight: 500;
    padding-top: 2px;
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }
`

const $menuArea = styled.div`
  padding: 0 30px;
  font-size: 14px;
  li {
    line-height: 38px;
    margin-bottom: 5px;
    p {
      padding: 0 15px;
      border-radius: 10px;
      transition: background 0.3s;
    }
    p.active-menu {
      background: rgba(100, 100, 100, 0.1);
      @media (prefers-color-scheme: dark) {
        background: rgba(150, 150, 150, 0.1);
      }
    }
  }
`