import styled from '@emotion/styled'
import { useState } from 'react'

const searchEngineList = [{
  name: "Google"
}, {
  name: "Bing"
}, {
  name: "Yahoo"
}, {
  name: "DuckDuckGo"
}, {
  name: "Startpage"
}]

const themeList = ["Light", "Dark", "System"]

export default () => {

  const [engine, setEngine] = useState(searchEngineList[0].name)
  const [theme, setTheme] = useState(themeList[2])
  const [retention, setRetention] = useState(0)

  return (
    <$area>
      <h2>General</h2>
      <$optionBox>
        <p className="title">Search engine</p>
        <div className="data">
          <$selectbox>
              <select>
                { searchEngineList.map(({ name }) => {
                  return (
                    <option selected={engine === name}>{ name }</option>
                  )
                })}
              </select>
          </$selectbox>
        </div>
      </$optionBox>
      <$optionBox>
        <p className="title">Theme</p>
        <div className="data">
          <$selectbox>
              <select>
                { themeList.map((name) => {
                  return (
                    <option selected={theme === name}>{ name }</option>
                  )
                })}
              </select>
          </$selectbox>
        </div>
      </$optionBox>
      <$optionBox>
        <p className="title">Data retention period</p>
        <div className="data">
          <$selectbox>
              <select>
                <option selected={retention === 0}>1 Week</option>
                <option selected={retention === 1}>1 Month</option>
                <option selected={retention === 2}>Indefinite</option>
              </select>
          </$selectbox>
        </div>
      </$optionBox>
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

const $optionBox = styled.div`
  margin: 0 30px 30px;
  .title {
    color: #222;
    margin-bottom: 10px;
    font-size: 15px;
  }
  .data {

  }
`

const $selectbox = styled.div`
  select {
    border: 1px solid rgb(228, 228, 228);
    width: 200px;
    line-height: 34px;
    height: 34px;
    padding: 0 5px;
    border-radius: 10px;
  }
`