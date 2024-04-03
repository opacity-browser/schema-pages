import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import FavoriteDialog from './FavoriteDialog'

export default () => {
  const [favoriteList, setFavoriteList] = useState([null, null, null, null, null])
  const [favoriteSize, setFavoriteSize] = useState(0)
  const [isDialogShow, setDialogIsShow] = useState(false)

  const getFavoriteList = async () => {
    const resList = [{
      title: "naver",
      address: "https://naver.com"
    }]
    const fill = resList.slice(0, resList.length).concat(new Array(5 - resList.length).fill(null))
    setFavoriteSize(resList.length)
    setFavoriteList(fill)
  }

  useEffect(() => {
    getFavoriteList()
  }, [])

  const handleClickDialogAdd = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setDialogIsShow(false)
  }

  const handleClickDialogCancel = (e: React.MouseEvent<HTMLParagraphElement>) => {
    setDialogIsShow(false)
  }

  return (
    <$area>
      <section>
        <h2>Favorite</h2>
        <$bookmarkArea>
          {favoriteList.map((d, i) => {
            console.log(d)
            console.log(favoriteSize-1 === i)
            return (
              <Fragment key={i}>
                {d ? (
                  <$bookmarkBox
                    className="active"
                  >
                    <div className='icon'>{d.title[0]}</div>
                    <p>{d.title}</p>
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
          <$bookmarkBox>
          </$bookmarkBox>
          <$bookmarkBox>
          </$bookmarkBox>
          <$bookmarkBox>
          </$bookmarkBox>
          <$bookmarkBox>
          </$bookmarkBox>
          <$bookmarkBox>
          </$bookmarkBox>
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
  width: 80px;
  height: 80px;
  border: 1.5px dashed #ddd;
  border-radius: 10px;
  text-align: center;

  &.active {
    border: 0;
    background: #f5f5f5;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: #eaeaea;
    }
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
  }

  & > p {
    margin: 0;
    font-size: 12px;
  }

  &.add-btn {
    border: 1.5px solid #eaeaea;
    background: #f5f5f5;
    position: relative;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: #eaeaea;
    }
    &::before {
      content: "";
      width: 18px;
      height: 1.8px;
      background: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -0.9px;
      margin-left: -9px;
    }
    &::after {
      content: "";
      width: 1.8px;
      height: 18px;
      background: #444;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -9px;
      margin-left: -0.9px;
    }
  }
`