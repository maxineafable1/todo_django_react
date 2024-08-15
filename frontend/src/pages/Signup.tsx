import { useUserContext } from "../contexts/UserContext"

export default function Signup() {
  const { signup } = useUserContext()

  return (
    <div>
      <form onSubmit={signup}>
        <input type="text" name="username" placeholder="enter username" />
        <input type="email" name="email" placeholder="enter email" />
        <input type="password" name="password" placeholder="enter password" />
        <button>Sign up</button>
      </form>
    </div>
  )
}
