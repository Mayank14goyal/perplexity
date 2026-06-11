import { createBrowserRouter } from "react-router"
import Login from "../feature/auth/pages/Login.jsx"
import Register from "../feature/auth/pages/Register.jsx"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Home Page</h1>
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