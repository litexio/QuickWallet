import { StyleSheet, PixelRatio } from 'react-native';
import { Colors, Metrics } from '../../Themes/';


export default StyleSheet.create({
    overlay:{
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    content: {
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'stretch',
    },
    container: {
        paddingTop:Metrics.doubleBaseMargin,
        backgroundColor:Colors.backgroundColor,
        borderRadius: Metrics.buttonRadius,
    },
    titleStyle:{
        textAlign:'center',
        fontWeight: '800',
        color:Colors.textColor,
    },
    textInput:{
        margin:Metrics.doubleBaseMargin,
        borderBottomColor: Colors.dividingLineColor,
        borderBottomWidth: 1 / PixelRatio.get(),
        marginBottom: 0,
    },
    bottomSection:{
        flexDirection:'row',
        alignItems:'stretch'
    },
    actionView:{
        flex:1,
    },
    actionStyle:{
        padding: 15,
        textAlign:'center',
    }
});
