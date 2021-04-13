import { ReactElement } from 'react';

import IChatbotMessage from './IChatbotMessage';
import IWidget from './IWidget';

interface IConfig {
  botName?: string;
  initialMessages: IChatbotMessage[];
  state?: any;
  customComponents?: ICustomComponents;
  customStyles?: ICustomStyles;
  widgets?: IWidget[];
}

interface ICustomComponents {
  header: (props?: any) => ReactElement;
  botAvatar: (props?: any) => ReactElement;
  botChatMessage: (props?: any) => ReactElement;
  userAvatar: (props?: any) => ReactElement;
  userChatMessage: (props?: any) => ReactElement;
}

interface ICustomStyles {
  botMessageBox: IBackgroundColor;
  chatButton: IBackgroundColor;
}

interface IBackgroundColor {
  backgroundColor: string;
}

export default IConfig;
