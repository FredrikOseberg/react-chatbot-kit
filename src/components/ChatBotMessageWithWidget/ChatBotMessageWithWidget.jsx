import React, { Fragment } from "react";

import ChatBotMessage from "../ChatBotMessage/ChatBotMessage";
import { ConditionallyRender } from "react-util-kit";

const ChatBotMessageWithWidget = ({
  passDownProps,
  messages,
  setState,
  scrollIntoView,
  state,
  customComponents,
  customStyles,
  widgetRegistry,
}) => {
  return (
    <Fragment>
      <ChatBotMessage
        {...passDownProps}
        customStyles={customStyles.botMessageBox}
        messages={messages}
        setState={setState}
        customComponents={customComponents}
      />
      <ConditionallyRender
        ifTrue={!passDownProps.loading}
        show={widgetRegistry.getWidget(passDownProps.widget, {
          ...state,
          scrollIntoView,
        })}
      />
    </Fragment>
  );
};

export default ChatBotMessageWithWidget;
