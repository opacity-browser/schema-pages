import { Fragment, useEffect, useState } from "react"
import styled from "@emotion/styled"
import FavoriteDialog from "./FavoriteDialog"
// import Close from "../../../icons/Close"
import PostMessages from "../adapters/PostMessages"
import { useDialogMessagesStates } from "../hooks/useDialogMessages"
import { useGetPageStrings } from "../hooks/usePageStrings"
import CloseImg from "../../../icons/CloseImg"

export default () => {
  const pageStrings = useGetPageStrings()
  const [mesages, setMessages] = useDialogMessagesStates()

  const [favoriteList, setFavoriteList] = useState([
    null,
    null,
    null,
    null,
    null
  ])
  const [favoriteSize, setFavoriteSize] = useState(0)
  const [isDialogShow, setDialogIsShow] = useState(false)
  const [frequentList, setFrequentList] = useState([
    null,
    null,
    null,
    null,
    null
  ])

  const getFavoriteList = async () => {
    const res = await PostMessages.getFavoriteList()
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      const resLen = res.length
      const fill = res.slice(0, resLen).concat(new Array(5 - resLen).fill(null))
      setFavoriteSize(resLen)
      setFavoriteList(fill)
    }
  }

  const getFrequentList = async () => {
    const res = await PostMessages.getFrequentList()
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
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

  const handleClickDialogAdd = async (title: string, address: string) => {
    const res = await PostMessages.addFavorite(title, address)
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      getFavoriteList()
      setDialogIsShow(false)
    }
  }

  const handleClickDialogCancel = () => {
    setDialogIsShow(false)
  }

  const handleClickFavoriteDelete = async (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.stopPropagation()
    const res = await PostMessages.deleteFavorite(id)
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      getFavoriteList()
    }
  }

  const handleClickGoPage = async (address: string) => {
    const res = await PostMessages.goPage(address)
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    }
  }

  return (
    <$area>
      <section>
        <h2>{pageStrings["Favorite"]}</h2>
        <$shortcutArea>
          {favoriteList.map((d, i) => {
            return (
              <Fragment key={i}>
                {d ? (
                  <$shortcutBox
                    className="active"
                    onClick={() => handleClickGoPage(d.address)}
                  >
                    <div className={`icon icon-${i}`}>
                      {d.title.substring(0, 1)}
                    </div>
                    <p>{d.title}</p>
                    <div
                      className="delete"
                      onClick={(e) => handleClickFavoriteDelete(e, d.id)}
                    >
                      <CloseImg />
                    </div>
                  </$shortcutBox>
                ) : (
                  <$shortcutBox
                    className={favoriteSize === i ? "add-btn" : ""}
                    onClick={() => {
                      if (favoriteSize === i) {
                        setDialogIsShow(true)
                      }
                    }}
                  ></$shortcutBox>
                )}
              </Fragment>
            )
          })}
        </$shortcutArea>
      </section>
      <section>
        <h2>{pageStrings["Frequent"]}</h2>
        <$shortcutArea>
          {frequentList.map((d, i) => {
            return (
              <Fragment key={i}>
                {d ? (
                  <$shortcutBox
                    className="active"
                    onClick={() => handleClickGoPage(d.address)}
                  >
                    <div className={`icon icon-${i}`}>
                      {d.title.substring(0, 1)}
                    </div>
                    <p>{d.title}</p>
                  </$shortcutBox>
                ) : (
                  <$shortcutBox />
                )}
              </Fragment>
            )
          })}
        </$shortcutArea>
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
      @media (prefers-color-scheme: dark) {
        color: #b5b5b5;
      }
    }
    margin-bottom: 30px;
  }
`

const $shortcutArea = styled.div`
  display: grid;
  width: 460px;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 15px;
`

const $shortcutBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border: 1.5px dashed #ddd;
  border-radius: 10px;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    border-color: rgba(80, 80, 80);
  }

  &.active {
    border: 0;
    background: rgb(240, 240, 240);
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: rgb(230, 230, 230);
    }

    @media (prefers-color-scheme: dark) {
      background: rgb(45, 45, 45);
      &:hover {
        background: rgb(30, 30, 30);
      }
    }
  }

  & > .delete {
    position: absolute;
    top: -7px;
    right: -7px;
    padding: 2px;
    line-height: 0;
    background: #fff;
    border: 1px solid #bbb;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    // img {
    //   width: 16px;
    //   height: auto;
    // }
    @media (prefers-color-scheme: dark) {
      background: rgb(50, 50, 50);
      border-color: rgb(150, 150, 150);
      img {
        filter: invert(100%);
      }
    }
  }

  &.active:hover > .delete {
    opacity: 1;
  }

  & > .icon {
    width: 32px;
    height: 32px;
    line-height: 34px;
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

    @media (prefers-color-scheme: dark) {
      color: #000;
      background: rgba(255, 255, 255, 1);
      &.icon-1 {
        background: rgba(255, 255, 255, 0.85);
      }
      &.icon-2 {
        background: rgba(255, 255, 255, 0.6);
      }
      &.icon-3 {
        background: rgba(255, 255, 255, 0.45);
      }
      &.icon-4 {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }

  & > p {
    margin: 0;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
  }

  &.add-btn {
    border: 1.5px solid rgb(245, 245, 245);
    background: rgb(245, 245, 245);
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      border-color: rgb(230, 230, 230);
      background: rgb(230, 230, 230);
    }
    @media (prefers-color-scheme: dark) {
      background: rgba(47, 47, 47);
      border-color: rgba(47, 47, 47);
      &:hover {
        background: rgba(30, 30, 30);
        border-color: rgba(30, 30, 30);
      }
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
      @media (prefers-color-scheme: dark) {
        background: #fff;
      }
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
      @media (prefers-color-scheme: dark) {
        background: #fff;
      }
    }
  }
`
