import { HashRouter, Route, Routes as ReactRouters } from "react-router"
import General from "./components/pages/General"
import SearchHistory from "./components/pages/SearchHistory"

export const Routes = () => {
  return (
    <HashRouter>
      <ReactRouters>
        <Route path="/" element={<General />} />
        <Route path="/search-history" element={<SearchHistory />} />
      </ReactRouters>
    </HashRouter>
  )
}
