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
    retentionPeriod: null,
    blockingLevel: null,
    adBlocking: null
  })
  const [settingSelectList, setSettingSelectList] = useState<IGeneralSettingList>({
    searchEngine: [],
    screenMode: [],
    retentionPeriod: [],
    blockingLevel: []
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

    if(name === "blockingTracker") {
      const cacheBeforeBlockingLevel = { ...browserSettings.blockingLevel }
      setBrowserSettings({
        ...browserSettings,
        blockingLevel: {
          id: value,
          name: settingSelectList.blockingLevel.find(d => d.id === value).name
        }
      })
      const res = await PostMessages.setBlockingTracker(value)
      if(res === "error") {
        setMessages([...mesages, {
          isActive: true,
          message: pageStrings["An error occurred"]
        }])
        setBrowserSettings({
          ...browserSettings,
          blockingLevel: cacheBeforeBlockingLevel
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

  const handleChangeCheckbox = async (target: string) => {
    if(target === "adblocking") {
      const cacheIsAdBlocking = browserSettings.adBlocking
      setBrowserSettings({
        ...browserSettings,
        adBlocking: !browserSettings.adBlocking
      })
      const res = await PostMessages.setAdBlocking(!browserSettings.adBlocking)
      if(res === "error") {
        setMessages([...mesages, {
          isActive: true,
          message: pageStrings["An error occurred"]
        }])
        setBrowserSettings({
          ...browserSettings,
          adBlocking: cacheIsAdBlocking
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
        <p className="title">{ pageStrings["Tracker Blocking"] } <a href="https://github.com/opacity-browser/tracker-blocking" target="_blank">{ pageStrings["Learn More"] }</a></p>
        <div className="data">
          <$selectbox>
          <select name="blockingTracker" onChange={handleChangeSelected} value={browserSettings.blockingLevel?.id}>
            { settingSelectList.blockingLevel.map(({ id, name }) => {
                return (
                  <option key={id} value={id}>{ name }</option>
                )
              })}
            </select>
            <ArrowDown />
          </$selectbox>
        </div>
        <$psText>{ pageStrings["blocking-change-text"] }</$psText>
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
      <$optionBox>
        <p className="title">{ pageStrings["Ad Blocking"] }</p>
        <div className="data">
        <$toggleBtn 
          className={browserSettings.adBlocking ? "active" : ""}
          onClick={() => handleChangeCheckbox("adblocking")}
        />
        </div>
      </$optionBox>
    </$area>
  )
}

const $area = styled.div`
  padding-bottom: 20px;
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

const $psText = styled.p`
  margin-top: 7px;
  margin-left: 2px;
  font-size: 12px;
  opacity: 0.6;
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
    a {
      display: inline-block;
      margin-left: 5px;
      color: rgb(70, 155, 235);
      font-size: 12px;
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

const $toggleBtn = styled.div`
  width: 38px;
  height: 24px;
  border-radius: 15px;
  background: #fff;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background: rgb(210, 210, 210);

  @media (prefers-color-scheme: dark) {
    background: rgb(180, 180, 180);
  }

  &::after {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 10px;
    content: "";
    background: #fff;
    left: 3px;
    transition: all 0.3s;
  }


  &.active {
    background: rgb(70, 155, 235);
    &::after {
      left: 17px;
    }
  }
`