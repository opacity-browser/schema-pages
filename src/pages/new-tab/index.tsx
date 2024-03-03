import ReactDOM from 'react-dom/client'
import { css } from '@emotion/react'
import { Copyright } from '../../components/Copyright'
import { Logo } from '../../components/Logo'
// import { Search } from '../../components/Search'
import { Clock } from '../../components/Clock'
import Styles from './Styles'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <>
      <Styles />
      <div css={css`
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url(/imgs/tab_bg.avif) #000;
        background-size: cover;
        background-position: center;
      `}>
        <div css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
        `}>
          <div css={css`
            margin-bottom: 10%;
            width: 50%;
            min-width: 400px;
          `}>
            {/* <Search /> */}
            <Clock />
          </div>
        </div>
        <Logo />
        <Copyright />
      </div>
    </>
  )
}

root.render(
  <App />
)