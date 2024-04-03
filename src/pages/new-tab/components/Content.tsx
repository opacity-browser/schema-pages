import styled from '@emotion/styled'
import { Clock } from '../items/Clock'
import { Logo } from '../items/Logo'
import Shortcut from './Shortcut'

export default () => {


  return (
    <$area>
      <$content>
        <$box>
          <Clock />
          <Shortcut />
        </$box>
      </$content>
      <$logo>
        <Logo />
      </$logo>
    </$area>
  )
}

const $area = styled.div`
  height: 100%;
`

const $logo = styled.div`
  padding: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #bbb;
  font-size: 12px;
  line-height: 16px;
  img {
    filter: invert(100%);
  }
`

const $content = styled.div`
  height: 100%;
  min-height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`

const $box = styled.div`
  width: 460px;
  // padding-top: 80px;
  margin-top: -60px;
`