import React, { Component } from 'react';
import { ActivityIndicator,Button,View, ViewStyle} from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationScreenProps} from 'react-navigation'
import {themeState,ThemeConstants,ThemeContext} from './context'
import {withAppContext} from './AppContext'

class MyWebComponent extends Component<NavigationScreenProps &{style:string}, {}>{
  public static navigationOptions = (nv:NavigationScreenProps) => ({
    title: nv.navigation.getParam('title'),
    headerRight: (
      <Button
        onPress={() => console.log('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  });
  
  render() {
    const urlparam=this.props.navigation.getParam('code')
    const url=`${urlparam}`
    console.log(url)
    return (
      <ThemeContext.Consumer>
      {appContext => appContext && (
      <WebView 
        source={{ uri:url }}
        javaScriptEnabled={true}
        renderLoading={ ()=>{return (<ActivityIndicator/>)}} 
        startInLoadingState={true}
       /> )}
       </ThemeContext.Consumer>
    );
  }
}

export default withAppContext(MyWebComponent)
