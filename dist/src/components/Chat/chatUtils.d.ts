import { IMessage, IMessageOptions } from '../../interfaces/IMessages';
export declare const uniqueId: () => number;
export declare const botMessage: (message: IMessage) => boolean;
export declare const userMessage: (message: IMessage) => boolean;
export declare const customMessage: (message: IMessage, customMessages: any) => boolean;
export declare const createChatMessage: (message: string, type: string) => {
    message: string;
    type: string;
    id: number;
};
export declare const createChatBotMessage: (message: string, options: IMessageOptions) => {
    loading: boolean;
    widget?: string;
    delay?: number;
    message: string;
    type: string;
    id: number;
};
export declare const createCustomMessage: (message: string, type: string, options: IMessageOptions) => {
    loading?: boolean;
    widget?: string;
    delay?: number;
    message: string;
    type: string;
    id: number;
};
export declare const createClientMessage: (message: string, options: IMessageOptions) => {
    loading?: boolean;
    widget?: string;
    delay?: number;
    message: string;
    type: string;
    id: number;
};
export declare const callIfExists: (func: any, ...args: any) => any;
