import { useState } from "react"
import { useTodoContext } from "../contexts/TodoContext"
import { UpdateTodoType, TodoType } from "../utils/types"

type TodoProps = {
  todo: TodoType
}

export default function Todo({ todo }: TodoProps) {
  const { deleteTodo, updateTodo } = useTodoContext()
  const [isEditing, setIsEditing] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [form, setForm] = useState<UpdateTodoType>({
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
  })

  return (
    <li key={todo.id} className="bg-amber-100 p-4 rounded shadow min-h-60">
      {isEditing ? (
        <div className="flex flex-col h-full relative">
          <div className="flex items-center justify-between">
            <input
              type="text"
              className={`bg-amber-100 outline-none border-black border-b-2 px-2 font-semibold text-lg ${todo.completed && 'line-through opacity-50'}`}
              autoFocus
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <button onClick={() => setIsEditing(false)}>x</button>
          </div>
          <textarea
            className={`bg-amber-200 rounded p-1 outline-none leading-relaxed my-4 ${todo.completed && 'line-through opacity-50'}`}
            onChange={e => setForm({ ...form, description: e.target.value })}
          >
            {form.description}
          </textarea>
          <button
            className="place-self-end mt-auto flex gap-1"
            onClick={() => {
              setIsEditing(false)
              updateTodo(todo.id, form)
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full relative">
          <div className="flex items-center justify-between gap-2">
            <h2 className={`font-semibold text-lg ${todo.completed && 'line-through opacity-50'}`}>{todo.title}</h2>
            <button onClick={() => setIsModal(prev => !prev)}>...</button>
          </div>
          <div
            className={`${isModal ? 'block' : 'hidden'} z-10 absolute right-0 top-6 bg-white p-4 rounded shadow`}
          >
            <div className="flex flex-col items-start gap-2 w-24">
              <button onClick={() => {
                setIsModal(false)
                setIsEditing(true)
              }}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
          <p 
            className={`max-h-52 overflow-y-auto leading-relaxed my-4 ${todo.completed && 'line-through opacity-50'}`}
          >
            {todo.description}
          </p>
          <div className="place-self-end mt-auto flex gap-1">
            <input
              type="checkbox"
              id={`${todo.id}`}
              checked={todo.completed}
              onChange={e => {
                updateTodo(todo.id, { ...form, completed: e.target.checked })
              }}
            />
            <label htmlFor={`${todo.id}`}>Done</label>
          </div>
        </div>
      )}
    </li>
  )
}
