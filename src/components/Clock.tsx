import { useEffect, useState } from 'react'
import { css } from '@emotion/react'

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

  useEffect(() => {
    const timerID = setInterval(() => tick(), 300)
    return () => {
      clearInterval(timerID)
    }
  }, [])

  const tick = () => {
    const { ampmString, hoursString, minutesString, monthString, dateString } = tickData()
    const formattedTime = `${hoursString}:${minutesString}`
    setAmpm(ampmString)
    setTime(formattedTime)
    setMonth(monthString)
    setDate(dateString)
  }

  return (
    <div css={css`
      font-family: Futura;
      color: #fff;
      text-align: center;
      margin-top: 40px;
    `}>
      <h2 css={css`
        margin: 0;
        font-size: 120px;
        text-shadow: 2px 2px 30px rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      `}>
        <div css={css`
          display: inline-block;
          margin-right: 20px;
        `}>
          <p css={css`
            font-size: 24px;
            margin: 15px 0 0 0;
          `}>
            <span css={css`
              display: inline-block;
              margin-right: 4px;
            `}>
              {month}.
            </span>{date}
          </p>
          <p css={css`
            font-size: 48px;
            margin-right: 20px;
            opacity: 0.6;
            margin: 0;
          `}>{ampm}</p>
        </div>
        {time}
      </h2>
    </div>
  )
}