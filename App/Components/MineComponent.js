import React, { Component } from 'react';
import styles from './Styles/MineComponentStyle';
import { FlatList, Text, TouchableOpacity, Image, Share, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Metrics , Colors } from '../Themes';
import { View } from 'react-native-animatable';
import {MineConfig} from '../Config/MineConfig';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import { NavigationActions } from 'react-navigation';
import UserActions from '../Redux/UserRedux';
import  Identicon from 'identicon.js';
// import I18n from '../I18n';

class MineComponent extends Component {

    componentDidMount=()=>{
        const {address} = this.props;
        this.props.getUserInfo({address});
    }

  _onPressAvatar=()=>{
      this.props.navigate('AccountScreen');
  }

  _onPressAssets=()=>{
      this.props.navigate('AssetsScreen');
  }

  _onPressShare=()=> {
      const shareUrl = 'http://litex.io/';
      const {sharecode} = this.props;
      let shareParams = {};
      if (Platform.OS === 'ios') {
          const url =  shareUrl + '?sharecode=' + sharecode;
          shareParams = {url};
      } else {
          const message = shareUrl + '?sharecode=' + sharecode;
          shareParams = {message};
      }
      Share.share(shareParams);
  };

  _onPressItem=(key)=>{
      const {navigate} = this.props;
      switch (key) {
      case MineConfig.setting.key:
          navigate('SettingScreen');
          break;
      case MineConfig.help.key:

          break;
      case MineConfig.agreement.key:

          break;
      case MineConfig.about.key:

          break;
      case MineConfig.share.key:
          this._onPressShare();
          break;
      default:
          break;
      }

  }

  _renderItem=({item})=>{
      const {key='', title='', isNext=false} = item;
      const nextImg = isNext ? (<View>
          <MaterialIcons name={'navigate-next'} size={Metrics.icons.medium} color={Colors.textColor}/>
      </View>) : null;
      let typeImg = null;
      switch (key) {
      case MineConfig.setting.key:
          typeImg = <AntDesign name={'setting'} size={Metrics.icons.small} color={Colors.textColor}/>;
          break;
      case MineConfig.help.key:
          typeImg = <MaterialCommunityIcons name={'headset'} size={Metrics.icons.small} color={Colors.textColor}/>;
          break;
      case MineConfig.agreement.key:
          typeImg = <Entypo name={'feather'} size={Metrics.icons.small} color={Colors.textColor}/>;
          break;
      case MineConfig.about.key:
          typeImg = <MaterialCommunityIcons name={'clover'} size={Metrics.icons.small} color={Colors.textColor}/>;
          break;
      case MineConfig.share.key:
          typeImg = <AntDesign name={'sharealt'} size={Metrics.icons.small} color={Colors.textColor}/>;
          break;
      default:
          break;
      }

      return ( <TouchableOpacity onPress={()=>this._onPressItem(key)}>
          <View style={styles.itemContainer}>
              <View style={styles.itemLeft}>
                  {typeImg}
                  <Text style={styles.titleColor}>{title}</Text>
              </View>
              {nextImg}
          </View>
      </TouchableOpacity>);
  }

  _renderItemSeparator= ()=><View style={styles.itemSeparator}/>

  render () {
      const {nickname, address, ethBanance} = this.props;

      const avatar = new Identicon(address).toString();
      const avatar_64='data:image/png;base64,'+avatar;


      const data = Object.values(MineConfig);
      return (
          <View style={styles.container}>
              <View style={styles.topSection}>
                  <TouchableOpacity style={styles.avatarSection} onPress={()=>this._onPressAvatar()}>
                      <View style={styles.avatarSection}>
                          <Image style ={styles.avatar} source={{uri: avatar_64}}/>
                          <Text style={styles.nameText}>{nickname}</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.assetsSection} onPress={()=>this._onPressAssets()}>
                      <View style={styles.assetsSection}>
                          <Text style={styles.assetsStyle}>资产总价值：{ethBanance}</Text>
                      </View>
                  </TouchableOpacity>

              </View>
              <View style={styles.bottomSection}>
                  <FlatList
                      style={styles.flatList}
                      data={data}
                      keyExtractor={(item,index)=>''+index}
                      renderItem={ this._renderItem }
                      ItemSeparatorComponent = {this._renderItemSeparator}
                  />
              </View>
          </View>
      );
  }
}

const mapStateToProps = (state) => {
    const {
        user:{nickname, address, sharecode},
        assets:{ethBanance}
    } = state;
    return { ethBanance, nickname, address, sharecode};
};

const mapDispatchToProps = (dispatch) => ({
    navigate: (route) => dispatch(NavigationActions.navigate({routeName: route})),
    getUserInfo: (params) => dispatch(UserActions.getUserInfoRequest(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MineComponent);
