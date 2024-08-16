import { createContext, useContext, useState } from "react";

type UserType = {
  username: string | null
  token: string | null
}

type UserContextType = {
  user: UserType
  signup: (e: React.FormEvent<HTMLFormElement>) => void
  login: (e: React.FormEvent<HTMLFormElement>) => void
  logout: () => void
}

const initialUserContext: UserContextType = {
  user: {
    username: '',
    token: '',
  },
  signup: () => { },
  login: () => { },
  logout: () => { }
}

const UserContext = createContext(initialUserContext)

type UserProviderProps = {
  children: React.ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserType>(() => {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      const user = JSON.parse(userStorage)
      return { username: user.username, token: user.token }
    }
    return { username: null, token: null }
  })

  async function signup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.currentTarget.username.value,
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value
        })
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        throw new Error(data);
      }
      setUser({
        username: data.username,
        token: data.token,
      })
      localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      if (error instanceof Error)
        console.log(error.message)
    }
  }

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('login')
    try {
      const res = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: e.currentTarget.username.value, password: e.currentTarget.password.value })
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        throw new Error(data);
      }
      setUser({
        username: data.username,
        token: data.token,
      })
      localStorage.setItem('user', JSON.stringify(data))
    } catch (error) {
      if (error instanceof Error)
        console.log(error.message)
    }
  }

  function logout() {
    setUser({
      username: null,
      token: null
    })
    localStorage.removeItem('user')
  }

  const contextValue = {
    user,
    signup,
    login,
    logout
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const userContext = useContext(UserContext)
  if (!useContext) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return userContext
}