import React, { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("my-reminders");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    localStorage.setItem("my-reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newReminder = {
      id: Date.now(),
      title,
      content,
      date,
      time,
      done: false,
    };

    setReminders([...reminders, newReminder]);
    setTitle("");
    setContent("");
    setDate("");
    setTime("");
  };

  const handleDelete = (id) => {
    setReminders(reminders.filter((item) => item.id !== id));
  };

  const handleToggle = (id) => {
    setReminders(
      reminders.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Reminders</h1>
          <p className="text-slate-500 text-sm mt-1">予定を管理しよう</p>
        </header>

        {/* 入力フォームカード */}
        <form
          onSubmit={handleAdd}
          className="bg-white p-5 rounded-xl shadow-md mb-6 space-y-4 border border-slate-200"
        >
          <h2 className="text-lg font-bold text-slate-700">新しい予定</h2>

          <div>
            <input
              type="text"
              placeholder="予定名"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <textarea
              placeholder="内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-slate-300 p-2.5 rounded-lg h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 border border-slate-300 p-2 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 border border-slate-300 p-2 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            予定を追加
          </button>
        </form>

        {/* 予定リスト */}
        <div className="space-y-3">
          {reminders.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-4">予定はありません</p>
          ) : (
            reminders.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggle(item.id)}
                    className="mt-1 w-5 h-5 accent-indigo-600 cursor-pointer"
                  />
                  <div>
                    <h3
                      className={`font-bold ${
                        item.done
                          ? "line-through text-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.content && (
                      <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">
                        {item.content}
                      </p>
                    )}
                    {(item.date || item.time) && (
                      <p className="text-xs text-slate-400 mt-2">
                        {item.date} {item.time}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer"
                >
                  削除
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}