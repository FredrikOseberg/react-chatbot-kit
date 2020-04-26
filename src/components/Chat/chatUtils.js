export const uniqueIdGenerator = () => {
  return () => {
    return Math.random() * Math.random();
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
