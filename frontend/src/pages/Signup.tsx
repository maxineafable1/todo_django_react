import { Link } from "react-router-dom"
import { useUserContext } from "../contexts/UserContext"

export default function Signup() {
  const { signup } = useUserContext()

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={signup} className="flex flex-col gap-4 bg-white p-4 border-none rounded shadow w-96">
        <h2 className="text-center text-xl">Create Account</h2>
        <div className="grid gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="px-4 py-1 border rounded"
            autoFocus
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            className="px-4 py-1 border rounded"
            required
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            name="password"
            className="px-4 py-1 border rounded"
            required
          />
        </div>
        <button className="bg-green-500 text-white rounded py-1 mt-8 hover:bg-green-600 transition duration-100 ease-in">Sign up</button>
        <div className="mt-2 flex justify-center gap-1">
          <span className="text-sm">Already have an account?</span>
          <Link to='/login' className="text-sm text-blue-500">Sign in</Link>
        </div>
      </form>

    </div>
  )
}
