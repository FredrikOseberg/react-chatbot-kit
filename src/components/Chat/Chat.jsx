import React, { useState, useRef, useEffect } from "react";

import UserChatMessage from "../UserChatMessage/UserChatMessage";
import ChatBotMessage from "../ChatBotMessage/ChatBotMessage";
import ChatBotMessageWithWidget from "../ChatBotMessageWithWidget/ChatBotMessageWithWidget";

import { botMessage, createChatMessage } from "./chatUtils";

import ChatIcon from "../../assets/icons/paper-plane.svg";

import "./Chat.css";

const Chat = ({
  state,
  setState,
  widgetRegistry,
  messageParser,
  customComponents,
  botName,
  customStyles,
}) => {
  const { messages } = state;
  const chatContainerRef = useRef(null);

  const [input, setInputValue] = useState("");

  const scrollIntoView = () => {
    setTimeout(() => {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }, 50);
  };

  useEffect(() => {
    scrollIntoView();
  });

  const renderMessages = () => {
    return messages.map((messageObject) => {
      if (!botMessage(messageObject))
        return (
          <UserChatMessage
            message={messageObject.message}
            key={messageObject.id}
          />
        );

      const chatBotMessageProps = {
        passDownProps: { ...messageObject },
        setState,
        state,
        customComponents,
        widgetRegistry,
        messages,
      };

      if (messageObject.widget) {
        return (
          <ChatBotMessageWithWidget
            customStyles={customStyles}
            scrollIntoView={scrollIntoView}
            {...chatBotMessageProps}
            key={messageObject.id}
          />
        );
      }

      return (
        <ChatBotMessage
          customStyles={customStyles.botMessageBox}
          key={messageObject.id}
          withAvatar={true}
          {...chatBotMessageProps.passDownProps}
          customComponents={customComponents}
          messages={messages}
          setState={setState}
        />
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((state) => ({
      ...state,
      messages: [...state.messages, createChatMessage(input, "user")],
    }));

    messageParser.parse(input);

    scrollIntoView();
    setInputValue("");
  };

  const customButtonStyle = {};
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="chat-header">Conversation with {botName}</div>

        <div className="chat-message-container" ref={chatContainerRef}>
          {renderMessages()}
          <div style={{ paddingBottom: "15px" }} />
        </div>

        <div className="chat-input-container">
          <form className="chat-input-form" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              placeholder="Write your message here"
              value={input}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="chat-btn-send" style={customButtonStyle}>
              <ChatIcon className="chat-btn-send-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
