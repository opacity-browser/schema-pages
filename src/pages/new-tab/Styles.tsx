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
      }

      body {
        font-family: 'Apple SD Gothic Neo', sans-serif;
        background: rgb(250, 250, 250);
        @media (prefers-color-scheme: dark) {
          background: rgb(52, 52, 52);
          color: #fff;
        }
      }
    `} />
  )
}

export default Styles