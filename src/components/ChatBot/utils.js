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
  return [];
};

export const getWidgets = (config) => {
  if (config.widgets) {
    return config.widgets;
  }
  return [];
};
