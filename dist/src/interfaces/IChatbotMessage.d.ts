interface IChatbotMessage {
    message: string;
    id: number;
    type: string;
    loading: boolean;
    options?: IOptions;
}
interface IOptions {
    widget: string;
    delay: number;
}
export default IChatbotMessage;
