import { useUserContext } from "../contexts/UserContext"

export default function Login() {
  const { login } = useUserContext()

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="email"
          name="email"
          placeholder="enter email"
          className="border border-black"
        />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          className="border border-black"
        />
        <button>Login</button>
      </form>
    </div>
  )
}
