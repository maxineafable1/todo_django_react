import { useTodoContext } from "../contexts/TodoContext"
import { TodoType } from "../utils/types"
import Todo from "./Todo"

export default function TodoList() {
  const { todos } = useTodoContext()
  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {todos && todos.map((todo: TodoType) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
