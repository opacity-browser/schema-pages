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
        @media (prefers-color-scheme: dark) {
          background: rgb(30, 30, 30);
          color: #fff;
        }
      }
    `} />
  )
}

export default Styles