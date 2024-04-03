import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import FavoriteDialog from './FavoriteDialog'
import Close from '../../../icons/Close'
import PostMessages from '../adapters/PostMessages'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'
import { useGetPageStrings } from '../hooks/usePageStrings'

export default () => {
  const pageStrings = useGetPageStrings()
  const [mesages, setMessages] = useDialogMessagesStates()
  
  const [favoriteList, setFavoriteList] = useState([null, null, null, null, null])
  const [favoriteSize, setFavoriteSize] = useState(0)
  const [isDialogShow, setDialogIsShow] = useState(false)
  const [frequentList, setFrequentList] = useState([null, null, null, null, null])

  const getFavoriteList = async () => {
    const res = await PostMessages.getFavoriteList()
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      const resLen = res.length
      const fill = res.slice(0, resLen).concat(new Array(5 - resLen).fill(null))
      setFavoriteSize(resLen)
      setFavoriteList(fill)
    }
  }

  const getFrequentList = async () => {
    const res = await PostMessages.getFrequentList()
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      const resLen = res.length
      const fill = res.slice(0, resLen).concat(new Array(5 - resLen).fill(null))
      setFrequentList(fill)
    }
  }

  useEffect(() => {
    getFavoriteList()
    getFrequentList()
  }, [])

  const handleClickDialogAdd = async(title: string, address: string) => {
    const res = await PostMessages.addFavorite(title, address)
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      getFavoriteList()
      setDialogIsShow(false)
    }
  }

  const handleClickDialogCancel = () => {
    setDialogIsShow(false)
  }

  const handleClickFavoriteDelete = async (id: string) => {
    const res = await PostMessages.deleteFavorite(id)
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      getFavoriteList()
    }
  }

  const handleClickGoPage = async (address: string) => {
    const res = await PostMessages.goPage(address)
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    }
  }

  return (
    <$area>
      <section>
        <h2>Favorite</h2>
        <$bookmarkArea>
          {favoriteList.map((d, i) => {
            return (
              <Fragment key={i}>
                {d ? (
                  <$bookmarkBox
                    className="active"
                    onClick={() => handleClickGoPage(d.address)}
                  >
                    <div className={`icon icon-${i}`}>{d.title.substring(0, 1)}</div>
                    <p>{d.title}</p>
                    <div 
                      className="delete"
                      onClick={() => handleClickFavoriteDelete(d.id)}
                    >
                      <Close />
                    </div>
                  </$bookmarkBox>
                ) : (
                  <$bookmarkBox 
                    className={favoriteSize === i ? 'add-btn' : ''}
                    onClick={() => {
                      if(favoriteSize === i) {
                        setDialogIsShow(true)
                      }
                    }}
                  >
                  </$bookmarkBox>
                )}
              </Fragment>
            )
          })}
        </$bookmarkArea>
      </section>
      <section>
        <h2>Frequent</h2>
        <$bookmarkArea>
          {frequentList.map((d, i) => {
            return (
              <Fragment key={i}>
                {d ? (
                <$bookmarkBox 
                  className="active"
                  onClick={() => handleClickGoPage(d.address)}
                >
                  <div className={`icon icon-${i}`}>{d.title.substring(0, 1)}</div>
                  <p>{d.title}</p>
                </$bookmarkBox>
                ) : (
                  <$bookmarkBox />
                )}
              </Fragment>
            )
          })}
        </$bookmarkArea>
      </section>
      {isDialogShow && (
        <FavoriteDialog 
          handleClickDialogAdd={handleClickDialogAdd} 
          handleClickDialogCancel={handleClickDialogCancel} 
        />
      )}
    </$area>
  )
}


const $area = styled.div`
  margin-top: 60px;
  section {
    h2 {
      font-size: 13px;
      margin-bottom: 7px;
      color: #666;
      margin-left: 1px;
    }
    margin-bottom: 30px;
  }
`

const $bookmarkArea = styled.div`
  display: grid;
  width: 460px;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 15px;
`

const $bookmarkBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 1.5px dashed #ddd;
  border-radius: 10px;
  text-align: center;

  &.active {
    border: 0;
    background: #f7f7f7;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: #eaeaea;
    }
  }

  & > .delete {
    position: absolute;
    top: -7px;
    right: -7px;
    padding: 2px;
    line-height: 0;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    svg {
      width: 14px;
      height: auto;
    }
  }

  &.active:hover > .delete {
    opacity: 1;
  }

  & > .icon {
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 50%;
    font-size: 14px;
    font-weight: bold;
    margin: 16px auto 6px;
    &.icon-1 {
      background: rgba(0, 0, 0, 0.6);
    }
    &.icon-2 {
      background: rgba(0, 0, 0, 0.5);
    }
    &.icon-3 {
      background: rgba(0, 0, 0, 0.4);
    }
    &.icon-4 {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  & > p {
    margin: 0;
    font-size: 12px;
  }

  &.add-btn {
    border: 1.5px solid #eaeaea;
    background: #f9f9f9;
    position: relative;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: #eaeaea;
    }
    &::before {
      content: "";
      width: 16px;
      height: 2px;
      background: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1px;
      margin-left: -8px;
    }
    &::after {
      content: "";
      width: 2px;
      height: 16px;
      background: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -8px;
      margin-left: -1px;
    }
  }
`