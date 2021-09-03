declare module "react-chatbot-kit" {
    export class Chatbot extends React.Component<ChatBotProps> {}
  
    export const createChatBotMessage: (
      message: string,
      options?: ChatBotOptions
    ) => ChatBotMessage;
  
    export const createClientMessage: (message: string) => UserMessage;
  
    interface ChatBotOptions {
      widget?: string;
      withAvatar?: boolean;
      delay?: number;
    }
  
    interface UserMessage {
      id: number;
      message: string;
      type: "user";
    }
  
    interface ChatBotMessage {
      id: number;
      message: string;
      type: "bot";
      loading: boolean;
      delay?: number;
      widget?: string;
      withAvatar?: boolean;
    }
  
    interface ChatBotProps {
      config: Config;
      actionProvider: any;
      messageParser: any;
      messageHistory?: UserMessage[] | ChatBotMessage[];
      saveMessages?: (messages: UserMessage[] | ChatBotMessage[]) => void;
      headerText?: string;
      placeholderText?: string;
      validator?: (input: string) => boolean;
    }
  
    interface Widget {
      widgetName: string;
      widgetFunc: (props: any) => JSX.Element;
      props?: any;
      mapStateToProps: string[];
    }
  
    interface Config {
      botName?: string;
      lang?: string;
      customStyles?: CustomStyles;
      initialMessages: UserMessage[] | ChatBotMessage[];
      state?: any;
      customComponents?: CustomComponents;
      widgets?: Widget[];
    }
  
    interface CustomStyles {
      botMessageBox?: React.CSSProperties;
      chatButton?: React.CSSProperties;
    }
  
    interface CustomComponents {
      header?: CustomComponent;
      botAvatar?: CustomComponent;
      botChatMessage?: CustomComponent;
      userAvatar?: CustomComponent;
      userChatMessage?: CustomComponent;
    }
  
    type CustomComponent = (
      props: JSX.IntrinsicAttributes & {
        children?: React.ReactNode;
      }
    ) => JSX.Element;
  }
  