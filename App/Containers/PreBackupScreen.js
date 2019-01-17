import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/PreBackupScreenStyle';
import CommomBtnComponent from '../Components/CommomBtnComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Themes';
import { NavigationActions } from 'react-navigation';
import I18n from '../I18n';
import MnemonicWarningAlert from '../Components/MnemonicWarningAlert';



class PreBackupScreen extends Component {
  static navigationOptions = {
      title:I18n.t('PreBackupTabTitle'),
      headerLeft:null,
  }
  _onPressBtn=()=>{
      this.props.navigate('BackupScreen');
  }

  render () {
      const {mnemonic} = this.props;

      return (
          <View style={styles.container}>
              <MnemonicWarningAlert/>
              <View style={styles.topSection}>
                  <View style={styles.topView}>
                      <FontAwesome name={'pencil-square-o'} size={30} color={Colors.separateLineColor}/>
                      <Text style={styles.titleStytle}>备份助记词</Text>
                  </View>
                  <View style={styles.remindSection}>
                      <Text style={styles.remindText}>{I18n.t('PreBackupRemind')}</Text>
                  </View>
                  <Text style={styles.mnemonicText}>{mnemonic}</Text>
              </View>
              <View style={styles.bottomSection}>
                  <View style={styles.btnStyle}>
                      <CommomBtnComponent
                          title={I18n.t('NextStep')}
                          onPress={()=>this._onPressBtn()}/>
                  </View>
              </View>
          </View>
      );
  }
}

const mapStateToProps = (state) => {
    const {
        wallet:{mnemonic}
    } = state;
    return {
        mnemonic
    };
};

const mapDispatchToProps = (dispatch) => ({
    navigate: (route) => dispatch(NavigationActions.navigate({routeName: route})),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreBackupScreen);
