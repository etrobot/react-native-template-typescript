import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FlatList, NavigationScreenProps } from 'react-navigation';

interface MyProps { }
interface MyState {
  time: number,
  loading: boolean,
  data: object[],
  page: number,
  seed: number,
  error: boolean,
  refreshing: boolean
}

export default class Strategy extends React.Component<NavigationScreenProps & MyProps, MyState>{
  constructor(props: NavigationScreenProps & MyProps) {
    super(props);
    this.state = {
      time: new Date().getTime(),
      loading: false,
      data: [
        {'url':'ZH1081840','name':'策略1号'}
      ,{'url':'ZH1081846','name':'策略2号'}
      ,{'url':'ZH1081866','name':'策略3号'}
      ,{'url':'ZH1081867','name':'策略4号'}
      ,{'url':'ZH1081873','name':'策略5号'}
      ,{'url':'ZH1081896','name':'策略6号'}
    ],
      page: 1,
      seed: 1,
      error: false,
      refreshing: false
    };
  }


  _renderItem = ({ item }: { item: any }) => (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        padding:20
      }}
    >
    <Image source={require('./strategy.png')} />
    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebComponent', { code: 'https://xueqiu.com/P/'+item.url ,title:'组合详情'})}>
      <View style={{ justifyContent: 'center', marginLeft: 5 }}>
        <Text>{`【${item.name}】`}</Text>
        <Text>{item.url}</Text>
      </View>
     </TouchableOpacity>
    </View>
  );

  _keyExtractor = (item: any, index: number) => item.url;

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
        refreshing={this.state.refreshing}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }
}