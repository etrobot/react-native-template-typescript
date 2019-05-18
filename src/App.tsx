import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProps,createMaterialTopTabNavigator, createBottomTabNavigator,createAppContainer,createStackNavigator} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import FlatListDemoPage from "./flist"
import MyWebComponent from './webViewScreen'
import Strategy from './strategy'
import {nvScrPropsex,ThemeContext, iState} from './context'
// import localStorage, {Note} from './noteStore'
import { AsyncStorage } from 'react-native';

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
},{navigationOptions: {
    theme: 'light',
  }
})

const topStack=createStackNavigator({
  TabsAB:{
    screen:TabsAB,
    navigationOptions: (pr:nvScrPropsex) => ({
      header:null,
      title: pr.navigation.state.routeName,
      theme:pr.theme
    }),
  },
  MyWebComponent
},{
  headerLayoutPreset:'center'
})

class AuthLoadingScreen extends React.Component<nvScrPropsex,iState>{
  constructor(props:nvScrPropsex) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(()=>this.props.navigation.navigate('topStack'),1);
  };
  // Render any loading content that you like here
  render() {
    return (
      <View style={{backgroundColor: '#558efc',flex:1.0}}>
      </View>
    );
  }
}

const AppContainer =  createAppContainer(createAnimatedSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    topStack: topStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component<nvScrPropsex,iState>{
  constructor(props:nvScrPropsex,istate:iState) {
    super(props,istate);

    this.state = {
      routeName:'',
      theme: '关注',
      logScr:this.logScr,
      toggleTheme:this.toggleTheme
    };
  } 

  logScr=async (routeName:string)=>{
    this.setState(({}:iState) => {
      let result={
        routeName: routeName,
        }
      // console.log(this.state.routeName)
      this.toggleTheme;
      return result;
    });
  }

  
  toggleTheme = async () => {
    let ifFavored:string = await AsyncStorage.getItem(this.state.routeName) as string;
    if(ifFavored==='取关'){
      await AsyncStorage.removeItem(this.state.routeName);
      ifFavored='关注'
    }else{
      ifFavored='取关'
      await AsyncStorage.setItem(this.state.routeName,ifFavored);
    }
    this.setState(({ theme }:{theme:string}) => {
      let result={
        theme: ifFavored,
      }
      console.log(ifFavored,this.state.theme)
      return result;
    });
  };

  render() {
    const context = this.state;
    return (
      <ThemeContext.Provider
      value={context}>
      <AppContainer
      />
      </ThemeContext.Provider>
    );
  }
}