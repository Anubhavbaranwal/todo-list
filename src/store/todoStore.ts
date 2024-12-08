import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'in-progress' | 'done';
}

interface TodoState {
  todos: Todo[];
  addTodo: (
    title: string,
    description: string,
    date: string,
    time: string
  ) => void;
  updateTodo: (
    id: string,
    updates:TodoUpdates
  ) => void;
  deleteTodo: (id: string) => void;
}
interface TodoUpdates {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  status?: 'pending' | 'in-progress' | 'done';
}

export const useTodoStore = create<TodoState>()(
  persist(
    immer((set) => ({
      todos: [],
      addTodo: (title, description, date, time) => {
        set((state) => {
          const newTodo: Todo = {
            id: uuidv4(),
            title,
            description,
            date,
            time,
            status: 'pending',
          };
          state.todos.push(newTodo);
        });
      },
      updateTodo: (id, updates) => {
        set((state) => {
          const todo = state.todos.find((todo) => todo.id === id);
          if (todo) {
            if (updates.title) todo.title = updates.title;
            if (updates.description) todo.description = updates.description;
            if (updates.date) todo.date = updates.date;
            if (updates.time) todo.time = updates.time;
            if (updates.status) todo.status = updates.status;
          }
        });
      },
      deleteTodo: (id) => {
        set((state) => {
          state.todos = state.todos.filter((todo) => todo.id !== id);
        });
      },
    })),
    {
      name: 'todo-storage',
    }
  )
);
