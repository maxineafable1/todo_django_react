import { useState } from "react"
import { useTodoContext } from "../contexts/TodoContext"

export default function TodoForm() {
  const { createTodo } = useTodoContext()
  const [form, setForm] = useState({
    title: '',
    description: ''
  })

  return (
    <div>
      <div className="flex items-center justify-between">
        <button>Cancel</button>
        <button>Add</button>
      </div>
      <form
        onSubmit={e => createTodo(e, form)}
        className=""
      >
        <div>
          <div className="grid gap-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="add a title..."
              id="title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="border border-black"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description">Description</label>
            <textarea
              rows={4}
              id="description"
              placeholder="add a description..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="border border-black"
            />
          </div>
        </div>
        <button className="border border-black">Add todo</button>
      </form>
    </div>
  )
}
