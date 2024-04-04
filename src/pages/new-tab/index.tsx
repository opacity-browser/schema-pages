import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import Styles from './Styles'
import Content from './components/Content';

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container as HTMLElement)

;(window as any).opacityResponse = {}

const App = () => {
  return (
    <>
      <Styles />
      <RecoilRoot>
        <Content />
      </RecoilRoot>
    </>
  )
}

root.render(
  <App />
)