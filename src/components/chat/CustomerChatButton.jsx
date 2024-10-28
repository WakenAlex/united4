// CustomerChatButton.jsx
import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useCustomerChat } from './CustomerChatContext';

const CustomerChatButton = () => {
  const { isOpen, setIsOpen, unreadCount } = useCustomerChat();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 hover:transform hover:scale-105 ${
        isOpen ? 'bg-red-500' : 'bg-blue-500'
      }`}
      aria-label="Customer Service Chat"
    >
      {isOpen ? (
        <X className="h-6 w-6 text-white" />
      ) : (
        <div className="relative">
          <MessageSquare className="h-6 w-6 text-white" />
          {unreadCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount}
            </span>
          )}
        </div>
      )}
    </button>
  );
};