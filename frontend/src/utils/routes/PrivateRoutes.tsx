import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../../contexts/UserContext"

export default function PrivateRoutes() {
  const { user } = useUserContext()
  return user?.token ? <Outlet /> : <Navigate to='login' />
}