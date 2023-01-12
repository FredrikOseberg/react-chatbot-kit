import { ReactElement } from 'react';
import { IMessage } from './IMessages';
import IWidget from './IWidget';
interface IConfig {
    botName?: string;
    initialMessages: IMessage[];
    state?: any;
    customComponents?: ICustomComponents;
    customStyles?: ICustomStyles;
    customMessages?: ICustomMessage;
    widgets?: IWidget[];
}
export interface ICustomComponents {
    header?: (props?: any) => ReactElement;
    botAvatar?: (props?: any) => ReactElement;
    botChatMessage?: (props?: any) => ReactElement;
    userAvatar?: (props?: any) => ReactElement;
    userChatMessage?: (props?: any) => ReactElement;
}
export interface ICustomMessage {
    [index: string]: (props: any) => ReactElement;
}
export interface ICustomStyles {
    botMessageBox?: IBackgroundColor;
    borMessageText?: IColor;
    chatButton?: IBackgroundColor;
    chatInput?: IBackgroundColor;
    chatInputText?: IColor;
    userMessageBox?: IBackgroundColor;
    userMessageText?: IColor;
}
export interface IBackgroundColor {
    backgroundColor: string;
}
export interface IColor {
    color: string;
}
export default IConfig;
