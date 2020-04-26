import React from "react";

import UserIcon from "../../assets/icons/user-alt.svg";

import "./UserChatMessage.css";

const UserChatMessage = ({ message }) => {
  return (
    <div className="user-chat-message-container">
      <div className="user-chat-message">
        {message}
        <div className="user-chat-message-arrow"></div>
      </div>

      <div className="user-avatar">
        <div className="user-avatar-container">
          <UserIcon className="user-avatar-icon" />
        </div>
      </div>
    </div>
  );
};

export default UserChatMessage;
