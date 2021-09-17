import React, { useState, useRef, useEffect, SetStateAction } from 'react';
import ConditionallyRender from 'react-conditionally-render';

import UserChatMessage from '../UserChatMessage/UserChatMessage';
import ChatbotMessage from '../ChatbotMessage/ChatbotMessage';

import {
  botMessage,
  userMessage,
  customMessage,
  createChatMessage,
} from './chatUtils';

import ChatIcon from '../../assets/icons/paper-plane.svg';

import './Chat.css';
import {
  ICustomComponents,
  ICustomMessage,
  ICustomStyles,
} from '../../interfaces/IConfig';
import { IMessage } from '../../interfaces/IMessages';
import { string } from 'prop-types';

interface IChatProps {
  setState: React.Dispatch<SetStateAction<any>>;
  widgetRegistry: any;
  messageParser: any;
  actionProvider: any;
  customComponents: ICustomComponents;
  botName: string;
  customStyles: ICustomStyles;
  headerText: string;
  customMessages: ICustomMessage;
  placeholderText: string;
  validator: (input: string) => Boolean;
  state: any;
  setMessageContainerRef: React.Dispatch<SetStateAction<any>>;
  disableScrollToBottom: boolean;
  messageHistory: IMessage[] | string;
}

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
  customMessages,
  placeholderText,
  validator,
  setMessageContainerRef,
  disableScrollToBottom,
  messageHistory,
}: IChatProps) => {
  const { messages } = state;
  const chatContainerRef = useRef(null);

  const [input, setInputValue] = useState('');

  const scrollIntoView = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef?.current?.scrollHeight;
      }
    }, 50);
  };

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView();
  });

  useEffect(() => {
    setMessageContainerRef(chatContainerRef);
  }, [chatContainerRef.current]);

  const showAvatar = (messages: any[], index: number) => {
    if (index === 0) return true;

    const lastMessage = messages[index - 1];

    if (lastMessage.type === 'bot' && !lastMessage.widget) {
      return false;
    }
    return true;
  };

  const renderMessages = () => {
    return messages.map((messageObject: IMessage, index: number) => {
      if (botMessage(messageObject)) {
        return (
          <React.Fragment key={messageObject.id}>
            {renderChatbotMessage(messageObject, index)}
          </React.Fragment>
        );
      }

      if (userMessage(messageObject)) {
        return (
          <React.Fragment key={messageObject.id}>
            {renderUserMessage(messageObject)}
          </React.Fragment>
        );
      }

      if (customMessage(messageObject, customMessages)) {
        return (
          <React.Fragment key={messageObject.id}>
            {renderCustomMessage(messageObject)}
          </React.Fragment>
        );
      }
    });
  };

  const renderCustomMessage = (messageObject: IMessage) => {
    const customMessage = customMessages[messageObject.type];

    const props = {
      setState,
      state,
      scrollIntoView,
      actionProvider,
    };

    if (messageObject.widget) {
      const widget = widgetRegistry.getWidget(messageObject.widget, {
        ...state,
        scrollIntoView,
      });
      return (
        <>
          {customMessage(props)}
          {widget ? widget : null}
        </>
      );
    }

    return customMessage(props);
  };

  const renderUserMessage = (messageObject: IMessage) => {
    const widget = widgetRegistry.getWidget(messageObject.widget, {
      ...state,
      scrollIntoView,
    });
    return (
      <>
        <UserChatMessage
          message={messageObject.message}
          key={messageObject.id}
          customComponents={customComponents}
        />
        {widget ? widget : null}
      </>
    );
  };

  const renderChatbotMessage = (messageObject: IMessage, index: number) => {
    let withAvatar;
    if (messageObject.withAvatar) {
      withAvatar = messageObject.withAvatar;
    } else {
      withAvatar = showAvatar(messages, index);
    }

    const chatbotMessageProps = {
      ...messageObject,
      setState,
      state,
      customComponents,
      widgetRegistry,
      messages,
    };

    if (messageObject.widget) {
      const widget = widgetRegistry.getWidget(chatbotMessageProps.widget, {
        ...state,
        scrollIntoView,
      });
      return (
        <>
          <ChatbotMessage
            customStyles={customStyles.botMessageBox}
            withAvatar={withAvatar}
            {...chatbotMessageProps}
            key={messageObject.id}
          />
          <ConditionallyRender
            condition={!chatbotMessageProps.loading}
            show={widget ? widget : null}
          />
        </>
      );
    }

    return (
      <ChatbotMessage
        customStyles={customStyles.botMessageBox}
        key={messageObject.id}
        withAvatar={withAvatar}
        {...chatbotMessageProps}
        customComponents={customComponents}
        messages={messages}
        setState={setState}
      />
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator && typeof validator === 'function') {
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
    setState((state: any) => ({
      ...state,
      messages: [...state.messages, createChatMessage(input, 'user')],
    }));

    scrollIntoView();
    setInputValue('');
  };

  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  let placeholder = 'Write your message here';
  if (placeholderText) {
    placeholder = placeholderText;
  }

  return (
    <div className="react-chatbot-kit-chat-container">
      <div className="react-chatbot-kit-chat-inner-container">
        <ConditionallyRender
          condition={!!customComponents.header}
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
          <ConditionallyRender
            condition={
              typeof messageHistory === 'string' && Boolean(messageHistory)
            }
            show={
              <div
                dangerouslySetInnerHTML={{ __html: messageHistory as string }}
              />
            }
          />

          {renderMessages()}
          <div style={{ paddingBottom: '15px' }} />
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
