import React, { useState, useEffect, useRef } from 'react';

import Chat from '../Chat/Chat';

import WidgetRegistry from '../WidgetRegistry/WidgetRegistry';
import ChatbotError from '../ChatbotError/ChatbotError';

import IConfig from '../../interfaces/IConfig';
import IWidget from '../../interfaces/IWidget';

import { createChatBotMessage, createClientMessage } from '../Chat/chatUtils';
import {
  getCustomStyles,
  getInitialState,
  getWidgets,
  getCustomComponents,
  getBotName,
  getCustomMessages,
  validateProps,
} from './utils';

interface IChatbotProps {
  actionProvider: any;
  messageParser: any;
  config: IConfig;
  headerText: string;
  placeholderText: string;
  saveMessages: (ref: any) => any;
  messageHistory: () => any;
  validator: (input: string) => Boolean;
}

const Chatbot = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
  messageHistory,
  validator,
  ...rest
}: IChatbotProps) => {
  if (!config || !actionProvider || !messageParser) {
    return (
      <ChatbotError message="I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?" />
    );
  }

  const propsErrors = validateProps(config, messageParser);

  if (propsErrors.length) {
    const errorMessage = propsErrors.reduce((prev, cur) => {
      prev += cur;
      return prev;
    }, '');

    return <ChatbotError message={errorMessage} />;
  }

  const initialState = getInitialState(config);

  if (messageHistory && Array.isArray(messageHistory)) {
    config.initialMessages = [...messageHistory];
  }

  const [state, setState] = useState({
    messages: [...config.initialMessages],
    ...initialState,
  });
  const messagesRef = useRef(state.messages);

  useEffect(() => {
    messagesRef.current = state.messages;
  });

  useEffect(() => {
    if (messageHistory && Array.isArray(messageHistory)) {
      setState((prevState: any) => ({
        ...prevState,
        messages: messageHistory,
      }));
    }

    return () => {
      if (saveMessages && typeof saveMessages === 'function') {
        saveMessages(messagesRef.current);
      }
    };
  }, []);

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);
  const customMessages = getCustomMessages(config);

  const actionProv = new actionProvider(
    createChatBotMessage,
    setState,
    createClientMessage,
    rest
  );
  const widgetRegistry = new WidgetRegistry(setState, actionProv);
  const messagePars = new messageParser(actionProv, state);

  const widgets = getWidgets(config);
  widgets.forEach((widget: IWidget) => widgetRegistry.addWidget(widget, rest));

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
      validator={validator}
    />
  );
};

export default Chatbot;
