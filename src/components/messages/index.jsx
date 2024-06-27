import React, { useState } from "react";

function Messages(props) {
  const { braodCastMessage, messages } = props;
  const [msg, setMsg] = useState("");

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      braodCastMessage(msg);
      setMsg("");
    }
  };

  return (
    <div className="rounded-xl mb-64 h-full">
      <div className="bg-[#494F55] text-[#BABCBE] text-center text-2xl p-2 rounded-t-xl">
        Chats
      </div>
      <div>
        <div className="h-[760px] overflow-y-scroll no-scrollbar">
          {messages.map((message, i) => {
            return (
              <div key={i}>
                <div className="flex flex-row [&>div]:px-1">
                  <div className="font-bold">{message.username}:</div>
                  <div className="font-light">{message.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <input
            className="w-full py-2 px-1 rounded-b-xl"
            type="text"
            placeholder="Enter your text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => {
              sendMessage(e);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Messages;
