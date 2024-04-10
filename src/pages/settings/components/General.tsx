import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import PostMessages from '../adapters/PostMessages'
import { useGetPageStrings } from '../hooks/usePageStrings'
import { useDialogMessagesStates } from '../hooks/useDialogMessages'
import { IGeneralSettingList, IGeneralSettings } from '../interfaces/general'
import ArrowDown from '../icons/ArrowDown'

export default () => {
  const pageStrings = useGetPageStrings()
  const [mesages, setMessages] = useDialogMessagesStates()
  const [browserSettings, setBrowserSettings] = useState<IGeneralSettings>({
    searchEngine: null,
    screenMode: null,
    retentionPeriod: null
  })
  const [settingSelectList, setSettingSelectList] = useState<IGeneralSettingList>({
    searchEngine: [],
    screenMode: [],
    retentionPeriod: []
  })
  
  const getGeneralSettings = async () => {
    const res = await PostMessages.getGeneralSettings()
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
    } else {
      setBrowserSettings(res)
    }
  }

  const getGeneralSettingList = async () => {
    const res = await PostMessages.getGeneralSettingList()
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: pageStrings["An error occurred"]
      }])
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
        setMessages([...mesages, {
          isActive: true,
          message: pageStrings["An error occurred"]
        }])
        setBrowserSettings({
          ...browserSettings,
          searchEngine: cacheBeforeSearchEngine
        })
      }
    }

    if(name === "screenMode") {
      const cacheBeforeScreenMode = { ...browserSettings.screenMode }
      setBrowserSettings({
        ...browserSettings,
        screenMode: {
          id: value,
          name: settingSelectList.screenMode.find(d => d.id === value).name
        }
      })
      const res = await PostMessages.setScreenMode(value)
      if(res === "error") {
        setMessages([...mesages, {
          isActive: true,
          message: pageStrings["An error occurred"]
        }])
        setBrowserSettings({
          ...browserSettings,
          screenMode: cacheBeforeScreenMode
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
        setMessages([...mesages, {
          isActive: true,
          message: pageStrings["An error occurred"]
        }])
        setBrowserSettings({
          ...browserSettings,
          retentionPeriod: cacheBeforePeriod
        })
      }
    }
  }

  return (
    <$area>
      <h2>{ pageStrings["General"] }</h2>
      <$optionBox>
        <p className="title">{ pageStrings["Search Engine"] }</p>
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
        <p className="title">{ pageStrings["Screen Mode"] }</p>
        <div className="data">
          <$selectbox>
            <select name="screenMode" onChange={handleChangeSelected} value={browserSettings.screenMode?.id}>
              { settingSelectList.screenMode.map(({ id, name }) => {
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
        <p className="title">{ pageStrings["History Data Retention Period"] }</p>
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

    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }
`

const $optionBox = styled.div`
  margin: 0 30px 30px;
  .title {
    color: #222;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 600;
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }
  .data {

  }
`

const $selectbox = styled.div`
  position: relative;
  width: 220px;
  select {
    border: 1px solid rgb(228, 228, 228);
    line-height: 36px;
    height: 36px;
    padding: 0 13px;
    border-radius: 6px;
    width: 100%;
    font-size: 14px;
    @media (prefers-color-scheme: dark) {
      background: rgb(52, 52, 52);
      border-color: rgb(90, 90, 90);
      color: #fff;
    }
    -webkit-appearance: none;
  }
  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -8px;
  }
`