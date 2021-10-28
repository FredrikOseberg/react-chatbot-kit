import React, { SetStateAction } from 'react';
import './Chat.css';
import { ICustomComponents, ICustomMessage, ICustomStyles } from '../../interfaces/IConfig';
import { IMessage } from '../../interfaces/IMessages';
interface IChatProps {
    setState: React.Dispatch<SetStateAction<any>>;
    widgetRegistry: any;
    messageParser: any;
    actionProvider: any;
    customComponents: ICustomComponents;
    botName: string;
    customStyles: ICustomStyles;
    headerText: string;
    customMessages: ICustomMessage;
    placeholderText: string;
    validator: (input: string) => Boolean;
    state: any;
    setMessageContainerRef: React.Dispatch<SetStateAction<any>>;
    disableScrollToBottom: boolean;
    messageHistory: IMessage[] | string;
    parse?: (message: string) => void;
    actions?: object;
}
declare const Chat: ({ state, setState, widgetRegistry, messageParser, parse, customComponents, actionProvider, botName, customStyles, headerText, customMessages, placeholderText, validator, setMessageContainerRef, disableScrollToBottom, messageHistory, actions, }: IChatProps) => JSX.Element;
export default Chat;
