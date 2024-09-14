// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleList from './components/ArticleList';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    axios.get(`http://localhost:5000/news?category=${category}`)
      .then(response => {
        setArticles(response.data.articles);
      })
      .catch(error => {
        console.error('Error fetching the articles', error);
      });
  }, [category]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header setCategory={setCategory} /> {/* Make sure setCategory is passed correctly */}
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">News Articles</h1>
        <ArticleList articles={articles} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
