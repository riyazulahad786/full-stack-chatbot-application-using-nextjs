import { NextRequest, NextResponse } from 'next/server';

// In-memory store for recent queries
const recentQueries: { [key: string]: string } = {};

const predefinedResponses: { [key: string]: string } = {
  "hello": "Hi there! How can I help you today?",
  "hi": "Hello! What services do you offer?",
  "who are you": "I'm your friendly chatbot here to help you with your queries.",
  "hey": "Hi! How can I contact support?",
  "no":"all right good",
  "i need help":"how can i support you",
  "good morning":"good morning",
  "morning":"morning",
  "good afternoon":"good afternoon",
  "good evening":"good evening",
  "afternoon":"afternoon",
  "evening":"evening",
  "how are you": "I'm just a bunch of code, so I don't have feelings, but thanks for asking!",
  "what is your name": "I'm your friendly chatbot!",
  "where are you from": "I'm everywhere around the world, just a click away!",
  "bye": "Goodbye! Have a great day!",
  "what can you do": "I can help you with basic queries and provide information. How can I assist you today?",
  "help": "Sure, I'm here to help! What do you need assistance with?",
  "thanks": "You're welcome! Is there anything else you need?",
  "thank you": "You're welcome! Let me know if there's anything else I can do for you.",
  "how old are you": "I don't have an age. I'm as old as the code that created me!",
  "what services do you offer": "I can assist you with information, answer your questions, and guide you through our services.",
  "contact support": "You can contact our support team by visiting the 'Contact Us' page on our website.",
  "support": "If you need support, please visit our 'Contact Us' page or email us at support@example.com.",
  "tell me a joke": "Why don't programmers like nature? It has too many bugs!",
  "what's your purpose": "My purpose is to help you with your queries and provide useful information.",
  "how can I use this service": "Simply ask me anything you'd like to know, and I'll do my best to help!",
  "are you human": "Nope, I'm a chatbot created to assist you.",
  "what's the weather like": "I can't provide weather updates, but you can check a weather service for the latest information.",
  "how do I reset my password": "To reset your password, please visit the 'Forgot Password' page and follow the instructions.",
  "where can I find more information": "You can find more information on our website or by asking me specific questions.",
  "do you have a name": "You can call me your friendly assistant!"
};

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ reply: "Please provide a message." }, { status: 400 });
  }

  const query = message.toLowerCase();
  let response;

  if (recentQueries[query]) {
    // If the query was answered before, return the previous rsponse...
    response = recentQueries[query];
  } else {
    // Check predefined responses
    response = predefinedResponses[query] || "I'm sorry, I don't understand that.";
    // Store the response for future reference
    recentQueries[query] = response;
  }

  return NextResponse.json({ reply: response });
}
