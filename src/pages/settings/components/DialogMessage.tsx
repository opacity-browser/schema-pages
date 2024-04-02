import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useSetDialogMessages } from '../hooks/useDialogMessages'

export default ({ isActive, message, index }) => {
  const setMessages = useSetDialogMessages()

  useEffect(() => {
    setTimeout(() => {
      setMessages(prevErrorMesages => {
        const newErrorMessages = [...prevErrorMesages]
        newErrorMessages[index] = {
          isActive: false,
          message: ""
        }
        return newErrorMessages
      })
    }, 2000)
  }, [])

  return (
    <>
      {isActive && (
        <$messageArea>
          <p>{message}</p>
        </$messageArea>
      )}
    </>
  )
}

const $messageArea = styled.div`
  text-align: center;
  margin-bottom: 8px;
  font-size: 14px;
  & > p {
    display: inline-block;
    padding: 10px 25px;
    background: #f07a2d;
    text-shadow: 0 0 2px rgba(192, 97, 35, 0.5);
    border-radius: 20px;
    color: #fff;
  }
`