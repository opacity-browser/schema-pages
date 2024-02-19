import { css } from '@emotion/react'

export const Logo = () => {
  return (
    <div css={css`
    padding: 15px 20px;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #bbb;
    font-size: 12px;
    line-height: 16px;
  `}>
    <div css={css``}>
      <img src="/imgs/logo.png" alt="" width="25"/>
    </div>
  </div>
  )
}