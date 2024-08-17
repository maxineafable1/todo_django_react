import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import TodoForm from "./TodoForm";

export default function Header() {
  // const { user, logout } = useUserContext()
  const [isAdding, setIsAdding] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (isAdding) {
      dialog?.showModal()
    }

    function closeModal(e: MouseEvent) {
      if (!dialog) return
      const dialogDimensions = dialog.getBoundingClientRect()
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        dialog.close()
        setIsAdding(false)
      }
    }

    dialog?.addEventListener("click", closeModal)
    return () => {
      dialog?.removeEventListener('click', closeModal)
    }
  }, [isAdding])

  return (
    <div className="max-w-screen-lg m-4 lg:mx-auto p-8 rounded shadow bg-white">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl">todo</h1>
        <button
          className="text-4xl"
          onClick={() => setIsAdding(true)}
        >
          +
        </button>
        <dialog
          ref={dialogRef}
          className="p-10 w-[800px] h-96 rounded-lg shadow"
        >
          <TodoForm dialogRef={dialogRef} setIsAdding={setIsAdding} />
        </dialog>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}