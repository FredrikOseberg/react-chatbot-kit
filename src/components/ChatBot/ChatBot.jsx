import React, { useState } from "react";

import Chat from "../Chat/Chat";

import WidgetRegistry from "../WidgetRegistry/WidgetRegistry";
import ChatbotError from "../ChatbotError/ChatbotError";

import { createChatBotMessage } from "../Chat/chatUtils";
import {
  getCustomStyles,
  getInitialState,
  getWidgets,
  getCustomComponents,
  getBotName,
  validateProps,
} from "./utils";

const Chatbot = ({ actionProvider, messageParser, config }) => {
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
    }, "");

    return <ChatbotError message={errorMessage} />;
  }

  const initialState = getInitialState(config);

  const [state, setState] = useState({
    messages: [...config.initialMessages],
    ...initialState,
  });

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);

  const actionProv = new actionProvider(createChatBotMessage, setState);
  const widgetRegistry = new WidgetRegistry(setState, actionProv);
  const messagePars = new messageParser(actionProv);

  const widgets = getWidgets(config);
  widgets.forEach((widget) => widgetRegistry.addWidget(widget));

  return (
    <Chat
      state={state}
      setState={setState}
      widgetRegistry={widgetRegistry}
      messageParser={messagePars}
      customComponents={{ ...customComponents }}
      botName={botName}
      customStyles={{ ...customStyles }}
    />
  );
};

export default Chatbot;
