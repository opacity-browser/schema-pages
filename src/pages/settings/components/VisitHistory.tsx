import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import PostMessages from '../adapters/PostMessages'
import { useGetPageStrings } from '../hooks/usePageStrings'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'
import Close from '../../../icons/Close'
import Check from '../icons/Check'
import { IVisitHistory } from '../interfaces/histories'

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
  const pageStrings = useGetPageStrings()
  const [mesages, setMessages] = useDialogMessagesStates()
  const [firstYearMonth, setFirstYearMonth] = useState("")
  const [yearMonth, setYearMonth] = useState(getYearMonth())
  const [visitHistories, setVisitHistories] = useState([])
  const [choiceIds, setChoiceIds] = useState([])

  const getSearchHistories = async () => {
    const res = await PostMessages.getVisitHistoryList(yearMonth)
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      setFirstYearMonth(res.firstDate)
      res.list.sort((a, b) => getDateObj(b.createDate).getTime() - getDateObj(a.createDate).getTime())
      setVisitHistories([...visitHistories, {
        yearMonth: yearMonth,
        list: res.list
      }])
    }
  }

  useEffect(() => {
    getSearchHistories()
  }, [yearMonth])

  const handleClickMoreBtn = () => {
    setYearMonth(getPrevYearMonth(yearMonth))
  }

  const handleClickDeleteBtn = async (yearMonth: string, id: string) => {
    const res = await PostMessages.deleteVisitHistory([id])
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      const newVisitHistories = visitHistories.map(d => {
        if(d.yearMonth != yearMonth) return d
        return {
          ...d,
          list: d.list.filter((historyData: IVisitHistory) => historyData.id !== id)
        }
      })
      setVisitHistories(newVisitHistories)
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
    const res = await PostMessages.deleteVisitHistory(choiceIds)
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      const newVisitHistories = visitHistories.map(d => {
        if(d.yearMonth != yearMonth) return d
        return {
          ...d,
          list: d.list.filter((historyData: IVisitHistory) => !choiceIds.find(choiceId => choiceId === historyData.id))
        }
      })
      setVisitHistories(newVisitHistories)
      setChoiceIds([])
    }
  }

  const choiceHTMLText = () => {
    const string = pageStrings["$n were selected."]
    return string.replace("$n", `<span>${choiceIds.length}</span>`)
  }

  return (
    <$area>
      <h2>{ pageStrings["Visit History"] }</h2>
      {visitHistories.map(({ yearMonth, list }, i) => {
        return (
          <Fragment key={i}>
            <p className='title'>{yearMonth}</p>
            <$historyBox key={yearMonth}>
              {list.length > 0 ? (
                <ul>
                  {list.map(({ id, title, url, createDate }) => {
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
                          <p><span>{title}</span>{url}</p>
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
                  <p>{ pageStrings["There is no visit history."] }</p>
                </$empty>
              )}
            </$historyBox>
          </Fragment>
        )
      })}
      {(firstYearMonth !== "" && firstYearMonth !== yearMonth) && (
        <$moreBtn onClick={handleClickMoreBtn}>{ pageStrings["View More"] }</$moreBtn>
      )}
      {choiceIds.length > 0 && (
        <$optionBar>
          <p className="message" dangerouslySetInnerHTML={{
            __html: choiceHTMLText()
          }} />
          <$deleteBtn onClick={handleClickDeleteCheck}>{ pageStrings["Delete"] }</$deleteBtn>
          <$cancelBtn onClick={() => setChoiceIds([])}>{ pageStrings["Cancel"] }</$cancelBtn>
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
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }

  .title {
    font-size: 12px;
    margin: 5px 32px;
    color: #888;
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

  @media (prefers-color-scheme: dark) {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.4);
    background: rgb(30, 30, 30);
    color: #fff;
  }

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
  font-size: 13px;
  text-shadow: 0 0 2px rgba(5, 115, 210, 0.5);
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
  font-size: 13px;
  @media (prefers-color-scheme: dark) {
    background: rgba(180, 180, 180, 0.1);
  }
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
  margin-top: -1px;

  @media (prefers-color-scheme: dark) {
    border-color: #fff;
  }

  &.active {
    border-color: rgb(70, 155, 235);
    background: rgb(70, 155, 235);
  }

  svg {
    width: 14px;
    height: auto;
  }
`

const $historyBox = styled.div`
  padding: 7px 10px 6px 15px;
  margin: 0 30px 15px;
  font-size: 13px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  @media (prefers-color-scheme: dark) {
    background: rgba(100, 100, 100, 0.1);
    border-color: rgb(22, 22, 22);
    color: #fff;
  }

  ul {
    li {
      line-height: 30px;
      & > div {
        align-items: center;
        display: grid;
        grid-template-columns: 18px 140px 1fr 24px;
        gap: 10px;
        & > p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            float: left;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-right: 15px;
            max-width: 200px;
          }
        }
        & > span {
          text-align: center;
        }
      }
    }
  }
`

const $empty = styled.div`
  font-size: 14px;
  padding: 10px 5px;
  color: #444;
  @media (prefers-color-scheme: dark) {
    color: rgb(180, 180, 180);
  }
`

const $moreBtn = styled.p`
  display: inline-block;
  margin: 0 30px 15px;
  padding: 6px 16px;
  cursor: pointer;
  background: rgb(70, 155, 235);
  color: #fff;
  font-size: 13px;
  border-radius: 4px;
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
    @media (prefers-color-scheme: dark) {
      background: rgba(200, 200, 200, 0.1);
    }
  }
  svg {
    width: 18px;
    height: auto;
  }
`