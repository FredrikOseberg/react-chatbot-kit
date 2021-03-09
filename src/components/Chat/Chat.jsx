import React, { useState, useRef, useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";

import UserChatMessage from "../UserChatMessage/UserChatMessage";
import ChatbotMessage from "../ChatbotMessage/ChatbotMessage";
import ChatBotMessageWithWidget from "../ChatbotMessageWithWidget/ChatbotMessageWithWidget";

import { botMessage, createChatMessage } from "./chatUtils";

import ChatIcon from "../../assets/icons/paper-plane.svg";

import "./Chat.css";

const Chat = ({
  state,
  setState,
  widgetRegistry,
  messageParser,
  customComponents,
  actionProvider,
  botName,
  customStyles,
  headerText,
  placeholderText,
  validator,
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

  const showAvatar = (messages, index) => {
    if (index === 0) return true;

    const lastMessage = messages[index - 1];

    if (lastMessage.type === "bot" && !lastMessage.widget) {
      return false;
    }
    return true;
  };

  const renderMessages = () => {
    return messages.map((messageObject, index) => {
      if (!botMessage(messageObject))
        return (
          <UserChatMessage
            message={messageObject.message}
            key={messageObject.id}
            customComponents={customComponents}
          />
        );

      let withAvatar;
      if (messageObject.withAvatar) {
        withAvatar = messageObject.withAvatar;
      } else {
        withAvatar = showAvatar(messages, index, messageObject.withAvatar);
      }

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
            withAvatar={withAvatar}
            {...chatBotMessageProps}
            key={messageObject.id}
          />
        );
      }

      return (
        <ChatbotMessage
          customStyles={customStyles.botMessageBox}
          key={messageObject.id}
          withAvatar={withAvatar}
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

    if (validator && typeof validator === "function") {
      if (validator(input)) {
        handleValidMessage();
        messageParser.parse(input);
      }
    } else {
      handleValidMessage();
      messageParser.parse(input);
    }
  };

  const handleValidMessage = () => {
    setState((state) => ({
      ...state,
      messages: [...state.messages, createChatMessage(input, "user")],
    }));

    scrollIntoView();
    setInputValue("");
  };

  const customButtonStyle = {};
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  let placeholder = "Write your message here";
  if (placeholderText) {
    placeholder = placeholderText;
  }

  return (
    <div className="react-chatbot-kit-chat-container">
      <div className="react-chatbot-kit-chat-inner-container">
        <ConditionallyRender
          ifTrue={customComponents.header}
          show={
            customComponents.header && customComponents.header(actionProvider)
          }
          elseShow={
            <div className="react-chatbot-kit-chat-header">{header}</div>
          }
        />

        <div
          className="react-chatbot-kit-chat-message-container"
          ref={chatContainerRef}
        >
          {renderMessages()}
          <div style={{ paddingBottom: "15px" }} />
        </div>

        <div className="react-chatbot-kit-chat-input-container">
          <form
            className="react-chatbot-kit-chat-input-form"
            onSubmit={handleSubmit}
          >
            <input
              className="react-chatbot-kit-chat-input"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="react-chatbot-kit-chat-btn-send"
              style={customButtonStyle}
            >
              <ChatIcon className="react-chatbot-kit-chat-btn-send-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
