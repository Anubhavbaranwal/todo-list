'use client';
import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  status: 'pending' | 'in-progress' | 'done';
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, description, date, time, status }) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedText, setEditedText] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTime, setEditedTime] = useState(time);
  const [editedStatus, setEditedStatus] = useState(status);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSave = () => {
    updateTodo(id, { title: editedText, description: editedDescription, date: editedDate, time: editedTime, status: editedStatus });
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className={`flex justify-between rounded-md w-full items-center mb-2 p-4 ${status === 'done' ? 'bg-green-400' : status === 'pending' ? 'bg-gray-200' : 'bg-blue-400'}`} 
        onClick={() => setIsModalOpen(true)}
      >
        <div className={`flex w-2/3 flex-col ${status === 'done' ? 'line-through' : ''}`}>
          <h1 className='font-semibold'>{title}</h1>
          <p className="overflow-hidden">{description}</p> 
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Task Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Title</h3>
                <p>{title}</p>
                <h3 className="font-semibold">Description</h3>
                <p className='break-words'>{description}</p>
                <h3 className="font-semibold">Date</h3>
                <p>{date}</p>
                <h3 className="font-semibold">Time</h3>
                <p>{time}</p>
                <h3 className="font-semibold">Status</h3>
                <p>{status}</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => { 
                    setIsModalOpen(false);
                    setIsEditModalOpen(true);
                  }} 
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => { 
                    deleteTodo(id);
                    setIsModalOpen(false);
                  }} 
                  className="ml-2 p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block pt-4 text-sm font-medium">Description</label>
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block pt-4 text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block pt-4 text-sm font-medium">Time</label>
                <input
                  type="time"
                  value={editedTime}
                  onChange={(e) => setEditedTime(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <label className="block pt-4 text-sm font-medium">Status</label>
                <select
                  value={editedStatus}
                  onChange={(e) => setEditedStatus(e.target.value as 'pending' | 'in-progress' | 'done')}
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="mr-2 p-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;