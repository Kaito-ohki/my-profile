    import React, { useState, useEffect } from 'react';
    import TaskItem from './components/TaskItem';

    export default function App() {
    // 1. タスクリストのstate（初期値はlocalStorageから読み込み）
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('my-tasks');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. 入力テキストのstate
    const [inputText, setInputText] = useState('');

    // 3. フィルター状態のstate ('all' | 'active' | 'completed')
    const [filter, setFilter] = useState('all');

    // tasksが変わるたびにlocalStorageに保存
    useEffect(() => {
        localStorage.setItem('my-tasks', JSON.stringify(tasks));
    }, [tasks]);

    // タスク追加
    const handleAddTask = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return; // 空文字チェック

        const newTask = {
        id: Date.now(),
        text: inputText,
        done: false
        };

        setTasks([...tasks, newTask]);
        setInputText('');
    };

    // 完了状態の切り替え
    const handleToggleTask = (id) => {
        setTasks(
        tasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        )
        );
    };

    // タスク削除
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    // フィルター処理
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.done;
        if (filter === 'completed') return task.done;
        return true; // 'all'
    });

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">タスク管理アプリ</h1>

            {/* 入力フォーム */}
            <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
            <input
                type="text"
                placeholder="新しいタスクを入力..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
            />
            <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
                追加
            </button>
            </form>

            {/* フィルターボタン */}
            <div className="flex justify-center gap-2 mb-4">
            {['all', 'active', 'completed'].map((type) => (
                <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    filter === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                >
                {type === 'all' && 'すべて'}
                {type === 'active' && '未完了'}
                {type === 'completed' && '完了済み'}
                </button>
            ))}
            </div>

            {/* タスク一覧 */}
            <ul>
            {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-400 text-sm py-4">タスクがありません</p>
            ) : (
                filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                />
                ))
            )}
            </ul>
        </div>
        </div>
    );
    }