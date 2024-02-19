import { css } from '@emotion/react'

export const Copyright = () => {
  return (
    <div css={css`
      padding: 15px 20px;
      position: fixed;
      bottom: 0;
      right: 0;
      color: #bbb;
      font-size: 12px;
      line-height: 16px;
      opacity: 0.5;
      a {
        text-decoration: none;
        color: #fff;
      }
    `}>
      <p css={css`
        padding: 0;
        margin: 0;
      `}>
        Photo by <a target="_blank" href="https://unsplash.com/@still_loony?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Nadiia Ploshchenko 🇺🇦</a><br />
        on <a target="_blank" href="https://unsplash.com/photos/grayscale-photo-of-plant-leaf-pb4HW4KghiM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
    </div>
  )
}
  