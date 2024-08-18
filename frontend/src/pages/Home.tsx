import TodoList from "../components/TodoList"
import { useTodoContext } from "../contexts/TodoContext"
import { useUserContext } from "../contexts/UserContext"

export default function Home() {
  const { logout } = useUserContext()
  const { todos } = useTodoContext()

  const todosLeft = todos.filter(t => !t.completed).length

  return (
    <div className="lg:grid grid-cols-3 gap-8 border border-black">
      <div className="flex items-center justify-between mb-8 gap-8 lg:items-stretch lg:flex-col lg:mb-0">
        <span>{todosLeft} todos left</span>
        <button
          className="bg-emerald-500 hover:bg-emerald-600 rounded shadow py-1 px-4 text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="col-span-2 max-h-100 overflow-y-auto">
        <TodoList />
      </div>
    </div>
  )
}