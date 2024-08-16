import TodoList from "../components/TodoList"

export default function Home() {
  return (
    <div className="lg:flex gap-8">
      <div className="flex w-full gap-4 mb-8 lg:block lg:mb-0">
        <p>work</p>
        <p>study</p>
      </div>
      <TodoList />
    </div>
  )
}