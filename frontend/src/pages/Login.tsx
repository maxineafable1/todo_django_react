import { Link } from "react-router-dom"
import { useUserContext } from "../contexts/UserContext"
import { useState } from "react"

export default function Login() {
  const { login } = useUserContext()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={e => login(e, form)} className="flex flex-col gap-4 bg-white p-4 border-none rounded shadow w-96">
        <h2 className="text-center text-xl">Login</h2>
        <div className="grid gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="px-4 py-1 border rounded"
            autoFocus
            required
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            name="password"
            className="px-4 py-1 border rounded"
            required
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
        </div>
        <button className="bg-emerald-500 text-white rounded py-1 mt-8 hover:bg-green-600 transition duration-100 ease-in">Login</button>
        <div className="mt-2 flex justify-center gap-1">
          <span className="text-sm">Don't have an account?</span>
          <Link to='/signup' className="text-sm text-blue-500">Sign up</Link>
        </div>
      </form>

    </div>
  )
}
