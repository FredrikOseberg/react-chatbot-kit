export interface IBaseMessage {
    message: string;
    type: string;
    id: number;
}
export interface IMessageOptions {
    loading?: boolean;
    widget?: string;
    delay?: number;
    payload?: any;
}
export interface IMessage extends IBaseMessage {
    options?: IMessageOptions;
    loading?: boolean;
    widget?: string;
    delay?: number;
    withAvatar?: boolean;
    payload?: any;
}
