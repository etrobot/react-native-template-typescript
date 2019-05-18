import React, { Component, } from 'react';
import { ActivityIndicator,Button,View, ViewStyle,TouchableOpacity,Text} from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationScreenProps} from 'react-navigation'
import {withAppContext,nvScrPropsex,ThemeConstants,ThemeContext} from './context'

export default class MyWebComponent extends Component<NavigationScreenProps, {}>{
  public static navigationOptions = (nv:NavigationScreenProps) => ({
    title: nv.navigation.getParam('title'),
    headerRight: (
      <ThemeContext.Consumer>
      {passContext => passContext && (
      <Button
        onPress={passContext.toggleTheme}
        title={passContext.theme}
      />)}
      </ThemeContext.Consumer>
    )
  });

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0,
  };

  _increaseCount = () => {
    console.log('xxx')
  };

  render() {
    const urlparam=this.props.navigation.getParam('code')
    const url=`${urlparam}`
    // console.log(url)
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

// export default withAppContext(MyWebComponent)