import AddTodoForm from "@/components/AddTodoForm";

import TodoList from "@/components/Todolistitem";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
    <AddTodoForm />
    <TodoList />
  </div>
  );
}
