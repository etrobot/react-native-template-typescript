import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getIsLoggedIn } from 'src/redux/reducers/auth'
import { getIsAppReady } from 'src/redux/reducers/app'
import actions from 'src/redux/actions'

const mapStateToProps = (state: Object) => ({
  isAppReady: getIsAppReady(state),
  isLoggedIn: getIsLoggedIn(state)
})

type Props = {
  isAppReady: boolean,
  isLoggedIn: boolean,
  initializeApp: () => void,
  navigation: any
}

@connect(mapStateToProps, actions)
export default class SplashScreen extends Component<void, Props, void> {
  static navigationOptions = {
    header: {
      visible: false
    }
  }

  componentDidMount () {
    this.props.initializeApp()
  }

  componentDidUpdate () {
    if (this.props.isAppReady) {
      if (this.props.isLoggedIn) {
        this._navigateTo('MainDrawerNavigator')
      } else {
        this._navigateTo('AuthScreen')
      }
    }
  }

  _navigateTo = (routeName: string) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <View style={styles.container} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
})