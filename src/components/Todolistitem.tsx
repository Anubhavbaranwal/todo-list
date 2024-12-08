'use client';
import { useEffect, useMemo, useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import TodoItem from './TodoItem';
import { Todo } from '../store/todoStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoGroup = ({
  title,
  todos,
  droppableId,
}: {
  title: string;
  todos: Todo[];
  droppableId: string;
}) => (
  <Droppable droppableId={droppableId}>
    {(provided) => (
      <div
        className="w-1/3 px-2"
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoItem {...todo} />
                </div>
              )}
            </Draggable>
          ))
        ) : (
          <p className="text-gray-500 italic">No tasks in {title}</p>
        )}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

const TodoList = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const todos = useTodoStore((state) => state.todos);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const filteredTodos = selectedDate ? todos.filter(todo => todo.date === selectedDate) : todos;

  const groupedTodos = useMemo(() => {
    return filteredTodos.reduce<Record<string, { pending: Todo[]; 'in-progress': Todo[]; done: Todo[] }>>((acc, todo) => {
      const date = todo.date;
      if (!acc[date]) {
        acc[date] = { pending: [], 'in-progress': [], done: [] };
      }
      acc[date][todo.status]?.push(todo);
      return acc;
    }, {});
  }, [filteredTodos]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const movedTodo = todos.find(todo => todo.id === result.draggableId);

    if (movedTodo) {
      const newStatus = destination.droppableId.toLowerCase();
      useTodoStore.getState().updateTodo(movedTodo.id, { status: newStatus });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <input 
          type="date" 
          value={selectedDate} 
          onChange={handleDateChange} 
          className="mb-4"
        />
        <div className="space-y-6">
          {filteredTodos.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <h2 className="text-2xl font-semibold">No tasks available</h2>
              <p>Add tasks to see them listed here.</p>
            </div>
          )}
          {Object.keys(groupedTodos).map((date) => (
            <div key={date} className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-bold mb-4">{date}</h2>
              <div className="flex justify-between gap-10">
                <TodoGroup title="Pending" todos={groupedTodos[date].pending} droppableId="pending" />
                <TodoGroup title="In Progress" todos={groupedTodos[date]['in-progress']} droppableId="in-progress" />
                <TodoGroup title="Done" todos={groupedTodos[date].done} droppableId="done" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
