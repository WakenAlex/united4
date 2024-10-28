// AdminChatPanel.jsx
import React, { useState, useEffect } from 'react';
import { useCustomerChat } from './CustomerChatContext';

const AdminChatPanel = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [adminMessage, setAdminMessage] = useState('');
  const { socket } = useCustomerChat();

  useEffect(() => {
    if (!socket) return;

    socket.emit('get_conversations');
    socket.on('conversations', setConversations);
    socket.on('new_conversation', (conversation) => {
      setConversations(prev => [...prev, conversation]);
    });
    socket.on('conversation_updated', (updatedConversation) => {
      setConversations(prev =>
        prev.map(conv =>
          conv.clientId === updatedConversation.clientId ? updatedConversation : conv
        )
      );
    });
  }, [socket]);

  const handleSendAdminMessage = (e) => {
    e.preventDefault();
    if (!adminMessage.trim() || !selectedClient) return;

    socket.emit('admin_message', {
      clientId: selectedClient,
      content: adminMessage,
      timestamp: new Date(),
      isAdmin: true
    });

    setAdminMessage('');
  };

  return (
    <div className="flex h-screen">
      {/* Lista conversațiilor */}
      <div className="w-1/4 border-r bg-gray-50 p-4">
        <h2 className="mb-4 text-xl font-bold">Conversations</h2>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.clientId}
              onClick={() => setSelectedClient(conv.clientId)}
              className={`w-full rounded-lg p-3 text-left transition-colors ${
                selectedClient === conv.clientId
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <div className="font-semibold">Client {conv.clientId}</div>
              <div className="text-sm opacity-75">
                {conv.messages[conv.messages.length - 1]?.content}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat activ */}
      <div className="flex flex-1 flex-col">
        {selectedClient ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {conversations
                .find((conv) => conv.clientId === selectedClient)
                ?.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      msg.isAdmin ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.isAdmin
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span className="mt-1 text-xs opacity-75">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <form onSubmit={handleSendAdminMessage} className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  placeholder="Type your response..."
                  className="flex-1 rounded-lg border p-2 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                  disabled={!adminMessage.trim()}
                >
                  Send
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
};