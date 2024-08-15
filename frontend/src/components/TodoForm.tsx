import { useRef } from "react"
import { useUserContext } from "../contexts/UserContext"
import { TodoType } from "../pages/Home"

type TodoFormProps = {
  todos: TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
}

export default function TodoForm({ todos, setTodos }: TodoFormProps) {
  const { user: { token } } = useUserContext()
  const titleRef = useRef<HTMLInputElement>(null)

  async function createTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await fetch('http://127.0.0.1:8000/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          title: e.currentTarget.todoTitle.value,
          description: e.currentTarget.todoDescription.value,
        })
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

  return (
    <div>
      <form onSubmit={createTodo}>
        <div className="flex gap-4">
          <input
            ref={titleRef}
            type="text"
            placeholder="enter todo"
            name="todoTitle"
            className="border border-black"
          />
          <textarea
            name="todoDescription"
            className="border border-black"
          />
        </div>
        <button className="border border-black">Add todo</button>
      </form>
    </div>
  )
}
