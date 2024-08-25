"use client";
import { useState, useEffect } from 'react';
import TextArea from 'react-textarea-autosize';

type Message = {
  id: number;
  role: 'user' | 'bot';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    // Load chat history from sessionStorage on component mount
    const savedMessages = sessionStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { id: Date.now(), role: 'user', content: input },
    ];

    setMessages(newMessages);

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    const updatedMessages = [
      ...newMessages,
      { id: Date.now() + 1, role: 'bot', content: data.reply },
    ];

    setMessages(updatedMessages);

    // Save updated messages to sessionStorage
    sessionStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    setInput('');
  };

  return (
    <div className="min-h-screen bg-neutral-800 text-white">
      {messages.length !== 0 ? (
        <div className="pb-32 pt-5 space-y-5 w-[75%] mx-auto relative">
          {messages.map((message) => (
            <div key={message.id} className="w-full">
              {message.role === 'user' ? (
                <div className="text-right">{message.content}</div>
              ) : (
                <div className="text-left text-green-400">{message.content}</div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
        <div className="w-full flex  justify-center pt-32">
<div>                    <h1 className="font-bold lg:text-3xl text-xl">Want to Know more ? use our chatbot</h1>
</div>
        </div>
        <div className="w-full flex  justify-center">
       
                  <h1 className="font-bold lg:text-3xl text-xl">Please use the input field below</h1>
                </div>
                </>
      )}
      <form onSubmit={handleSubmit} className="p-5 fixed bottom-0 left-0 w-[75%] bg-neutral-800 mx-auto right-0">
        <div className="relative flex items-center">
          <TextArea
            tabIndex={0}
            required
            rows={1}
            value={input}
            onChange={handleInputChange}
            autoFocus
            placeholder="Ask me anything"
            spellCheck={false}
            className="w-full focus:outline-none shadow-teal-800 shadow-xl placeholder:text-gray-300 text-sm text-white bg-neutral-600 p-5 pr-15 rounded-xl"
          />
          <button type="submit" className="absolute bg-teal-500 rounded-lg p-3 px-5 mr-4 right-0">Send</button>
        </div>
      </form>
    </div>
  );
}
