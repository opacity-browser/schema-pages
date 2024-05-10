import { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const tickData = () => {
  const now = new Date()
  const hours = now.getHours()
  const ampmString = hours >= 12 ? 'PM' : 'AM'
  const hoursString = String(now.getHours()).padStart(2, '0')
  const minutesString = String(now.getMinutes()).padStart(2, '0')
  const monthString = String(now.getMonth() + 1).padStart(2, '0')
  const dateString = String(now.getDate()).padStart(2, '0')

  return { ampmString, hoursString, minutesString, monthString, dateString }
}

export const Clock = () => {
  const { ampmString, hoursString, minutesString, monthString, dateString } = tickData()
  const formattedTime = `${hoursString}:${minutesString}`
  const [ampm, setAmpm] = useState<string>(ampmString)
  const [time, setTime] = useState<string>(formattedTime)
  const [month, setMonth] = useState(monthString)
  const [date, setDate] = useState(dateString)

  const tick = () => {
    const { ampmString, hoursString, minutesString, monthString, dateString } = tickData()
    const formattedTime = `${hoursString}:${minutesString}`
    setAmpm(ampmString)
    setTime(formattedTime)
    setMonth(monthString)
    setDate(dateString)
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 500)
    return () => {
      clearInterval(timerID)
    }
  }, [])

  return (
    <$clockArea>
      <h2>
        <div>
          <$date>
          <span>{month}.</span>{date}
          </$date>
          <$ampm>{ampm}</$ampm>
        </div>
        {time}
      </h2>
    </$clockArea>
  )
}

const $clockArea = styled.div`
  // font-family: Quicksand;
  font-family: "Quicksand", sans-serif;
  text-align: center;
  margin-left: -4px;

  h2 {
    margin: 0;
    font-size: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    & > div {
      display: inline-block;
      margin-right: 10px;
    }
  }
`

const $ampm = styled.p`
  font-size: 32px;
  margin-right: 20px;
  opacity: 0.5;
  margin: 0;
  line-height: 32px;
  letter-spacing: -0.3px;
`

const $date = styled.p`
  font-size: 18px;
  margin: 8px 0 0 0;
  span {
    display: inline-block;
    margin-right: 4px;
    letter-spacing: -0.3px;
  }
`