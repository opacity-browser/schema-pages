import { useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import GlobalStyles from './styles/GlobalStyles'
import Layout from './layouts/Layout'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

;(window as any).opacityResponse = {}

const App = () => {  
  return (
    <>
      <GlobalStyles />
      <RecoilRoot>
        <Layout />
      </RecoilRoot>
    </>
  )
}

root.render(
  <App />
)