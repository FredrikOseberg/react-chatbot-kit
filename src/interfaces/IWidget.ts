import * as React from "react";

interface IWidget {
  widgetName: string;
  widgetFunc: (props: any) => React.JSX.Element;
  props: any;
  mapStateToProps: string[];
}

export default IWidget;
