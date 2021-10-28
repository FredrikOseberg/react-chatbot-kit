import IConfig from '../../interfaces/IConfig';

export const getCustomStyles = (config: IConfig) => {
  if (config.customStyles) {
    return config.customStyles;
  }
  return {};
};

export const getInitialState = (config: IConfig) => {
  if (config.state) {
    return config.state;
  }
  return {};
};

export const getWidgets = (config: IConfig) => {
  if (config.widgets) {
    return config.widgets;
  }
  return [];
};

export const getCustomComponents = (config: IConfig) => {
  if (config.customComponents) {
    return config.customComponents;
  }

  return {};
};

export const getBotName = (config: IConfig) => {
  if (config.botName) {
    return config.botName;
  }
  return 'Bot';
};

export const getObject = (object: Object) => {
  if (typeof object === 'object') return object;
  return {};
};

export const getCustomMessages = (config: IConfig) => {
  if (config.customMessages) {
    return config.customMessages;
  }
  return {};
};

export const validateProps = (config: IConfig, MessageParser: any) => {
  const errors = [];
  if (!config.initialMessages) {
    errors.push(
      "Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."
    );
  }

  // const messageParser = new MessageParser();
  // if (!messageParser['parse']) {
  //   errors.push(
  //     "Messageparser must implement the method 'parse', please add this method to your object. The signature is parse(message: string)."
  //   );
  // }

  return errors;
};

export const isConstructor = (func: any) => {
  try {
    new func();
  } catch (err) {
    return false;
  }
  return true;
};
