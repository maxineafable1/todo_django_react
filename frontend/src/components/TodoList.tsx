import { useUserContext } from "../contexts/UserContext"
import { TodoType } from "../pages/Home"
import Todo from "./Todo"

type TodoListProps = {
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
}

export type FormType = {
  title: string
  description: string | null
  completed: boolean
}

export default function TodoList({ todos, setTodos }: TodoListProps) {
  const { user: { token } } = useUserContext()

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

  async function updateTodo(id: number, form: FormType) {
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

  return (
    <ul className="grid sm:grid-cols-2 gap-4 sm:max-h-100 sm:overflow-y-auto">
      {todos && todos.map((todo: TodoType) => (
        <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      ))}
    </ul>
  )
}
