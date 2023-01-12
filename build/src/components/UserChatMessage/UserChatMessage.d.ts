import './UserChatMessage.css';
import { IBackgroundColor, IColor, ICustomComponents } from '../../interfaces/IConfig';
interface IUserChatMessageProps {
    message: string;
    customComponents: ICustomComponents;
    userMessageBox?: IBackgroundColor;
    userMessageText?: IColor;
}
declare const UserChatMessage: ({ message, customComponents, userMessageBox, userMessageText, }: IUserChatMessageProps) => JSX.Element;
export default UserChatMessage;
