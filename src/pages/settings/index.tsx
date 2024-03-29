import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles/GlobalStyles'
import Layout from './layouts/Layout'
import { useEffect, useLayoutEffect } from 'react'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  useLayoutEffect(() => {
    (window as any).opacityResponse = {}
  }, [])
  return (
    <>
      <GlobalStyles />
      <Layout />
    </>
  )
}

root.render(
  <App />
)