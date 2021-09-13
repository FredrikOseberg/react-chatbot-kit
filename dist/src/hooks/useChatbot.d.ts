import WidgetRegistry from '../components/WidgetRegistry/WidgetRegistry';
import IConfig from '../interfaces/IConfig';
interface IUseChatbotParams {
    config: IConfig | null;
    actionProvider: any;
    messageParser: any;
    messageHistory: any[] | (() => {});
    saveMessages: (args: any) => any | null;
}
declare const useChatbot: ({ config, actionProvider, messageParser, messageHistory, saveMessages, ...rest }: IUseChatbotParams) => {
    configurationError: string;
    invalidPropsError?: undefined;
    widgetRegistry?: undefined;
    actionProv?: undefined;
    messagePars?: undefined;
    state?: undefined;
    setState?: undefined;
} | {
    invalidPropsError: string;
    configurationError?: undefined;
    widgetRegistry?: undefined;
    actionProv?: undefined;
    messagePars?: undefined;
    state?: undefined;
    setState?: undefined;
} | {
    widgetRegistry: WidgetRegistry;
    actionProv: any;
    messagePars: any;
    configurationError: string;
    invalidPropsError: string;
    state: any;
    setState: import("react").Dispatch<any>;
};
export default useChatbot;
