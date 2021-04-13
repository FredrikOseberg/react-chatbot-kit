import React from "react";
import IChatbotMessage from "./IChatbotMessage";
import IWidget from "./IWidget";

interface IConfig {
  botName?: string;
  initialMessages: IChatbotMessage[];
  state?: any;
  customComponents?: ICustomComponents;
  customStyles?: ICustomStyles;
  widgets?: IWidget[];
}

interface ICustomComponents {
  header: (props?: any) => React.JSX.Element;
  botAvatar: (props?: any) => React.JSX.Element;
  botChatMessage: (props?: any) => React.JSX.Element;
  userAvatar: (props?: any) => React.JSX.Element;
  userChatMessage: (props?: any) => React.JSX.Element;
}

interface ICustomStyles {
  botMessageBox: IBackgroundColor;
  chatButton: IBackgroundColor;
}

interface IBackgroundColor {
  backgroundColor: string;
}

export default IConfig;
