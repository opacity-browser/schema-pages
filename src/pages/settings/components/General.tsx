import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import PostMessages from '../adapters/PostMessages'
import { IGeneralSettingList, IGeneralSettings } from '../interfaces/general'
import ArrowDown from '../icons/ArrowDown'

export default () => {
  const [browserSettings, setBrowserSettings] = useState<IGeneralSettings>({
    searchEngine: null,
    theme: null,
    retentionPeriod: null
  })

  const [settingSelectList, setSettingSelectList] = useState<IGeneralSettingList>({
    searchEngine: [],
    theme: [],
    retentionPeriod: []
  })
  
  const getGeneralSettings = async () => {
    const res = await PostMessages.getGeneralSettings()
    if(res === "error") {

    } else {
      setBrowserSettings(res)
    }
  }

  const getGeneralSettingList = async () => {
    const res = await PostMessages.getGeneralSettingList()
    if(res === "error") {

    } else {
      setSettingSelectList(res)
    }
  }

  useEffect(() => {
    getGeneralSettings()
    getGeneralSettingList()
  }, [])

  const handleChangeSelected = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if(name === "searchEngine") {
      const cacheBeforeSearchEngine = { ...browserSettings.searchEngine }
      setBrowserSettings({
        ...browserSettings,
        searchEngine: {
          id: value,
          name: settingSelectList.searchEngine.find(d => d.id === value).name
        }
      })
      const res = await PostMessages.setSearchEngine(value)
      if(res === "error") {
        setBrowserSettings({
          ...browserSettings,
          searchEngine: cacheBeforeSearchEngine
        })
      }
    }

    if(name === "theme") {
      const cacheBeforeTheme = { ...browserSettings.theme }
      setBrowserSettings({
        ...browserSettings,
        theme: {
          id: value,
          name: settingSelectList.theme.find(d => d.id === value).name
        }
      })
      const res = await PostMessages.setBrowserTheme(value)
      if(res === "error") {
        setBrowserSettings({
          ...browserSettings,
          theme: cacheBeforeTheme
        })
      }
    }

    if(name === "period") {
      const cacheBeforePeriod = { ...browserSettings.retentionPeriod }
      setBrowserSettings({
        ...browserSettings,
        retentionPeriod: {
          id: value,
          name: settingSelectList.retentionPeriod.find(d => d.id === value).name
        }
      })
      const res = await PostMessages.setRetentionPeriod(value)
      if(res === "error") {
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
            <select name="searchEngine" onChange={handleChangeSelected} value={browserSettings.searchEngine?.id}>
              { settingSelectList.searchEngine.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>{ name }</option>
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
            <select name="theme" onChange={handleChangeSelected} value={browserSettings.theme?.id}>
              { settingSelectList.theme.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>{ name }</option>
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
          <select name="period" onChange={handleChangeSelected} value={browserSettings.retentionPeriod?.id}>
            { settingSelectList.retentionPeriod.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>{ name }</option>
                )
              })}
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