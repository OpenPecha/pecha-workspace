'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Simple markdown renderer
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderMarkdown = (text: string) => {
    // Replace **bold** with <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace *italic* with <em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace `code` with <code>
    text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
    
    // Replace [link](url) with <a>
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Replace line breaks with <br>
    text = text.replace(/\n/g, '<br>');
    
    // Handle headers (# ## ###)
    text = text.replace(/^### (.*$)/gm, '<h3 class="text-md font-semibold mt-2 mb-1">$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold mt-3 mb-2">$1</h2>');
    text = text.replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mt-3 mb-2">$1</h1>');
    
    // Handle bullet points
    text = text.replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>');
    text = text.replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4">$1. $2</li>');
    
    return text;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const authUser = useUser();
  const user= authUser?.user||null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: user 
        ? 'Hello! I\'m your AI assistant. How can I help you today?' 
        : 'Hello! Please login first to use the chatbot. Click on the login button in the header to get started.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Update initial message when user login state changes
  useEffect(() => {
    setMessages([{
      id: '1',
      content: user 
        ? 'Hello! I\'m your AI assistant. How can I help you today?' 
        : 'Hello! Please login first to use the chatbot. Click on the login button in the header to get started.',
      sender: 'bot',
      timestamp: new Date(),
    }]);
  }, [user]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if user is logged in
    if (!user?.email) {
      const loginReminderMessage: Message = {
        id: Date.now().toString(),
        content: 'Please login first to use the chatbot. Click on the login button in the header to get started.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, loginReminderMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Make API call to the webhook
      const webhookUrl = `https://n8n-service-9z2e.onrender.com/webhook/6f7b288e-1efe-4504-a6fd-660931327269?body=${encodeURIComponent(currentMessage)}&sessiongId=${encodeURIComponent(user.email)}`;
      
      const response = await fetch(webhookUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.output || 'Sorry, I didn\'t receive a proper response.';

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling webhook:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-96 bg-white rounded-2xl shadow-2xl border border-border/50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className=" bg-primary-500   px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8    rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm">AI Assistant</h3>
                <p className="text-white/80 text-xs">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80   hover:text-white transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'user' ? (
                  // User message with background
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-primary text-white">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0 text-white" />
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs mt-1 text-white/70">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Bot message without background, with markdown
                  <div className="max-w-[80%] py-2">
                    <div className="flex items-start gap-2">
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <div className="flex-1">
                        <div className="text-sm leading-relaxed text-gray-900">
                          <MarkdownRenderer content={message.content} />
                        </div>
                        <p className="text-xs mt-1 text-gray-500">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={user ? "Type your message..." : "Please login to chat..."}
                className="flex-1 px-3 py-2 border border-input rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-background text-foreground"
                disabled={isTyping || !user}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping || !user}
                className="w-8 h-8 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button - Hide when chat is open */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-700 dark:bg-primary-700 hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

    </div>
  );
};

export default ChatBot;

