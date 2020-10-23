import React, {
    PureComponent
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
    View
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
    themeColor,
    themeWhite,
    Background,
    sort,
    filter,
    TRANLINE,
    overlayimage
} from '../Constant/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    scale
} from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHead
} from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import DeviceInfo from 'react-native-device-info';
import PostedJobList from './PostedJobList';

class AdminDashboard extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            flagPosted: true,
        };
    }

    // Filter = () => {
    //     this.props.navigation.navigate('Filter')
    // }

    // push = (item) => {
    //     console.log("heelo", item);
    // // global.item = item;
    // // this.props.navigation.navigate('CompanyProfile')
    // }
    Back = () => {
        console.log('hey')
        this.props.navigation.navigate('JobEditProfile')
    }

    renderPage = () => {
        const {
            flagPosted
        } = this.state;
        if (flagPosted)
            return <PostedJobList />
    }
    render() {
        return (
            <View style={styles.backGround}>
                <StatusBar hidden={true} />
                <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                    <NavigationHead centerComponent='User Dashboard' rightComponent='Exit' onPress={() => this.Back()} onExit={() => this.Exit()} />
                    <View></View>
                    <View style={{
                height: hp(102) - ((wp(100) / 3) + scale(47))
            }}>{this.renderPage()}</View>
                    <View style={styles.TranLingImage}>
                        <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                </ImageBackground>
            </View>
        )
    }
};

export default withNavigationFocus(AdminDashboard);