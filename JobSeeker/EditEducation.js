import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, FlatList, Text, Image, View, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale } from '../src/Util'
import { themeColor, themeWhite, TRANLINE } from '../Constant/index'
import { Rating, NavigationHead } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular, Background } from '../Constant/index'
import ItemMV from './ItemMV'


const data = [{
    heading: ['BBA', 'MBA',],
    Company: 'BIT',
    Experience: 'Jan 2015 - Feb -2020'
}, {
    heading: ['MBA'],
    Company: 'UVC',
    Experience: 'Jan 2014 - Jan - 2015'
}, {
    heading: ['BCA', 'MCA'],
    Company: 'BU',
    Experience: 'Jan 2015 - Feb -2020'
}, {
    heading: ['Bechelor of information Science and technology'],
    Company: 'VTU',
    Experience: 'Jan 2013 - feb - 2014'
},]

class EditEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    Back = () => {
        // console.log("hi");
        this.props.navigation.goBack()
    }
    save = () => {
        // alert('video is coming soon');
        this.props.navigation.navigate('JobEditProfile');
    }
    Personal = () => {
        this.props.navigation.navigate('Personal');
    }


    render() {
        const {Hourly, Monthly, Yearly} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
            <NavigationHead centerComponent='Education' rightComponent="Save" onPress={() => this.Back()} onExit={() => this.save()}/>
                    <ImageBackground style={{
                width: wp('96%'),
                marginHorizontal: wp(2),
                height: hp('100%') - (StatusBar.currentHeight + 100 + hp(5)),
                top: wp(15)
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <View style={{
                justifyContent: "flex-end",
                flexDirection: 'column',
                height: wp(20),
                width: wp(35),
                borderRadius: scale(20),
                borderColor: themeColor,
                borderWidth: wp(0.6),
                alignItems: "center",
                backgroundColor: themeWhite,
                left: wp(30.5),
                top: wp(-10),
            }}><View style={{
                top: hp(1.5)
            }}>{leftVid('briefcase', 60, themeColor)}</View></View>
            <View style={{
                alignItems: "center",
                top: hp(-4)
            }}><Text style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>Edit Education</Text></View>
            <View style={{
                alignItems: "flex-end",
                right: wp(10),
                top: hp(-2)
            }}><CustomButton title={'Add Education'}
            onPress={() => this.Back}
            containerStyle={{
                width: '25%',
                color: 'black',
            // fontFamily: FontRegular
            }}
            buttonStyle={{
                backgroundColor: themeColor,
                height: '33%',
                borderRadius: scale(2),
                borderWidth: 0,
                elevation: 5
            }}
            titleStyle={{
                color: themeWhite,
                position: 'absolute',
                fontFamily: FontRegular,
                fontSize: scale(12),
            }}
            /></View>
          <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-22),
                height: hp('50%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('2%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
            <View style={{
                borderBottomWidth: scale(1),
                borderBottomColor: '#eee',
                width: '90%',
                alignItems: "center"
            }}/>
            <FlatList
            nestedScrollEnabled={true}
            style={{
                backgroundColor: themeWhite
            }}
            data = {data}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMV
                item={item}
                index={index}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('4%'),
                offset: hp('4%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            </View></ImageBackground>
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(EditEducation);