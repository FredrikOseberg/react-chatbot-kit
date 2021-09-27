import { getObject } from '../Chatbot/utils';

class WidgetRegistry {
  constructor(setStateFunc, actionProvider) {
    this.setState = setStateFunc;
    this.actionProvider = actionProvider;
  }

  addWidget = (
    { widgetName, widgetFunc, mapStateToProps, props },
    parentProps
  ) => {
    this[widgetName] = {
      widget: widgetFunc,
      props,
      mapStateToProps,
      parentProps: { ...parentProps },
    };
  };

  getWidget = (widgetName, state) => {
    const widgetObject = this[widgetName];

    if (!widgetObject) return;

    let props = {
      scrollIntoView: state.scrollIntoView,
      ...widgetObject.parentProps,
      ...getObject(widgetObject.props),
      ...this.mapStateToProps(widgetObject.mapStateToProps, state),
      setState: this.setState,
      actionProvider: this.actionProvider,
    };

    const widget = widgetObject.widget(props);

    if (widget) {
      return widget;
    }

    return null;
  };

  mapStateToProps = (props, state) => {
    if (!props) return;

    return props.reduce((acc, prop) => {
      acc[prop] = state[prop];
      return acc;
    }, {});
  };
}

export default WidgetRegistry;
