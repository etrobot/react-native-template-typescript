import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation'

import FlatListDemoPage from "./flist"

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import { NavigationScreenProps } from 'react-navigation'
import MyWebComponent from './webViewScreen'
import Strategy from './strategy'
import {themeState,ThemeContext} from './context'

const topnavi = createMaterialTopTabNavigator({
  全部: {
    screen: FlatListDemoPage
  },
  A股: { screen: FlatListDemoPage },
  港股: { screen: FlatListDemoPage },
})

const tab_a_stack = createStackNavigator(
  { topnavi}, {
    navigationOptions: {
      tabBarLabel: '资讯',
    },
    defaultNavigationOptions: {
      title: '资讯'
    },
    headerLayoutPreset: 'center'
  });

const tab_b_stack = createStackNavigator(
  { Strategy }, {
    navigationOptions: {
      tabBarLabel: '策略',
    },
    defaultNavigationOptions: {
      title: '策略'
    },
    headerLayoutPreset: 'center'
  });


const TabsAB = createBottomTabNavigator({
  // Tab_A: { screen: topnavi, navigationOptions: { tabBarLabel: '明日' }},
  tab_a_stack,
  tab_b_stack
})

const topStack=createStackNavigator({
  TabsAB:{
    screen:TabsAB,
    navigationOptions: ({ navigation }:NavigationScreenProps) => ({
      header:null,
      title: navigation.state.routeName,
    }),
  },
  MyWebComponent
},{
  headerLayoutPreset:'center'
})

const AppContainer = createAppContainer(topStack)
export default class App extends React.Component<{},{theme:string}> {

  state = {
    theme: 'light'
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
    console.log(this.state.theme)
  };

  render() {
    return (
      <ThemeContext.Provider
      value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}>
      <AppContainer
      />
      </ThemeContext.Provider>
    );
  }
}