import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 mb-2 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 accent-indigo-600 cursor-pointer"
        />
        <span className={task.done ? "line-through text-gray-400" : "text-gray-800"}>
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition"
      >
        削除
      </button>
    </li>
  );
}