import { HashRouter, Route, Routes as ReactRouters } from "react-router"
import General from "./components/pages/General"
import SearchHistory from "./components/pages/SearchHistory"
import VisitHistory from "./components/pages/VisitHistory"
import Permissions from "./components/pages/Permissions"
import Library from "./components/pages/Library"

export const Routes = () => {
  return (
    <HashRouter>
      <ReactRouters>
        <Route path="/" element={<General />} />
        <Route path="/search-history" element={<SearchHistory />} />
        <Route path="/visit-history" element={<VisitHistory />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/library" element={<Library />} />
      </ReactRouters>
    </HashRouter>
  )
}
