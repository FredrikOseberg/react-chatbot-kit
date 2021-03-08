import React, { useEffect, useState } from "react";
import { ConditionallyRender } from "react-util-kit";

import ChatbotMessageAvatar from "./ChatBotMessageAvatar/ChatbotMessageAvatar";
import Loader from "../Loader/Loader";

import "./ChatbotMessage.css";
import { callIfExists } from "../Chat/chatUtils";

const ChatbotMessage = ({
  message,
  withAvatar,
  loading,
  messages,
  customComponents,
  setState,
  customStyles,
  delay,
  id,
}) => {
  const [show, toggleShow] = useState(false);

  useEffect(() => {
    const disableLoading = (messages, setState) => {
      let defaultDisableTime = 750;
      if (delay) defaultDisableTime += delay;

      setTimeout(() => {
        const newMessages = [...messages];
        const message = newMessages.find((message) => message.id === id);

        if (!message) return;
        message.loading = false;
        message.delay = undefined;

        setState((state) => {
          const freshMessages = state.messages;
          const messageIdx = freshMessages.findIndex(
            (message) => message.id === id
          );
          freshMessages[messageIdx] = message;

          return { ...state, messages: freshMessages };
        });
      }, defaultDisableTime);
    };

    disableLoading(messages, setState);
  }, [delay, id]);

  useEffect(() => {
    if (delay) {
      setTimeout(() => toggleShow(true), delay);
    } else {
      toggleShow(true);
    }
  }, [delay]);

  const chatBoxCustomStyles = {};
  const arrowCustomStyles = {};

  if (customStyles) {
    chatBoxCustomStyles.backgroundColor = customStyles.backgroundColor;
    arrowCustomStyles.borderRightColor = customStyles.backgroundColor;
  }

  return (
    <ConditionallyRender
      ifTrue={show}
      show={
        <div className="react-chatbot-kit-chat-bot-message-container">
          <ConditionallyRender
            ifTrue={withAvatar}
            show={
              <ConditionallyRender
                ifTrue={customComponents.botAvatar}
                show={callIfExists(customComponents.botAvatar)}
                elseShow={<ChatbotMessageAvatar />}
              />
            }
          />

          <ConditionallyRender
            ifTrue={customComponents.botChatMessage}
            show={callIfExists(customComponents.botChatMessage, {
              message,
              loader: <Loader />,
            })}
            elseShow={
              <div
                className="react-chatbot-kit-chat-bot-message"
                style={chatBoxCustomStyles}
              >
                <ConditionallyRender
                  ifTrue={loading}
                  show={<Loader />}
                  elseShow={<span>{message}</span>}
                />
                <ConditionallyRender
                  ifTrue={withAvatar}
                  show={
                    <div
                      className="react-chatbot-kit-chat-bot-message-arrow"
                      style={arrowCustomStyles}
                    ></div>
                  }
                />
              </div>
            }
          />
        </div>
      }
    />
  );
};

export default ChatbotMessage;
