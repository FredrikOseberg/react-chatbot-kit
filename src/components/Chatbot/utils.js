export const getCustomStyles = (config) => {
  if (config.customStyles) {
    return config.customStyles;
  }
  return {};
};

export const getInitialState = (config) => {
  if (config.state) {
    return config.state;
  }
  return {};
};

export const getWidgets = (config) => {
  if (config.widgets) {
    return config.widgets;
  }
  return [];
};

export const getCustomComponents = (config) => {
  if (config.customComponents) {
    return config.customComponents;
  }

  return {
    botMessageBox: {},
    chatButton: {},
  };
};

export const getBotName = (config) => {
  if (config.botName) {
    return config.botName;
  }
  return "Bot";
};

export const getObject = (object) => {
  if (typeof object === "object") return object;
  return {};
};

export const validateProps = (config, MessageParser) => {
  const errors = [];
  if (!config.initialMessages) {
    errors.push(
      "Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."
    );
  }

  const messageParser = new MessageParser();
  if (!messageParser["parse"]) {
    errors.push(
      "Messageparser must implement the method 'parse', please add this method to your object. The signature is parse(message: string)."
    );
  }

  return errors;
};
