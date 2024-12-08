'use client';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

const AddTodoForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim() && date && time) {
      addTodo(title, description, date, time);
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setIsModalOpen(false); 
    }
  };

  return (
    <>
    <div className='flex justify-end m-4'>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 bg-blue-500 text-white rounded flex justify-end items-end"
      >
        Add Task
      </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Task description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoForm;
