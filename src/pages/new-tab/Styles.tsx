import { Global, css } from '@emotion/react'

const Styles = () => {
  return (
    <Global styles={css`
      * {
        -webkit-user-select: none;
        box-sizing: border-box;
      }

      html, body, #wrap {
        height: 100%;
        margin: 0;
        font-family: 'Apple SD Gothic Neo', sans-serif;
      }
    `} />
  )
}

export default Styles