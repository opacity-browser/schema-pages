import { createBrowserRouter, RouterProvider } from "react-router"
import NewTab from "./components/pages/NewTab"

const router = createBrowserRouter([{ path: "*", element: <NewTab /> }])

export const Routes = () => {
  return <RouterProvider router={router} />
}
