import React from 'react';
import { NavigationScreenProps } from 'react-navigation'

export interface iState{
    theme: string,
    toggleTheme:()=>void
}

export interface nvScrPropsex extends NavigationScreenProps {
    title:string,
    code:string,
    theme: string,
    toggleTheme:()=>void
  }
export const ThemeContext = React.createContext<iState|null>(null);

export type Dict = { [key: string]: string};
type DDict={[key: string]:Dict}
export const ThemeConstants:DDict = {
  light: {
    backgroundColor: '#fff',
    fontColor: '#000',
    activeTintColor: 'blue',
    inactiveTintColor: '#ccc',
    borderColor: 'rgba(0,0,0,0.2)',
  },
  dark: {
    backgroundColor: '#000',
    fontColor: '#fff',
    activeTintColor: '#fff',
    inactiveTintColor: '#888',
    borderColor: 'rgba(255,255,255,0.2)',
  },
};

const ctxt = React.createContext<iState | null>(null);

export const AppContextProvider = ctxt.Provider;
  
export const AppContextConsumer = ctxt.Consumer;

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<
  P extends { appContext?: iState } & NavigationScreenProps,
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