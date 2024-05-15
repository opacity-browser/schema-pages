import styled from '@emotion/styled'
import { useGetPageStrings } from '../hooks/usePageStrings'

export default () => {
  const pageStrings = useGetPageStrings()
  return (
    <$area>
      <h2>{ pageStrings["Library"] }</h2>
      <p className="subtitle">{ pageStrings["This is a library used in service development."] }</p>
      <$libraryListBox>
        <ul>
          <li>
            <$libraryBox>
              <p className="title">ASN1Decoder</p>
              <p></p>
              <a href="https://github.com/filom/ASN1Decoder" target="_blank">https://github.com/filom/ASN1Decoder</a>
            </$libraryBox>
          </li>
          <li>
            <$libraryBox>
              <p className="title">tracker-radar</p>
              <p></p>
              <a href="https://github.com/duckduckgo/tracker-radar" target="_blank">https://github.com/duckduckgo/tracker-radar</a>
            </$libraryBox>
          </li>
        </ul>
      </$libraryListBox>
    </$area>
  )
}

const $area = styled.div`
  padding-bottom: 20px;
  h2 {
    padding: 41px 30px 29px;
    font-size: 18px;
    color: #222;
    line-height: 35px;
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }

  .subtitle {
    font-size: 12px;
    margin: 5px 32px;
    color: #888;
  }

  ul {
    margin: 0 0 0 10px;
    li {
      list-style: disc;
      &:not(:first-of-type) {
        margin-top: 15px;
      }
    }
  }
`

const $libraryListBox = styled.div`
  padding: 15px 20px;
  margin: 0 30px;
  font-size: 13px;
  border: 1px solid rgb(228, 228, 228);
  background: rgba(150, 150, 150, 0.05);
  border-radius: 10px;
  font-weight: 400;
  color: #444;

  @media (prefers-color-scheme: dark) {
    background: rgb(70, 70, 70);
    border-color: rgb(90, 90, 90);
    color: #fff;
  }
`

const $libraryBox = styled.div`
  .title {
    color: #222;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    @media (prefers-color-scheme: dark) {
      color: #fff;
    }
  }
  a {
    display: inline-block;
    color: rgb(70, 155, 235);
    font-size: 13px;
  }
`