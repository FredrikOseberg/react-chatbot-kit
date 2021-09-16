import IConfig from '../../interfaces/IConfig';
import { IMessage } from '../../interfaces/IMessages';
interface IChatbotProps {
    actionProvider: any;
    messageParser: any;
    config: IConfig;
    headerText?: string;
    placeholderText?: string;
    saveMessages?: (ref: any) => any;
    messageHistory?: IMessage[] | string;
    validator?: (input: string) => Boolean;
    runInitialMessagesWithHistory?: Boolean;
    disableScrollToBottom?: boolean;
}
declare const Chatbot: ({ actionProvider, messageParser, config, headerText, placeholderText, saveMessages, messageHistory, runInitialMessagesWithHistory, disableScrollToBottom, validator, ...rest }: IChatbotProps) => JSX.Element;
export default Chatbot;
