import { useRef, useState, useEffect } from 'react';
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
import IWidget from '../interfaces/IWidget';

interface IUseChatbotParams {
  config: IConfig | null;
  actionProvider: any;
  messageParser: any;
  messageHistory: any[] | (() => {});
  saveMessages: (args: any) => any | null;
}

const useChatbot = ({
  config,
  actionProvider,
  messageParser,
  messageHistory,
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

  const initialState = getInitialState(config);

  if (messageHistory && Array.isArray(messageHistory)) {
    config.initialMessages = [...messageHistory];
  }

  const [state, setState] = useState({
    messages: [...config.initialMessages],
    ...initialState,
  });
  const messagesRef = useRef(state.messages);
  const stateRef = useRef();

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
  };
};

export default useChatbot;
