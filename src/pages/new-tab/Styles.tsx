import { Global, css } from '@emotion/react'

const Styles = () => {
  return (
    <Global styles={css`
        * {
        -webkit-user-select: none;
        box-sizing: border-box;
      }
    `} />
  )
}

export default Styles