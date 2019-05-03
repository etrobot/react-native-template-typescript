import { createMaterialTopTabNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation'

import FlatListDemoPage from "./flist"

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import MyWebComponent from './webViewScreen'
import Strategy from './strategy'

const topnavi = createMaterialTopTabNavigator({
  全部: {
    screen: FlatListDemoPage
  },
  A股: { screen: FlatListDemoPage },
  港股: { screen: FlatListDemoPage },
})

const topstack = createStackNavigator(
  { topnavi, MyWebComponent }, {
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
  topstack,
  tab_b_stack
})


export default createAppContainer(TabsAB)