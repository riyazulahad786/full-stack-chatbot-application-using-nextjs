"use client";
import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <header className="w-full py-6 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-bold">Welcome to ChatBot</h1>
        <p className="mt-2 text-lg">Your intelligent assistant for seamless interactions</p>
      </header>
      
      <main className="flex flex-col items-center mt-12">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-gray-700 mb-4">
            Our chatbot is designed to assist you with a range of queries, from customer support to general information. 
            Simply type your question and get instant responses.
          </p>
          <a href='/home' className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Try It Now
          </a>
        </div>
        
        <footer className="mt-12 text-center">
          <p className="text-gray-600">© 2024 ChatBot Inc. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
