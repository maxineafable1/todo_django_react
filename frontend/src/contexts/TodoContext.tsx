import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";
import { CreateTodoType, UpdateTodoType, TodoContextType, TodoType } from "../utils/types";

const initialTodoContext: TodoContextType = {
  todos: [],
  createTodo: () => { },
  deleteTodo: () => { },
  updateTodo: () => { },
}

const TodoContext = createContext(initialTodoContext)

type TodoProviderProps = {
  children: React.ReactNode
}

export function TodoProvider({ children }: TodoProviderProps) {
  const { user: { token }, logout } = useUserContext()
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
  }, [token])

  async function createTodo(form: CreateTodoType, e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    try {
      const res = await fetch('http://127.0.0.1:8000/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        throw new Error(data);
      }
      setTodos([...todos, data])
    } catch (error) {
      if (error instanceof Error)
        console.log(error.message)
    }
  }

  async function deleteTodo(id: number) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        throw new Error(data);
      }
      console.log(data)
      setTodos(data)
    } catch (error) {
      if (error instanceof Error)
        console.log(error.message)
    }
  }

  async function updateTodo(id: number, form: UpdateTodoType) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data)
        throw new Error(data);
      }
      console.log(data)
      setTodos(data)
    } catch (error) {
      if (error instanceof Error)
        console.log(error.message)
    }
  }

  const contextValue = {
    todos,
    createTodo,
    deleteTodo,
    updateTodo,
  }

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodoContext() {
  const todoContext = useContext(TodoContext)
  if (!todoContext) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return todoContext
}