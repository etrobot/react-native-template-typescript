import React, { Component } from 'react';
import { ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationScreenProps } from 'react-navigation'

interface MyProps{
  code:string
}
export default class MyWebComponent extends Component<NavigationScreenProps, {}>{
  public static navigationOptions = (nv:NavigationScreenProps) => ({
    title: nv.navigation.getParam('code'),
  });
  render() {
    const urlparam=this.props.navigation.getParam('code')
    const url=`https://xueqiu.com/P/${urlparam}`
    console.log(url)
    return (
      <WebView 
        source={{ uri:url }}
        javaScriptEnabled={true}
        renderLoading={ ()=>{return (<ActivityIndicator/>)}} 
        startInLoadingState={true}
       />
    );
  }
}