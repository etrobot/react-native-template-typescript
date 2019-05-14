import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FlatList, NavigationScreenProps } from 'react-navigation';

interface MyState {
  time: number,
  loading: boolean,
  data: string[],
  page: number,
  seed: number,
  error: boolean,
  refreshing: boolean
}

export default class FlatListDemoPage extends React.Component<NavigationScreenProps, MyState>{
  constructor(props: NavigationScreenProps) {
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
    const url = `https://interface.sina.cn/wap_api/layout_col.d.json?showcid=76524&col=76524&level=&show_num=50&page=${page}&act=more`;
    console.log(url)
    try {
      const respdata = await fetch(url).then(response => response.json());
      const mydata=respdata.result.data.list
      // console.log(mydata)
      this.setState(
        {
          data: page === 1 ? mydata : [...this.state.data, ...mydata.result.data.list],
          error: mydata.error || null,
          loading: false,
          refreshing: false,
        },
        // () => this.searchFilterFunction("")
      );
    } catch (error) {
      console.log(error)
      this.setState({ error, loading: false });
    }
  };

  _renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        padding:20
      }}
    >
    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebComponent', { code: item.pc_url,title:'资讯正文' })}>
      <View style={{ justifyContent: 'center', marginLeft: 5 }}>
        <Text>{`【${item.source}】${item.stitle}`}</Text>
        <Text>{item.cTime}</Text>
      </View>
     </TouchableOpacity>
    </View>
  );

  _keyExtractor = (item: any, index: number) => item.news_id;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#f2f2f2'
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