import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import PostMessages from '../adapters/PostMessages'
import { useDialogMessagesStates } from '../hooks/DialogMessages'
import Close from '../icons/Close'
import Check from '../icons/Check'
import { INotificationPermission } from '../interfaces/permissions'

export default () => {
  const [mesages, setMessages] = useDialogMessagesStates()
  const [choiceIds, setChoiceIds] = useState([])
  const [notificationPermissions, setNotificationPermissions] = useState<INotificationPermission[]>([])

  const getNotificationPermisions = async () => {
    const res = await PostMessages.getNotificationPermisions()
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: "An error occurred"
      }])
    } else {
      setNotificationPermissions(res)
    }
  }

  useEffect(() => {
    getNotificationPermisions()
  }, [])

  const handleClickCheckbox = (id: string) => {
    if(choiceIds.find(choiceId => choiceId === id)) {
      setChoiceIds(choiceIds.filter(choiceId => choiceId != id))
    } else {
      setChoiceIds([...choiceIds, id])
    }
  }

  const handleClickDeleteBtn = async (id: string) => {
    const res = await PostMessages.deleteNotificationPermissions([id])
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: "An error occurred"
      }])
    } else {
      const newNotiPerm = notificationPermissions.filter((permData: INotificationPermission) => {
        return permData.id !== id
      })
      setNotificationPermissions(newNotiPerm)
    }
  }

  const handleClickDeleteCheck = async () => {
    const res = await PostMessages.deleteNotificationPermissions(choiceIds)
    if(res === "error") {
      setMessages([...mesages, {
        isActive: true,
        message: "An error occurred"
      }])
    } else {
      const newNotiPerm = notificationPermissions.filter((permData: INotificationPermission) => {
        return !choiceIds.find(choiceId => choiceId === permData.id)
      })
      setNotificationPermissions(newNotiPerm)
      setChoiceIds([])
    }
  }
  
  return (
    <$area>
      <h2>Permission</h2>
      <p className='title'>Notification</p>
      <$permissionBox>
        {notificationPermissions.length > 0 ? (
          <ul>
            {notificationPermissions.map(({ id, domain, isDenied }) => {
              return (
                <li key={id}>
                  <div>
                    <$checkbox 
                      className={choiceIds.find((choiceId) => choiceId == id) ? "active" : ""}
                      onClick={() => handleClickCheckbox(id)}
                    >
                      <Check />
                    </$checkbox>
                    <span className={isDenied ? "denied" : "allowed"}>
                      {isDenied ? "denied" : "allowed"}
                    </span>
                    <p>{domain}</p>
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
            <p>There are no domains with notification permissions set.</p>
          </$empty>
        )}
      </$permissionBox>
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

  &.active {
    border: 1.5px rgb(70, 155, 235);
    background: rgb(70, 155, 235);
  }
  svg {
    width: 14px;
    height: auto;
  }
`

const $permissionBox = styled.div`
  padding: 6px 15px 6px;
  margin: 0 30px 15px;
  font-size: 13px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  ul {
    li {
      line-height: 30px;
      div {
        display: flex;
        align-items: center;
        p {
          flex-grow: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: inline-block;
          width: 80px;
          min-width: 80px;
          padding-left: 15px;
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
  font-size: 14px;
  padding: 12px 0;
  color: #444;
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