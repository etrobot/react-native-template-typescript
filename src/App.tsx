import { createMaterialTopTabNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation'

import FlatListDemoPage from "./flist"

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation'
import MyWebComponent from './webViewScreen'

const topnavi = createMaterialTopTabNavigator({
  FlatListDemoPage: {
    screen: FlatListDemoPage
  },
  FontScreen: { screen: FlatListDemoPage },
  SvgScreen: { screen: FlatListDemoPage },
})

const topstack = createStackNavigator(
  { topnavi, MyWebComponent }, {
    navigationOptions: {
      tabBarLabel: '明日头条',
    },
    defaultNavigationOptions: {
      title: '明日'
    },
    headerLayoutPreset: 'center'
  });

const tab_b_stack = createStackNavigator(
  { FlatListDemoPage }, {
    navigationOptions: {
      tabBarLabel: '今日',
    },
    defaultNavigationOptions: {
      title: '今日'
    },
    headerLayoutPreset: 'center'
  });


const TabsAB = createBottomTabNavigator({
  // Tab_A: { screen: topnavi, navigationOptions: { tabBarLabel: '明日' }},
  topstack,
  tab_b_stack
})


export default createAppContainer(TabsAB)