import { Dimensions, Platform } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { themeColor, FontBold } from '../Constant/index'


const deviceW = Dimensions.get('window').width
const basePx = 375
const guidelineBaseWidth = 350
// const guidelineBaseHeight = 680

const scale = size => deviceW / guidelineBaseWidth * size
const screenWidth = Math.round(Dimensions.get('window').width);

function getStatusBarHeight() {
    return Platform.select({
        ios: isIphoneX() ? scale(40) : scale(20),
        android: 0
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


export { scale, screenWidth, getStatusBarHeight, snack }