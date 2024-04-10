import { Global, css } from '@emotion/react'

export default () => {
  return (
    <Global styles={css`
      * {
      -webkit-user-select: none;
      box-sizing: border-box;
      }

      html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        color: #666;
        font-family: 'Apple SD Gothic Neo', sans-serif;
        background: rgb(255, 255, 255);
        @media (prefers-color-scheme: dark) {
          background: rgb(52, 52, 52);
          color: #fff;
        }
      }

      #wrap {
        height: 100%;
      }

      h1, h2, p {
        margin: 0;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul {
        padding: 0;
        margin: 0;
        li {
          list-style: none;        
        }
      }
    `} />
  )
}