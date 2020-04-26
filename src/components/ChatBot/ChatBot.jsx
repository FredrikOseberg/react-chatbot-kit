import React, { useState } from "react";

import Chat from "../Chat/Chat";
import WidgetRegistry from "../WidgetRegistry/WidgetRegistry";
import { createChatBotMessage } from "../Chat/chatUtils";

const ChatBot = ({ ActionProvider, MessageParser, config }) => {
  const [state, setState] = useState({
    messages: [...config.initialMessages],
    ...config.state,
  });

  const actionProvider = new ActionProvider(createChatBotMessage, setState);
  const widgetRegistry = new WidgetRegistry(setState, actionProvider);
  const messageParser = new MessageParser(actionProvider);

  config.widgets.forEach((widget) => widgetRegistry.addWidget(widget));

  const customStyles = config.customStyles;

  return (
    <Chat
      state={state}
      setState={setState}
      widgetRegistry={widgetRegistry}
      messageParser={messageParser}
      customComponents={{ ...config.customComponents }}
      botName={config.botName}
      customStyles={customStyles}
    />
  );
};

export default ChatBot;
