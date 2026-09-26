import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookCard from './components/BookCard';

// 書籍データ（3冊以上・idなどの一意なキーを含む）
const booksData = [
  {
    id: 1,
    title: "リーダブルコード",
    author: "Dustin Boswell, Trevor Foucher",
    rating: 5,
    comment: "より良いコードを書くための実践的なテクニックが凝縮されています。開発者必読の一冊です。"
  },
  {
    title: "Reactハンズオンラーニング",
    author: "Alex Banks, Eve Porcello",
    rating: 4,
    comment: "Reactの基礎からモダンなWebアプリケーション構築まで体系的に学べます。"
  },
  {
    id: 3,
    title: "WebAPIの設計",
    author: "Arnaud Lauret",
    rating: 4,
    comment: "使いやすく拡張性の高いWeb APIを設計するための考え方が丁寧に解説されています。"
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans">
      <div>
        <Header />
        <main className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {booksData.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
                comment={book.comment}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}