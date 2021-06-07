import React from 'react';
import { Dimensions, Platform,View,Text,PixelRatio,StatusBar,TouchableWithoutFeedback,Keyboard } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { themeColor, FontBold } from '../Constant/index'
import Texting from '../Constant/Text'

const deviceW = Dimensions.get('window').width
const basePx = 375
const guidelineBaseWidth = 350
// const guidelineBaseHeight = 680

function p(n) {
  // const deviceWidth = Dimensions.get('window').width;

  
  return Math.round((n / 3) * (PixelRatio.getPixelSizeForLayoutSize(deviceW) / PixelRatio.get()) / 360);
}

const scale = size => deviceW / guidelineBaseWidth * size
const screenWidth = Math.round(Dimensions.get('window').width);

function getStatusBarHeight() {
    return Platform.select({
        ios: isIphoneX() ? scale(40) : scale(20),
        android: StatusBar.currentHeight
    })
}

function isIphoneX() {
    const dimen = Dimensions.get('window')
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

function snack(text) {
    return Snackbar.show({
        text: text,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#fff',
        textColor: themeColor,
        fontFamily: FontBold
    });
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


const NoData = ({...props}) => <View
style={props.style ? props.style : {
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}}>
<Texting
  style={{
    textAlign: 'center',
    fontFamily: FontBold,
    color: themeColor,
    fontSize: scale(18),
    width: '60%',
  }} text={props.text ? props.text : 'No_data'}/>
</View>


export { scale, screenWidth, getStatusBarHeight, snack,NoData ,p,getDistanceFromLatLonInKm,HideKeyboard}