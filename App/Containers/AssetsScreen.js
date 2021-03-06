import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { NavigationActions, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import styles from './Styles/AssetsScreenStyle';
import ListEmptyComponent from '../Components/ListEmptyComponent';
import { Colors, Images } from '../Themes';

import AssetActions from '../Redux/AssetRedux';
import I18n from '../I18n';
import { getValue } from '../Lib/Format';


class AssetsScreen extends Component {

  static navigationOptions = () => {
      return {
        title:I18n.t('AssetsTabTitle')
      }
  }

  _onRefresh = () => {
    this.props.getTokenList();
  }

  _onPressItem = (item) => {
    this.props.update({ selectedToken: item });
    this.props.navigate('TransferRecordScreen');
  }

  _renderItem = ({ item }) => {
    const { currency } = this.props;
    const { symbol: mark } = currency;
    const { Symbol: symbol, count, Rate: rate } = item;
    const value = getValue(count, rate);
    return (<TouchableOpacity style={styles.container}
        onPress={() => this._onPressItem(item)}
            >
      <View style={styles.itemContainer}>
        <View style={styles.leftSection}>
          <Image style={styles.symbolImg}
              source={symbol === 'ETH' ? Images.ethIcon : Images.erc20Icon}
          />
          <Text style={styles.titleStyle}>{symbol}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.countStyle}>{count}</Text>
          <Text style={styles.assetsStyle}>{mark}{value}</Text>
        </View>
      </View>
    </TouchableOpacity>);
  }
  _renderListHeader = () => (<View style={styles.headerStyle}>
    <Text style={styles.headTitle}>{I18n.t('Assets')}</Text>
  </View>)
  _renderListEmpty = () => <ListEmptyComponent containerStyle={styles.emptycontainer} />

  render() {
    const { tokenList, refreshing } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={()=> this.props.updateBalance()}/>
        <FlatList style={styles.flatList}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
                tintColor={Colors.textColor}
                title={I18n.t('Refreshing')}
                titleColor={Colors.textColor}
                            />}
            data={tokenList}
            extraData={this.props}
            renderItem={this._renderItem}
            ListHeaderComponent={this._renderListHeader}
            ListEmptyComponent={this._renderListEmpty}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    user: { currency },
    assets: { tokenList, refreshing }
  } = state;
  return { tokenList, refreshing, currency };
};

const mapDispatchToProps = (dispatch) => ({
  navigate: (route) => dispatch(NavigationActions.navigate({ routeName: route })),
  getTokenList: () => dispatch(AssetActions.getTokenListRequest()),
  update: ({ selectedToken }) => dispatch(AssetActions.update({ selectedToken })),
  updateBalance: () => dispatch(AssetActions.updateBalance())
});

export default connect(mapStateToProps, mapDispatchToProps)(AssetsScreen);
