import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hook/useAuth.js"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"

const Login = () => {
  const { handleLogin } = useAuth()


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const user = useSelector(state =>state.auth.user)
  // const loading = useSelector(state=>state.auth.loading)

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleLogin(formData)
    navigate("/")
  }

  if(user){
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">welcome back</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Login</h1>
          <p className="mt-2 text-sm text-slate-300">Sign in to continue with your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-800 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-slate-700"
          >
            Log In
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-cyan-300 hover:text-cyan-100">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login