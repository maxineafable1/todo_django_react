import { useState } from "react"
import { TodoType } from "../pages/Home"
import { FormType } from "./TodoList"

type TodoProps = {
  todo: TodoType
  deleteTodo: (id: number) => void
  updateTodo: (id: number, form: FormType) => void
}

export default function Todo({ todo, deleteTodo, updateTodo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<FormType>({
    title: todo.title,
    description: todo.description,
    completed: todo.completed
  })

  return (
    <li key={todo.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            id={`${todo.id}`}
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            id={`${todo.id}`}
            value={form.description as string}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <div>
            <button onClick={() => setIsEditing(false)}>cancel</button>
            <button onClick={() => {
              if (!form.title) return
              updateTodo(todo.id, form)
              setIsEditing(false)
            }}>save</button>
          </div>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            id={`${todo.id}`}
            checked={todo.completed}
            onChange={e => {
              updateTodo(todo.id, {...form, completed: e.target.checked})
            }}
          />
          <label htmlFor={`${todo.id}`}>{todo.title}</label>
          <p>{todo.description}</p>
          <div>
            <button onClick={() => setIsEditing(true)}>edit</button>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </div>
        </>
      )}
    </li>
  )
}
