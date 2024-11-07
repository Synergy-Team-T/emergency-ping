import { sendChat } from "@synergy-project-t/utils/openai";
import React, { useEffect, useState } from "react";
import { FaAngleDown, FaHandsHelping } from "react-icons/fa";
import MessagesContainer from "./MessagesContainer";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [gptReply, setGptReply] = useState("");
  const [hasGptReplyEnded, setHasGptReplyEnded] = useState(false);

  useEffect(() => {
    if (gptReply) {
      if (messages[messages.length - 1].type === "GPT") {
        setMessages((prev) => {
          const temp = [...prev];
          temp[temp.length - 1].text = gptReply;
          return temp;
        });
      } else {
        setMessages((prev) => [...prev, { text: gptReply, type: "GPT" }]);
      }
    }
  }, [gptReply]);

  const sendMessage = () => {
    setGptReply("");
    setHasGptReplyEnded(false);
    setMessages((prev) => [...prev, { text: input, type: "USER" }]);
    sendChat(input, setGptReply, () => setHasGptReplyEnded(true));
    setInput("");
  };

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };


  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          className="bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <FaHandsHelping size={35} />
        </button>
      )}
      {isOpen && (
        <div className="w-96 max-h-[70vh] min-h-[50vh] bg-white rounded-lg shadow-lg p-4 mt-2 flex flex-col">
          <div className="flex items-center justify-between text-lg font-semibold text-gray-800 mb-2">
            How can we help you?
            <FaAngleDown
              size={24}
              className="cursor-pointer"
              onClick={toggleChatbot}
            />
          </div>
          <div className="flex-1 overflow-y-auto p-2 border border-gray-200 rounded-lg mb-2">
            {messages.length ? (
              <MessagesContainer
                messages={messages}
                hasGptReplyEnded={hasGptReplyEnded}
              />
            ) : null}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your question..."
              className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="bg-red-600 text-white p-2 rounded-r-lg hover:bg-red-500"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
