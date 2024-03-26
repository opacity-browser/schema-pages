import ReactDOM from 'react-dom/client'
import GlobalStyles from './styles/GlobalStyles'
import Layout from './layouts/Layout'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
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