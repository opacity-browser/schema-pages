import ReactDOM from 'react-dom/client'
import Styles from './Styles'
import Content from './components/Content'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

const App = () => {
  return (
    <>
      <Styles />
      <Content />
    </>
  )
}

root.render(
  <App />
)