import { useEffect, useState } from "react"
import { useUserContext } from "../contexts/UserContext"
import TodoList from "../components/TodoList"

export type TodoType = {
  id: number
  user: number
  title: string
  description: string | null
  completed: boolean
  created: string
  updated: string
}

export default function Home() {
  const { user: { username, token }, logout } = useUserContext()
  const [todos, setTodos] = useState<TodoType[]>([])

  useEffect(() => {
    const abortController = new AbortController()
    async function getTodos() {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/todos/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          },
          signal: abortController.signal
        })
        const data = await res.json()
        if (!res.ok) {
          logout()
          throw new Error(data);
        }
        setTodos(data)
      } catch (error) {
        if (error instanceof Error)
          console.log(error.message)
      }
    }

    getTodos()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div className="lg:flex gap-8">
      <div className="flex w-full gap-4 mb-8 lg:block lg:mb-0">
        <p>work</p>
        <p>study</p>
      </div>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}