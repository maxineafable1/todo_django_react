import { Link, Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function Header() {
  const { user, logout } = useUserContext()

  return (
    <>
      <header>
        <nav className="flex gap-4">
          <Link to='/'>Home</Link>
          {user.username ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to='login'>Login</Link>
              <Link to='signup'>Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
