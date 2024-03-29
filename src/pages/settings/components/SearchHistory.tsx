import styled from '@emotion/styled'
import Close from '../icons/Close'
import { useEffect, useState } from 'react'
import BrowserMessageManager from '../../../managers/message'
import { ISearchHistoriesDTO } from '../interfaces/searchHistories'
import Check from '../icons/Check'

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
  const [choiceIds, setChoiceIds] = useState([])

  const getSearchHistories = async () => {
    const resSearchHistories: ISearchHistoriesDTO = await BrowserMessageManager.request("getSearchHistoryList", yearMonth)
    setFirestYearMonth(resSearchHistories.firstDate)
    resSearchHistories.list.sort((a, b) => getDateObj(b.createDate).getTime() - getDateObj(a.createDate).getTime())
    const newHistories = [{
      yearMonth: yearMonth,
      list: resSearchHistories.list
    }]
    setSearchHistories([...searchHistories, ...newHistories])
  }

  useEffect(() => {
    getSearchHistories()
  }, [yearMonth])

  const handleClickMoreBtn = () => {
    setYearMonth(getPrevYearMonth(yearMonth))
  }

  const handleClickDeleteBtn = async (yearMonth: string, id: string) => {
    const res = await BrowserMessageManager.request("deleteSearchHistory", JSON.stringify([id]))
    if(res === "success") {
      const newSearchHistories = searchHistories.map(d => {
        if(d.yearMonth != yearMonth) return d
        return {
          ...d,
          list: d.list.filter(historyData => historyData.id !== id)
        }
      })
      setSearchHistories(newSearchHistories)
    }
  }

  const handleClickCheckbox = (id: string) => {
    if(choiceIds.find(choiceId => choiceId === id)) {
      setChoiceIds(choiceIds.filter(choiceId => choiceId != id))
    } else {
      setChoiceIds([...choiceIds, id])
    }
  }

  const handleClickDeleteCheck = async () => {
    const res = await BrowserMessageManager.request("deleteSearchHistory", JSON.stringify(choiceIds))
    if(res === "success") {
      const newSearchHistories = searchHistories.map(d => {
        if(d.yearMonth != yearMonth) return d
        return {
          ...d,
          list: d.list.filter(historyData => !choiceIds.find(choiceId => choiceId === historyData.id))
        }
      })
      setSearchHistories(newSearchHistories)
      setChoiceIds([])
    }
  }
  
  return (
    <$area>
      <h2>Search History</h2>
      {searchHistories.map(({ yearMonth, list }) => {
        return (
          <$historyBox key={yearMonth}>
            <p className='title'>{yearMonth}</p>
            {list.length > 0 ? (
              <ul>
                {list.map(({ id, searchText, createDate }) => {
                  return (
                    <li key={id}>
                      <div>
                        <$checkbox 
                          className={choiceIds.find((choiceId) => choiceId == id) ? "active" : ""}
                          onClick={() => handleClickCheckbox(id)}
                        >
                          <Check />
                        </$checkbox>
                        <span>{createDate}</span>
                        <p>{searchText}</p>
                        <$closeBtnBox onClick={() => handleClickDeleteBtn(yearMonth, id)}>
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
        )
      })}
      {(firstYearMonth !== "" && firstYearMonth !== yearMonth) && (
        <$moreBtn onClick={handleClickMoreBtn}>More history</$moreBtn>
      )}
      {choiceIds.length > 0 && (
        <$optionBar>
          <p className="message"><span>{choiceIds.length}</span> were selected.</p>
          <$deleteBtn onClick={handleClickDeleteCheck}>Delete</$deleteBtn>
          <$cancelBtn onClick={() => setChoiceIds([])}>Cancel</$cancelBtn>
        </$optionBar>
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

const $optionBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  background: #fff;
  display: flex;
  align-items: center;
  line-height: 24px;
  padding: 0 30px;
  font-size: 15px;

  .message {
    font-size: 16px;
    flex-grow: 1;
    text-align: center;
    span {
     color: rgb(70, 155, 235);
     font-weight: bold; 
    }
  }
`

const $deleteBtn = styled.p`
  display: inline-block;
  margin: 0 5px;
  padding: 7px 20px;
  cursor: pointer;
  background: rgb(70, 155, 235);
  color: #fff;
  border-radius: 6px;
  width: 80px;
  text-align: center;
  font-size: 14px;
`

const $cancelBtn = styled.p`
  display: inline-block;
  margin: 0 5px;
  padding: 7px 20px;
  cursor: pointer;
  background: rgba(100, 100, 100, 0.1);
  border-radius: 6px;
  width: 80px;
  text-align: center;
  font-size: 14px;
`

const $checkbox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
  transition: all 0.3s;
  display: flex;
  items-align: center;
  justify-content: center;
  &.active {
    border: 1.5px rgb(70, 155, 235);
    background: rgb(70, 155, 235);
  }

  svg {
    width: 14px;
    height: auto;
  }
`

const $historyBox = styled.div`
  padding: 8px 15px 5px;
  margin: 0 30px 15px;
  font-size: 14px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  & > p {
    font-size: 12px;
    margin: 5px 0;
    color: #888;
  }

  ul {
    li {
      line-height: 30px;
      div {
        display: flex;
        align-items: center;
        p {
          padding: 0 10px;
          flex-grow: 1;
        }
        span {
          padding: 0 15px;
          width: 180px;
        }
      }
    }
  }
`

const $empty = styled.div`
  font-size: 14px;
  padding: 12px 0;
  color: #444;
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
  width: 24px;
  height: 24px;
  display: inline-block;
  border-radius: 12px;
  background: transparent;
  transition: background 0.3s;
  cursor: pointer;
  display: flex;
  items-align: center;
  justify-content: center;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
  svg {
    width: 18px;
    height: auto;
  }
`