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
  return {};
};

export const getBotName = (config) => {
  if (config.botName) {
    return config.botName;
  }
  return "Bot";
};
