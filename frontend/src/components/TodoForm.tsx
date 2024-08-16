import { useState } from "react"
import { useTodoContext } from "../contexts/TodoContext"

type TodoFromProps = {
  dialogRef: React.RefObject<HTMLDialogElement>
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoForm({ dialogRef, setIsAdding }: TodoFromProps) {
  const { createTodo } = useTodoContext()
  const [form, setForm] = useState({
    title: '',
    description: ''
  })

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => {
          dialogRef.current?.close()
          setIsAdding(false)
        }}>Cancel</button>
        <button
          onClick={() => {
            createTodo(form)
            dialogRef.current?.close()
            setIsAdding(false)
          }}
          className="bg-emerald-950 px-12 py-2 text-white rounded-lg"
        >
          Add
        </button>
      </div>
      <form
        onSubmit={e => {
          createTodo(form, e)
          dialogRef.current?.close()
          setIsAdding(false)
        }}
        className="flex-1 flex flex-col"
      >
        <div className="grid mb-4">
          <label htmlFor="title" className="font-bold text-xl mb-2">Title</label>
          <input
            type="text"
            placeholder="add a title..."
            id="title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="px-2 py-1 bg-slate-100 rounded-lg"
            autoFocus
            required
          />
        </div>
        <label htmlFor="description" className="font-bold text-xl mb-2">Description</label>
        <textarea
          id="description"
          placeholder="add a description..."
          style={{ height: '100%' }}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="px-2 py-2 bg-slate-100 rounded-lg"
        />
      </form>
    </div>
  )
}
