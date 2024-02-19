import { useState } from 'react'
import { css } from '@emotion/react'

import { SearchIcon } from '../icons/SearchIcon'


const checkURL = (url: string) => {
  if(/ /.test(url) || !(/\./.test(url)) || !(/^[a-zA-Z0-9]/.test(url))) {
    return false
  }

  return true
}

export const Search = () => {

  const [searchText, setSearchText] = useState<string>("")

  const updateSearchText = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const searchAction = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if(checkURL(searchText)) {
        if (/\:\/\//.test(searchText)) {
          window.location.href = searchText
        } else {
          window.location.href = `https://${searchText}`
        }
      } else {
        window.location.href = `https://www.google.com/search?q=${searchText}`
      }
    }
  }

  return (
    <div css={css`
      text-align: center;
      position: relative;
      width: 100%;
      min-width: 400px;
      max-width: 600px;
      margin: 0 auto;
    `}>
      <div css={css`
        text-align: center;
        width: 100%;
        input {
          width: 100%;
          background: rgba(255, 255, 255, 0.6);
          border: 0;
          border-radius: 10px;
          outline: none;
          height: 54px;
          transition: background 0.3s;
          padding: 0 25px 0 50px;
          font-size: 16px;
          box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          &:hover {
            background: rgba(255, 255, 255, 0.8);
          }
        }
        svg {
          position: absolute;
          z-index: 10;
          width: 24px;
          height: auto;
          top: 50%;
          margin-top: -13px;
          left: 14px;
        }
      `}>
        <SearchIcon />
        <input type="text" value={searchText} onChange={updateSearchText} autoFocus={true} onKeyDown={searchAction} />
      </div>
    </div>
  )
}