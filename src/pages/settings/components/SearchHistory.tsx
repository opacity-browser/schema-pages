import styled from '@emotion/styled'
import Close from '../icons/Close'
import { useEffect, useState } from 'react'
import BrowserMessageManager from '../../../managers/message'
import { ISearchHistoriesDTO } from '../interfaces/searchHistories'

const getYearMonth = () => {
  const date = new Date()
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0")
}

const getPrevYearMonth = (yearMonth: string) => {
  const year = Number(yearMonth.split("-")[0])
  const month = Number(yearMonth.split("-")[1])
  if(month > 1) {
    return year + "-" + String(month - 1).padStart(2, "0")
  } else {
    return (year - 1) + "-12"
  }
}

const getDateObj = (stringDate: string) => {
  const yyyymmdd = stringDate.split(" ")[0].split("-")
  const hhmmss = stringDate.split(" ")[1].split(":")
  return new Date(Number(yyyymmdd[0]), Number(yyyymmdd[1]) - 1, Number(yyyymmdd[2]), Number(hhmmss[0]), Number(hhmmss[1]), Number(hhmmss[2]))
}

export default () => {
  const [firstYearMonth, setFirestYearMonth] = useState("")
  const [yearMonth, setYearMonth] = useState(getYearMonth())
  const [searchHistories, setSearchHistories] = useState([])

  const getSearchHistories = async () => {
    const resSearchHistories: ISearchHistoriesDTO = await BrowserMessageManager.request("getSearchHistoryList", yearMonth)
    setFirestYearMonth(resSearchHistories.firstDate)
    resSearchHistories.list.sort((a, b) => getDateObj(b.createDate).getTime() - getDateObj(a.createDate).getTime())
    setSearchHistories([...searchHistories, ...resSearchHistories.list])
  }

  useEffect(() => {
    getSearchHistories()
  }, [yearMonth])

  const handleClickMoreBtn = () => {
    setYearMonth(getPrevYearMonth(yearMonth))
  }

  const handleClickDeleteBtn = async (id: string) => {
    const res = await BrowserMessageManager.request("deleteSearchHistory", JSON.stringify([id]))
    if(res === "success") {
      setSearchHistories(searchHistories.filter(historyData => historyData.id !== id))
    }
  }
  
  return (
    <$area>
      <h2>Search History</h2>
      <$historyBox>
        {searchHistories.length > 0 ? (
          <ul>
            {searchHistories.map(({ id, searchText, createDate }) => {
              return (
                <li>
                  <div>
                    <span>{createDate}</span>
                    <p>{searchText}</p>
                    <$closeBtnBox onClick={() => handleClickDeleteBtn(id)}>
                      <Close />
                    </$closeBtnBox>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <$empty>
            <p>There is no search history.</p>
          </$empty>
        )}
      </$historyBox>
      {(firstYearMonth !== "" && firstYearMonth !== yearMonth) && (
        <$moreBtn onClick={handleClickMoreBtn}>More history</$moreBtn>
      )}
      
    </$area>
  )
}

const $area = styled.div`
  h2 {
    padding: 41px 30px 29px;
    font-size: 18px;
    color: #222;
    line-height: 35px;
  }
`

const $historyBox = styled.div`
  padding: 8px 15px;
  margin: 0 30px 15px;
  font-size: 15px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  ul {
    li {
      line-height: 40px;
      div {
        display: flex;
        align-items: center;
        p {
          padding: 0 10px;
          flex-grow: 1;
        }
        span {
          padding: 0 10px;
          width: 200px;
        }
        svg {
          width: 30px;
          cursor: pointer;
        }
      }
    }
  }
`

const $empty = styled.div`
  font-size: 15px;
  padding: 20px 5px;
`

const $moreBtn = styled.p`
  display: inline-block;
  margin: 0 30px 15px;
  padding: 7px 20px;
  cursor: pointer;
  background: rgb(70, 155, 235);
  color: #fff;
  font-size: 14px;
  border-radius: 6px;
`

const $closeBtnBox = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 15px;
  background: transparent;
  transition: background 0.3s;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
`