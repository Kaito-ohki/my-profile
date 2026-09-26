import React from 'react';

export default function BookCard({ title, author, rating, comment }) {
  // 数値に応じた星（★）の文字列を生成する処理（発展要件）
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:scale-105 transition duration-300 hover:shadow-lg flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-3">著者: {author}</p>
        <div className="text-amber-500 text-lg font-semibold mb-3">
          {stars} <span className="text-sm text-gray-600 ml-1">({rating}/5)</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{comment}</p>
      </div>
    </div>
  );
}