import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Header from './components/Header'
import PrivateRoutes from './utils/routes/PrivateRoutes'
import Home from './pages/Home'
import PublicRoutes from './utils/routes/PublicRoutes'
import Login from './pages/Login'
import Signup from './pages/Signup'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Header />}>
        <Route element={<PrivateRoutes />}>
          <Route index element={<Home />} />
        </Route>
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
