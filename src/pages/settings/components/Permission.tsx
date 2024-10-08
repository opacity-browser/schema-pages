import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import PostMessages from "../adapters/PostMessages"
import { useGetPageStrings } from "../hooks/usePageStrings"
import { useDialogMessagesStates } from "../hooks/useDialogMessages"
import Close from "../../../icons/Close"
import Check from "../icons/Check"
import { ISettingPermission } from "../interfaces/permissions"

export default () => {
  const pageStrings = useGetPageStrings()
  const [mesages, setMessages] = useDialogMessagesStates()
  const [choiceIds, setChoiceIds] = useState([])
  const [notificationPermissions, setNotificationPermissions] = useState<
    ISettingPermission[]
  >([])
  const [locationPermissions, setLocaitonPermissions] = useState<
    ISettingPermission[]
  >([])

  const getNotificationPermisions = async () => {
    const res = await PostMessages.getNotificationPermisions()
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      setNotificationPermissions(res)
    }
  }

  const getLocationPermisions = async () => {
    const res = await PostMessages.getLocationPermisions()
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      setLocaitonPermissions(res)
    }
  }

  useEffect(() => {
    getNotificationPermisions()
    getLocationPermisions()
  }, [])

  const handleClickCheckbox = (id: string) => {
    if (choiceIds.find((choiceId) => choiceId === id)) {
      setChoiceIds(choiceIds.filter((choiceId) => choiceId != id))
    } else {
      setChoiceIds([...choiceIds, id])
    }
  }

  const handleClickDeleteBtn = async (id: string) => {
    const res = await PostMessages.deletePermissions([id])
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      const newNotiPerm = notificationPermissions.filter(
        (permData: ISettingPermission) => {
          return permData.id !== id
        }
      )
      const newLocPerm = locationPermissions.filter(
        (permData: ISettingPermission) => {
          return permData.id !== id
        }
      )
      setNotificationPermissions(newNotiPerm)
      setLocaitonPermissions(newLocPerm)
    }
  }

  const handleClickDeleteCheck = async () => {
    const res = await PostMessages.deletePermissions(choiceIds)
    if (res === "error") {
      setMessages([
        ...mesages,
        {
          isActive: true,
          message: pageStrings["An error occurred"]
        }
      ])
    } else {
      const newNotiPerm = notificationPermissions.filter(
        (permData: ISettingPermission) => {
          return !choiceIds.find((choiceId) => choiceId === permData.id)
        }
      )
      const newLocPerm = locationPermissions.filter(
        (permData: ISettingPermission) => {
          return !choiceIds.find((choiceId) => choiceId === permData.id)
        }
      )
      setNotificationPermissions(newNotiPerm)
      setLocaitonPermissions(newLocPerm)
      setChoiceIds([])
    }
  }

  const choiceHTMLText = () => {
    const string = pageStrings["$n were selected."]
    return string.replace("$n", `<span>${choiceIds.length}</span>`)
  }

  return (
    <$area>
      <h2>{pageStrings["Permission"]}</h2>
      <section>
        <p className="title">{pageStrings["Notification"]}</p>
        <$permissionBox>
          {notificationPermissions.length > 0 ? (
            <ul>
              {notificationPermissions.map(({ id, domain, isDenied }) => {
                return (
                  <li key={id}>
                    <div>
                      <$checkbox
                        className={
                          choiceIds.find((choiceId) => choiceId == id)
                            ? "active"
                            : ""
                        }
                        onClick={() => handleClickCheckbox(id)}
                      >
                        <Check />
                      </$checkbox>
                      <span className={isDenied ? "denied" : "allowed"}>
                        {isDenied
                          ? pageStrings["denied"]
                          : pageStrings["allowed"]}
                      </span>
                      <p>
                        <a href={domain} target="_blank">
                          {domain}
                        </a>
                      </p>
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
              <p>{pageStrings["There is no domain with permissions set."]}</p>
            </$empty>
          )}
        </$permissionBox>
      </section>
      <section>
        <p className="title">{pageStrings["Location"]}</p>
        <$permissionBox>
          {locationPermissions.length > 0 ? (
            <ul>
              {locationPermissions.map(({ id, domain, isDenied }) => {
                return (
                  <li key={id}>
                    <div>
                      <$checkbox
                        className={
                          choiceIds.find((choiceId) => choiceId == id)
                            ? "active"
                            : ""
                        }
                        onClick={() => handleClickCheckbox(id)}
                      >
                        <Check />
                      </$checkbox>
                      <span className={isDenied ? "denied" : "allowed"}>
                        {isDenied
                          ? pageStrings["denied"]
                          : pageStrings["allowed"]}
                      </span>
                      <p>
                        <a href={domain} target="_blank">
                          {domain}
                        </a>
                      </p>
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
              <p>{pageStrings["There is no domain with permissions set."]}</p>
            </$empty>
          )}
        </$permissionBox>
      </section>
      {choiceIds.length > 0 && (
        <$optionBar>
          <p
            className="message"
            dangerouslySetInnerHTML={{
              __html: choiceHTMLText()
            }}
          />
          <$deleteBtn onClick={handleClickDeleteCheck}>
            {pageStrings["Delete"]}
          </$deleteBtn>
          <$cancelBtn onClick={() => setChoiceIds([])}>
            {pageStrings["Cancel"]}
          </$cancelBtn>
        </$optionBar>
      )}
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

  .title {
    font-size: 12px;
    margin: 5px 32px;
    color: #888;
  }

  section {
    margin-bottom: 30px;
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
  width: 16px;
  height: 16px;
  border: 1px solid #bbb;
  border-radius: 4px;
  background: #fff;
  transition: all 0.3s;
  display: flex;
  align-items: center;
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

const $permissionBox = styled.div`
  padding: 7px 15px 6px;
  margin: 0 30px 15px;
  font-size: 13px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  @media (prefers-color-scheme: dark) {
    background: rgb(70, 70, 70);
    border-color: rgb(90, 90, 90);
    color: #fff;
  }

  ul {
    li {
      line-height: 30px;
      & > div {
        display: grid;
        grid-template-columns: 18px 80px 1fr 24px;
        gap: 10px;
        align-items: center;
        p {
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: inline-block;
          text-align: center;
          color: rgb(74, 148, 64);
          &.denied {
            color: rgb(218, 106, 106);
          }
        }
      }
    }
  }
`

const $empty = styled.div`
  font-size: 12px;
  padding: 10px 5px;
  color: #444;
  @media (prefers-color-scheme: dark) {
    color: rgb(180, 180, 180);
  }
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
