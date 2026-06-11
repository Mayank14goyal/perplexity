import { useState } from "react"
import { Link } from "react-router"

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Register submit', formData)
    // Add your register request logic here
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_35%),
    linear-gradient(135deg,#000000,#020617_40%,#040811_100%)] text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-black/90 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">create account</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Register</h1>
          <p className="mt-2 text-sm text-slate-300">Create your account and join the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Username</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25"
            />
          </label>

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
              placeholder="Choose a password"
              required
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/25"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-right from-cyan-500 via-cyan-400 to-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-black transition hover:brightness-110"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-cyan-300 hover:text-cyan-100">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register