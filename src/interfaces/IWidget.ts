import { ReactElement } from 'react';

interface IWidget {
  widgetName: string;
  widgetFunc: (props: any) => ReactElement;
  props: any;
  mapStateToProps: string[];
}

export default IWidget;
