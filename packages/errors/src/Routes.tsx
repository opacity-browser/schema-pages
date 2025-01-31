import { createBrowserRouter, RouterProvider } from "react-router"
import Error from "./components/pages/Error"

const router = createBrowserRouter([{ path: "/", element: <Error /> }])

export const Routes = () => {
  return <RouterProvider router={router} />
}
