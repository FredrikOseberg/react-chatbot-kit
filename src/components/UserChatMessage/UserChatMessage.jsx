import React from "react";
import { ConditionallyRender } from "react-util-kit";

import { callIfExists } from "../Chat/chatUtils";

import UserIcon from "../../assets/icons/user-alt.svg";

import "./UserChatMessage.css";

const UserChatMessage = ({ message, customComponents }) => {
  console.log(customComponents);
  return (
    <div className="react-chatbot-kit-user-chat-message-container">
      <ConditionallyRender
        ifTrue={customComponents.userChatMessage}
        show={<div>Hello </div>}
        elseShow={
          <div className="react-chatbot-kit-user-chat-message">
            {message}
            <div className="react-chatbot-kit-user-chat-message-arrow"></div>
          </div>
        }
      />
      <ConditionallyRender
        ifTrue={customComponents.userIcon}
        show={<div>Hello</div>}
        elseShow={
          <div className="react-chatbot-kit-user-avatar">
            <div className="react-chatbot-kit-user-avatar-container">
              <UserIcon className="react-chatbot-kit-user-avatar-icon" />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default UserChatMessage;
