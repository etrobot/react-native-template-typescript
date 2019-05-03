import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import { FlatList, NavigationScreenProps } from 'react-navigation';

interface MyProps { }
interface MyState {
  time: number,
  loading: boolean,
  data: string[],
  page: number,
  seed: number,
  error: boolean,
  refreshing: boolean
}

export default class FlatListDemoPage extends React.Component<NavigationScreenProps & MyProps, MyState>{
  constructor(props: NavigationScreenProps & MyProps) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.setState({ time: new Date().getTime(), loading: true, seed: Math.random() }, () => this.makeRemoteRequest());
  }

  //handleRefresh function
  handleRefresh = () => {
    this.setState({ time: new Date().getTime(), refreshing: true, page: 1 }, () =>
      this.makeRemoteRequest()
    );
  };

  handleLoadMore = () => {
    this.setState(
      (state, props) => {
        return { time: new Date().getTime(), loading: true, page: state.page + 1 };
      },
      () => this.makeRemoteRequest()
    );
  };


  makeRemoteRequest = async () => {
    const { page, seed } = this.state;
    const url = `http://localhost:5000/list/${page}`;
    console.log(url)
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      this.setState(
        {
          data: page === 1 ? data : [...this.state.data, ...data],
          error: data.error || null,
          loading: false,
          refreshing: false,
        },
        // () => this.searchFilterFunction("")
      );
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  _renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
      }}
    >
      <View style={{ justifyContent: 'center', marginLeft: 5 }}>
        <Text>{`${item.tag} ${item.title}`}</Text>
        <Text>{item.content}</Text>
      </View>
      <Button
        onPress={() => this.props.navigation.navigate('MyWebComponent', { code: item.title })}
        title=">"
      />
    </View>
  );

  _keyExtractor = (item: any, index: number) => item.title;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };


  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        ItemSeparatorComponent={this.renderSeparator}
        onEndReachedThreshold={0.4}
        onEndReached={this.handleLoadMore.bind(this)}
      />
    );
  }
}