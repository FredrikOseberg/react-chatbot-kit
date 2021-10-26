import React from 'react';
import WidgetRegistry from '../components/WidgetRegistry/WidgetRegistry';
import IConfig from '../interfaces/IConfig';
import { IMessage } from '../interfaces/IMessages';
interface IUseChatbotParams {
    config: IConfig | null;
    actionProvider: any;
    messageParser: any;
    messageHistory: IMessage[] | string;
    saveMessages: (messages: IMessage[], html: string) => any | null;
    runInitialMessagesWithHistory?: Boolean;
}
declare const useChatbot: ({ config, actionProvider, messageParser, messageHistory, runInitialMessagesWithHistory, saveMessages, ...rest }: IUseChatbotParams) => {
    configurationError: string;
    invalidPropsError?: undefined;
    widgetRegistry?: undefined;
    actionProv?: undefined;
    messagePars?: undefined;
    state?: undefined;
    setState?: undefined;
    setMessageContainerRef?: undefined;
    ActionProvider?: undefined;
    MessageParser?: undefined;
} | {
    invalidPropsError: string;
    configurationError?: undefined;
    widgetRegistry?: undefined;
    actionProv?: undefined;
    messagePars?: undefined;
    state?: undefined;
    setState?: undefined;
    setMessageContainerRef?: undefined;
    ActionProvider?: undefined;
    MessageParser?: undefined;
} | {
    widgetRegistry: WidgetRegistry;
    actionProv: any;
    messagePars: any;
    configurationError: string;
    invalidPropsError: string;
    state: any;
    setState: React.Dispatch<any>;
    setMessageContainerRef: React.Dispatch<any>;
    ActionProvider: any;
    MessageParser: any;
};
export default useChatbot;
