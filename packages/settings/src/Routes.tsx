import { HashRouter, Route, Routes as ReactRouters } from "react-router"
import General from "./components/pages/General"
import SearchHistory from "./components/pages/SearchHistory"
import VisitHistory from "./components/pages/VIsitHistory"

export const Routes = () => {
  return (
    <HashRouter>
      <ReactRouters>
        <Route path="/" element={<General />} />
        <Route path="/search-history" element={<SearchHistory />} />
        <Route path="/visit-history" element={<VisitHistory />} />
      </ReactRouters>
    </HashRouter>
  )
}
