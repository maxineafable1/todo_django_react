export type TodoType = {
  id: number
  user: number
  title: string
  description: string | null
  completed: boolean
  created: string
  updated: string
}

export type CreateTodoType = {
  title: string
  description: string | null
}

export type UpdateTodoType = {
  completed: boolean
} & CreateTodoType


export type UserType = {
  username: string | null
  token: string | null
}

export type UserLoginType = {
  username: string
  password: string
}

export type CreateUserType = {
  email: string
} & UserLoginType

export type UserContextType = {
  user: UserType
  signup: (e: React.FormEvent<HTMLFormElement>, form: CreateUserType) => void
  login: (e: React.FormEvent<HTMLFormElement>, form: UserLoginType) => void
  logout: () => void
}

export type TodoContextType = {
  todos: TodoType[]
  createTodo: (e: React.FormEvent<HTMLFormElement>, form: CreateTodoType) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, form: UpdateTodoType) => void
}