export interface TodoState {
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

  export interface TodoUpdates {
    title?: string;
    description?: string;
    date?: string;
    time?: string;
    status?: 'pending' | 'in-progress' | 'done';
  }

  export interface Todo {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    status: 'pending' | 'in-progress' | 'done';
  }