import React from 'react';

import Chat from '../Chat/Chat';

import ChatbotError from '../ChatbotError/ChatbotError';

import IConfig from '../../interfaces/IConfig';

import {
  getCustomStyles,
  getCustomComponents,
  getBotName,
  getCustomMessages,
} from './utils';

import useChatbot from '../../hooks/useChatbot';
import { IMessage } from '../../interfaces/IMessages';
import { createChatBotMessage } from '../..';

interface IChatbotProps {
  actionProvider: any;
  messageParser: any;
  config: IConfig;
  headerText?: string;
  placeholderText?: string;
  saveMessages?: (ref: any) => any;
  messageHistory?: IMessage[] | string;
  validator?: (input: string) => Boolean;
  runInitialMessagesWithHistory?: Boolean;
  disableScrollToBottom?: boolean;
}

const Chatbot = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
  messageHistory,
  runInitialMessagesWithHistory,
  disableScrollToBottom,
  validator,
  ...rest
}: IChatbotProps) => {
  const {
    configurationError,
    invalidPropsError,
    actionProv,
    messagePars,
    widgetRegistry,
    state,
    setState,
    setMessageContainerRef,
  } = useChatbot({
    config,
    actionProvider,
    messageParser,
    messageHistory,
    saveMessages,
    runInitialMessagesWithHistory,
    ...rest,
  });

  if (configurationError) {
    return <ChatbotError message={configurationError} />;
  }

  if (invalidPropsError.length) {
    return <ChatbotError message={invalidPropsError} />;
  }

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);
  const customMessages = getCustomMessages(config);

  if (
    !(typeof actionProv === 'function') &&
    !(typeof messagePars === 'function')
  ) {
    return (
      <Chat
        state={state}
        setState={setState}
        widgetRegistry={widgetRegistry}
        actionProvider={actionProv}
        messageParser={messagePars}
        customMessages={customMessages}
        customComponents={{ ...customComponents }}
        botName={botName}
        customStyles={{ ...customStyles }}
        headerText={headerText}
        placeholderText={placeholderText}
        setMessageContainerRef={setMessageContainerRef}
        validator={validator}
        messageHistory={messageHistory}
        disableScrollToBottom={disableScrollToBottom}
      />
    );
  } else {
    const ActionComponent = actionProv;
    const MessageComponent = messagePars;
    return (
      /* @ts-ignore */
      <ActionComponent
        setState={setState}
        createChatBotMessage={createChatBotMessage}
      >
        {/* @ts-ignore */}
        <MessageComponent>
          <Chat
            state={state}
            setState={setState}
            widgetRegistry={widgetRegistry}
            actionProvider={actionProv}
            messageParser={messagePars}
            customMessages={customMessages}
            customComponents={{ ...customComponents }}
            botName={botName}
            customStyles={{ ...customStyles }}
            headerText={headerText}
            placeholderText={placeholderText}
            setMessageContainerRef={setMessageContainerRef}
            validator={validator}
            messageHistory={messageHistory}
            disableScrollToBottom={disableScrollToBottom}
          />
          {/* @ts-ignore */}
        </MessageComponent>
        {/* @ts-ignore */}
      </ActionComponent>
    );
  }
};

export default Chatbot;
