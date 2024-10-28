import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const CustomerChatContext = createContext();

export const CustomerChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    // Inițializare Socket.IO
    const newSocket = io('http://localhost:3001', {  // Schimbați cu URL-ul backend-ului dvs
      auth: {
        clientId: localStorage.getItem('clientId')
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to chat server');
    });

    newSocket.on('client_id', (id) => {
      setClientId(id);
      localStorage.setItem('clientId', id);
    });

    newSocket.on('message', (message) => {
      setMessages(prev => [...prev, message]);
      if (!isOpen && message.isAdmin) {
        setUnreadCount(prev => prev + 1);
      }
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const sendMessage = (content) => {
    if (socket) {
      const message = {
        content,
        timestamp: new Date(),
        isAdmin: false,
        clientId
      };
      socket.emit('message', message);
      setMessages(prev => [...prev, message]);
    }
  };

  return (
    <CustomerChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        messages,
        sendMessage,
        unreadCount
      }}
    >
      {children}
    </CustomerChatContext.Provider>
  );
};

export const useCustomerChat = () => {
  const context = useContext(CustomerChatContext);
  if (!context) {
    throw new Error('useCustomerChat must be used within a CustomerChatProvider');
  }
  return context;
};