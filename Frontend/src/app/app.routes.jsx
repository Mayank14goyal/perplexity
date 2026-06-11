import { createBrowserRouter } from "react-router"
import Login from "../feature/auth/pages/Login.jsx"
import Register from "../feature/auth/pages/Register.jsx"
import Dashbord from "../feature/chat/pages/Dashbord.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashbord/>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])