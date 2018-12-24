import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './Styles/UserTermsAlertStyle';
import Overlay from 'react-native-modal-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Metrics, Colors } from '../Themes';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class UserTermsAlert extends Component {

    static propTypes = {
        isShow: PropTypes.bool,
    }

    static defaultProps = {
        isShow: false
    }

    constructor (props) {
        super(props);
        this.state = {
            isOpen:true,
        };
    }

    _onPressBtn=()=>{
        this.setState({
            isOpen:false,
        });
    }

    render () {
        const remin001 = '我已仔细阅读并同意以上条款以及';
        const remin002 = 'Cookiss的使用说明';


        const {isShow} = this.props;
        const {isOpen} = this.state;
        const isSelected = true;
        const selectedImg = isSelected ? <AntDesign name={'checkcircle'} size={Metrics.icons.small} color={Colors.textColor}/> : <AntDesign name={'checkcircleo'} size={Metrics.icons.small} color={Colors.separateLineColor}/>;
        return (
            <Overlay
                containerStyle={styles.overlay}
                childrenWrapperStyle={styles.content}
                visible={isShow && isOpen}
                animationType='zoomIn'
                animationDuration={300}>
                <View style={styles.container}>
                    <View style={styles.topSection}>
                        <Text style={styles.titleStyle}>使用条款</Text>
                        <FontAwesome name={'compass'} size={Metrics.icons.small} color={Colors.textColor}/>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.contentTop}></View>
                        <View style={styles.bottomContent}>
                            {selectedImg}
                            <View style={styles.remindView}>
                                <Text style={styles.remind}>{remin001}</Text>
                                <Text style={[styles.remind, {marginTop:Metrics.smallMargin, color:Colors.textColor}]}>{remin002}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={()=>this._onPressBtn()}>
                        <View style={styles.bottomSection}>
                            <Text style={styles.btnTitle}>继续</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Overlay>
        );
    }
}


