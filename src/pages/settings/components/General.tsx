import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import ArrowDown from '../icons/ArrowDown'
import BrowserMessageManager from '../../../managers/message'

const themeList = ["System", "Light", "Dark"]

export default () => {
  const [browserSettings, setBrowserSettings] = useState({
    searchEngine: "Google",
    theme: "System",
    retentionPeriod: "1 Week"
  })
  const [searchEngineList, setSearchEngineList] = useState(["Google", "Bing", "Yahoo"])

  const getSettingData = async () => {
    const browserSettingsData = await BrowserMessageManager.request("getBrowerSettings")
    setBrowserSettings(browserSettingsData)
  }

  const getSearchEngine = async () => {
    const browserSearchEngineList = await BrowserMessageManager.request("getSearchEngineList")
    setSearchEngineList(browserSearchEngineList)
  }

  useEffect(() => {
    getSettingData()
    getSearchEngine()
  }, [])

  const handleChangeSelected = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if(name === "searchEngine") {
      const cacheBeforeSearchEngine = browserSettings.searchEngine
      setBrowserSettings({
        ...browserSettings,
        searchEngine: value
      })
      const res = await BrowserMessageManager.request("setSearchEngine", value)
      if(res != "success") {
        setBrowserSettings({
          ...browserSettings,
          searchEngine: cacheBeforeSearchEngine
        })
      }
    }

    if(name === "theme") {
      const cacheBeforeTheme = browserSettings.theme
      setBrowserSettings({
        ...browserSettings,
        theme: value
      })
      const res = await BrowserMessageManager.request("setBrowserTheme", value)
      if(res != "success") {
        setBrowserSettings({
          ...browserSettings,
          theme: cacheBeforeTheme
        })
      }
    }

    if(name === "period") {
      const cacheBeforePeriod = browserSettings.retentionPeriod
      setBrowserSettings({
        ...browserSettings,
        retentionPeriod: value
      })
      const res = await BrowserMessageManager.request("setRetentionPeriod", value)
      if(res != "success") {
        setBrowserSettings({
          ...browserSettings,
          retentionPeriod: cacheBeforePeriod
        })
      }
    }
  }

  return (
    <$area>
      <h2>General</h2>
      <$optionBox>
        <p className="title">Search engine</p>
        <div className="data">
          <$selectbox>
            <select name="searchEngine" onChange={handleChangeSelected} value={browserSettings.searchEngine}>
              { searchEngineList.map((name) => {
                return (
                  <option key={name} value={name}>{ name }</option>
                )
              })}
            </select>
            <ArrowDown />
          </$selectbox>
        </div>
      </$optionBox>
      <$optionBox>
        <p className="title">Theme</p>
        <div className="data">
          <$selectbox>
            <select name="theme" onChange={handleChangeSelected} value={browserSettings.theme}>
              { themeList.map((name) => {
                return (
                  <option key={name} value={name}>{ name }</option>
                )
              })}
            </select>
            <ArrowDown />
          </$selectbox>
        </div>
      </$optionBox>
      <$optionBox>
        <p className="title">Data retention period</p>
        <div className="data">
          <$selectbox>
          <select name="period" onChange={handleChangeSelected} value={browserSettings.retentionPeriod}>
              <option value={"1 Week"}>1 Week</option>
              <option value={"1 Month"}>1 Month</option>
              <option value={"Indefinite"}>Indefinite</option>
            </select>
            <ArrowDown />
          </$selectbox>
        </div>
      </$optionBox>
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

const $optionBox = styled.div`
  margin: 0 30px 30px;
  .title {
    color: #222;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 600;
  }
  .data {

  }
`

const $selectbox = styled.div`
  position: relative;
  width: 200px;
  select {
    border: 1px solid rgb(228, 228, 228);
    line-height: 34px;
    height: 34px;
    padding: 0 10px;
    border-radius: 6px;
    width: 100%;
    -webkit-appearance: none;
  }
  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -8px;
  }
`