import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

const MessagesContainer = ({ messages, hasGptReplyEnded }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex w-full h-full max-h-full flex-col items-center justify-start pb-10">
      {messages.map((message) => (
        <div
          key={message.text}
          className={`w-[95%] flex ${
            message.type === "USER" ? "justify-end" : "justify-start"
          } items-center`}
        >
          <div
            className={`p-4 text-black text-sm border border-gray-400 rounded-[20px] mt-2 max-w-[80%] break-words ${
              message.type === "USER" ? "text-right" : "text-left"
            }`}
          >
            {message.type === "GPT" ? (
              <>
                <Markdown>
                  {`${message.text} ${!hasGptReplyEnded ? "⚪" : ""}`}
                </Markdown>
                <div ref={bottomRef} />
              </>
            ) : (
              message.text
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessagesContainer;
