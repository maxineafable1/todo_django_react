import { useState } from "react"
import { useTodoContext } from "../contexts/TodoContext"
import { CreateTodoType } from "../utils/types"

type TodoFromProps = {
  dialogRef: React.RefObject<HTMLDialogElement>
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TodoForm({ dialogRef, setIsAdding }: TodoFromProps) {
  const { createTodo } = useTodoContext()
  const [form, setForm] = useState<CreateTodoType>({
    title: '',
    description: '',
    tags: []
  })

  function getCheckboxValue(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value)
    console.log(e.target.checked)
    setForm({ ...form, tags: [...form.tags, e.target.value] })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => {
          dialogRef.current?.close()
          setIsAdding(false)
        }}>Cancel</button>
        <button
          onClick={() => {
            if (!form.title) return
            createTodo(form)
            dialogRef.current?.close()
            setIsAdding(false)
          }}
          className="bg-emerald-500 hover:bg-emerald-600 shadow px-12 py-2 text-white rounded-lg"
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
          style={{ height: '5rem' }}
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="px-2 py-2 bg-slate-100 rounded-lg max-h-52 overflow-y-auto"
        />
        <div className="flex items-center gap-4 mt-4">
          <div className="flex gap-1">
            <input onChange={getCheckboxValue} type="checkbox" id="work" value='work' />
            <label htmlFor="work">Work</label>
          </div>
          <div className="flex gap-1">
            <input onChange={getCheckboxValue} type="checkbox" id="study" value='study' />
            <label htmlFor="study">Study</label>
          </div>
          <div className="flex gap-1">
            <input onChange={getCheckboxValue} type="checkbox" id="entertainment" value='entertainment' />
            <label htmlFor="entertainment">Entertainment</label>
          </div>
          <div className="flex gap-1">
            <input onChange={getCheckboxValue} type="checkbox" id="family" value='family' />
            <label htmlFor="family">Family</label>
          </div>
        </div>
      </form>
    </div>
  )
}
