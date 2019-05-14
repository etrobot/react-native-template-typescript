import React, { Component, } from 'react';
import { ActivityIndicator,Button,View, ViewStyle,TouchableOpacity,Text} from 'react-native';
import { WebView } from 'react-native-webview';
// import { NavigationScreenProps} from 'react-navigation'
import {withAppContext,nvScrPropsex,ThemeConstants,ThemeContext} from './context'

export default class MyWebComponent extends Component<nvScrPropsex, {}>{
  public static navigationOptions = (nv:nvScrPropsex) => ({
    title: nv.navigation.getParam('title'),
    // headerStyle: {
    //   backgroundColor: ThemeConstants[nv.theme].backgroundColor,
    //   borderBottomColor: ThemeConstants[nv.theme].borderColor,
    // }
  });
  
  render() {
    const urlparam=this.props.navigation.getParam('code')
    const url=`${urlparam}`
    console.log(url)
    return (
      <ThemeContext.Consumer>
      {passContext => passContext && (
        <WebView 
        source={{ uri:url }}
        javaScriptEnabled={true}
        renderLoading={ ()=>{return (<ActivityIndicator/>)}} 
        startInLoadingState={true}
       />

        )}
       </ThemeContext.Consumer>
    );
  }
}

// export default withAppContext(MyWebComponent)