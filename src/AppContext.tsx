import * as React from 'react';
import { NavigationScreenProps} from 'react-navigation'
export interface AppContextInterface {
  name: string,
  author: string,
  url: string
}

const ctxt = React.createContext<AppContextInterface | null>(null);

export const AppContextProvider = ctxt.Provider;
  
export const AppContextConsumer = ctxt.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<
  P extends { appContext?: AppContextInterface } & NavigationScreenProps,
  R = Omit<P, 'appContext'>
  >(
  Component: React.ComponentClass<P> | React.StatelessComponent<P>
  ): React.SFC<P> {
  return function BoundComponent(props: P) {
    return (
      <AppContextConsumer>
        {value => <Component {...props} appContext={value} />}
      </AppContextConsumer>
    );
  };
}