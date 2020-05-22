import React, { useState } from "react";

import Chat from "../Chat/Chat";

import WidgetRegistry from "../WidgetRegistry/WidgetRegistry";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";

import { createChatBotMessage } from "../Chat/chatUtils";
import {
  getCustomStyles,
  getInitialState,
  getWidgets,
  getCustomComponents,
  getBotName,
} from "./utils";

const ChatBot = ({ ActionProvider, MessageParser, config }) => {
  const initialState = getInitialState(config);
  const [state, setState] = useState({
    messages: [...config.initialMessages],
    ...initialState,
  });

  const actionProvider = new ActionProvider(createChatBotMessage, setState);
  const widgetRegistry = new WidgetRegistry(setState, actionProvider);
  const messageParser = new MessageParser(actionProvider);

  const widgets = getWidgets(config);
  widgets.forEach((widget) => widgetRegistry.addWidget(widget));

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);

  return (
    <ErrorBoundry>
      <Chat
        state={state}
        setState={setState}
        widgetRegistry={widgetRegistry}
        messageParser={messageParser}
        customComponents={{ ...customComponents }}
        botName={botName}
        customStyles={{ ...customStyles }}
      />
    </ErrorBoundry>
  );
};

export default ChatBot;
