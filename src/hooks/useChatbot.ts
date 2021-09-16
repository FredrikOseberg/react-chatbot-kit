import React, { useRef, useState, useEffect } from 'react';
import {
  createClientMessage,
  createChatBotMessage,
  createCustomMessage,
} from '../components/Chat/chatUtils';
import {
  getCustomStyles,
  getInitialState,
  getWidgets,
  validateProps,
} from '../components/Chatbot/utils';
import WidgetRegistry from '../components/WidgetRegistry/WidgetRegistry';
import IConfig from '../interfaces/IConfig';
import { IMessage } from '../interfaces/IMessages';
import IWidget from '../interfaces/IWidget';

interface IUseChatbotParams {
  config: IConfig | null;
  actionProvider: any;
  messageParser: any;
  messageHistory: IMessage[] | string;
  saveMessages: (messages: IMessage[], html: string) => any | null;
  runInitialMessagesWithHistory?: Boolean;
}

const useChatbot = ({
  config,
  actionProvider,
  messageParser,
  messageHistory,
  runInitialMessagesWithHistory,
  saveMessages,
  ...rest
}: IUseChatbotParams) => {
  let configurationError = '';
  let invalidPropsError = '';

  if (!config || !actionProvider || !messageParser) {
    configurationError =
      'I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?';

    return { configurationError };
  }

  const propsErrors = validateProps(config, messageParser);

  if (propsErrors.length) {
    invalidPropsError = propsErrors.reduce((prev, cur) => {
      prev += cur;
      return prev;
    }, '');

    return { invalidPropsError };
  }
  const [messageContainerRef, setMessageContainerRef] = useState<any>({});

  const initialState = getInitialState(config);

  if (messageHistory && Array.isArray(messageHistory)) {
    config.initialMessages = [...messageHistory];
  } else if (typeof messageHistory === 'string' && Boolean(messageHistory)) {
    if (!runInitialMessagesWithHistory) {
      config.initialMessages = [];
    }
  }

  const [state, setState] = React.useState({
    messages: [...config.initialMessages],
    ...initialState,
  });
  const messagesRef = React.useRef(state.messages);
  const stateRef = React.useRef();

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
  }, []);

  useEffect(() => {
    return () => {
      if (saveMessages && typeof saveMessages === 'function') {
        const HTML = messageContainerRef?.current?.innerHTML.toString();

        if (!messageContainerRef.current) return;
        saveMessages(messagesRef.current, HTML);
      }
    };
  }, [messageContainerRef.current]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const actionProv = new actionProvider(
    createChatBotMessage,
    setState,
    createClientMessage,
    stateRef.current,
    createCustomMessage,
    rest
  );

  const widgetRegistry = new WidgetRegistry(setState, actionProv);
  const messagePars = new messageParser(actionProv, stateRef.current);

  const widgets = getWidgets(config);
  widgets.forEach((widget: IWidget) => widgetRegistry.addWidget(widget, rest));

  return {
    widgetRegistry,
    actionProv,
    messagePars,
    configurationError,
    invalidPropsError,
    state,
    setState,
    setMessageContainerRef,
  };
};

export default useChatbot;
