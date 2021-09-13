import React from 'react';
import './ChatbotMessage.css';
import { ICustomComponents } from '../../interfaces/IConfig';
interface IChatbotMessageProps {
    message: string;
    withAvatar?: boolean;
    loading?: boolean;
    messages: any[];
    delay?: number;
    id: number;
    setState?: React.Dispatch<React.SetStateAction<any>>;
    customComponents?: ICustomComponents;
    customStyles: {
        backgroundColor: string;
    };
}
declare const ChatbotMessage: ({ message, withAvatar, loading, messages, customComponents, setState, customStyles, delay, id, }: IChatbotMessageProps) => JSX.Element;
export default ChatbotMessage;
