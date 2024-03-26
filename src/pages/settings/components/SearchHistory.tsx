import styled from '@emotion/styled'
import Close from '../icons/Close'

const searchHistoryData = [{
  dateset: "2024-03-27",
  histories: [{
    id: "aa",
    searchText: "google",
    timeset: "10:10"
  }, {
    id: "bb",
    searchText: "google",
    timeset: "10:10"
  }, {
    id: "cc",
    searchText: "google",
    timeset: "10:10"
  }, {
    id: "dd",
    searchText: "google",
    timeset: "10:10"
  }]
}, {
  dateset: "2024-03-26",
  histories: [{
    id: "aa",
    searchText: "google",
    timeset: "10:10"
  }, {
    id: "bb",
    searchText: "google",
    timeset: "10:10"
  }, {
    id: "cc",
    searchText: "google",
    timeset: "10:10"
  }, {
    id: "dd",
    searchText: "google",
    timeset: "10:10"
  }]
}]

export default () => {
  return (
    <$area>
      <h2>Search History</h2>
          {searchHistoryData.map(({ dateset, histories }) => {
            return (
              <$historyBox>
                <div className={"history-head"}>
                  <input type={"checkbox"} />
                  <p>{dateset}</p>
                  <Close />
                </div>
                <ul>
                  {histories.map(({ searchText, timeset }) => {
                    return (
                      <li>
                        <div>
                          <input type={"checkbox"} />
                          <span>{timeset}</span>
                          <p>{searchText}</p>
                          <Close />
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </$historyBox>
            )
          })}
    </$area>
  )
}

const $area = styled.div`
  h2 {
    padding: 43px 30px 27px;
    font-size: 18px;
    color: #222;
    line-height: 35px;
  }
`

const $historyBox = styled.div`
  padding: 8px 15px;
  margin: 0 20px 15px;
  font-size: 15px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  .history-head {
    display: flex;
    line-height: 40px;
    align-items: center;
    input {
      width: 16px;
    }
    p {
      padding: 0 10px;
      flex-grow: 1;
    }
    svg {
      width: 30px;
      cursor: pointer;
    }
  }

  ul {
    li {
      line-height: 40px;
      div {
        display: flex;
        align-items: center;
        input {
          width: 16px;
        }
        p {
          padding: 0 10px;
          flex-grow: 1;
        }
        span {
          padding: 0 10px;
          width: 80px;
        }
        svg {
          width: 30px;
          cursor: pointer;
        }
      }
    }
  }
`