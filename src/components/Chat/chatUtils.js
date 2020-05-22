import { getStoredState } from "../Chatbot/utils";

export const uniqueIdGenerator = () => {
  const storedState = getStoredState();

  if (storedState) {
    const lastMessage = storedState.messages[storedState.messages.length - 1];

    let num;
    if (storedState.messages.length > 0) {
      num = lastMessage.id;
    } else {
      num = 1;
    }

    return () => {
      return (num += 1);
    };
  }

  let num = 1;
  return () => {
    return (num += 1);
  };
};

const uniqueId = uniqueIdGenerator();

export const botMessage = (message) => {
  if (message.type === "bot") {
    return true;
  }
  return false;
};

export const createChatMessage = (message, type) => {
  return {
    message: message,
    type: type,
    id: uniqueId(),
  };
};

export const createChatBotMessage = (message, options) => {
  return {
    ...createChatMessage(message, "bot"),
    ...options,
    loading: true,
  };
};

export const callIfExists = (func, ...args) => {
  if (func) {
    return func(...args);
  }
};
