import './UserChatMessage.css';
import { ICustomComponents } from '../../interfaces/IConfig';
interface IUserChatMessageProps {
    message: string;
    customComponents: ICustomComponents;
}
declare const UserChatMessage: ({ message, customComponents, }: IUserChatMessageProps) => JSX.Element;
export default UserChatMessage;
