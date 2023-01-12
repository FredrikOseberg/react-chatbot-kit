import React from 'react';
import ConditionallyRender from 'react-conditionally-render';

import { callIfExists } from '../Chat/chatUtils';

import UserIcon from '../../assets/icons/user-alt.svg';

import './UserChatMessage.css';
import { IBackgroundColor, IColor, ICustomComponents } from '../../interfaces/IConfig';

interface IUserChatMessageProps {
  message: string;
  customComponents: ICustomComponents;
  userMessageBox?: IBackgroundColor;
  userMessageText?: IColor;
}

const UserChatMessage = ({
  message,
  customComponents,
  userMessageBox,
  userMessageText,
}: IUserChatMessageProps) => {
  const userMessageStyle = {
    backgroundColor: userMessageBox.backgroundColor ? userMessageBox.backgroundColor : '#f1f1f1',
    color: userMessageText.color ? userMessageText.color : '#585858',
  }
  return (
    <div className="react-chatbot-kit-user-chat-message-container">
      <ConditionallyRender
        condition={!!customComponents.userChatMessage}
        show={callIfExists(customComponents.userChatMessage, {
          message,
        })}
        elseShow={
          <div className="react-chatbot-kit-user-chat-message"
          style={userMessageStyle}>
            {message}
            <div className="react-chatbot-kit-user-chat-message-arrow"></div>
          </div>
        }
      />
      <ConditionallyRender
        condition={!!customComponents.userAvatar}
        show={callIfExists(customComponents.userAvatar)}
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
