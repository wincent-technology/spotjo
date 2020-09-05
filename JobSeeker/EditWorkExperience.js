import React, { Component } from 'react';
import { StatusBar, ImageBackground, FlatList, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale } from '../src/Util'
import { themeColor, themeWhite } from '../Constant/index'
import { Rating, NavigationHead } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular } from '../Constant/index'
import ItemMV from './ItemMV'


const data = [{
    heading: ['Technical Programmer', 'Technical Programmer', 'Technical Programmer'],
    Company: 'Google',
    Experience: 'Jan 2015 - Feb -2020'
}, {
    heading: ['Senior IT Expert Manager'],
    Company: 'tcs',
    Experience: 'Jan 2014 - Jan - 2015'
}, {
    heading: ['Senior IT Consultant'],
    Company: 'Google',
    Experience: 'Jan 2015 - Feb -2020'
}, {
    heading: ['Technical Programmer', 'Technical Consultant'],
    Company: 'IBM',
    Experience: 'Jan 2013 - feb - 2014'
}, {
    heading: ['Technical Programmer', 'Technical Programmer', 'Technical Programmer'],
    Company: 'Google',
    Experience: 'Jan 2015 - Feb -2020'
}, {
    heading: ['Senior IT Expert Manager'],
    Company: 'tcs',
    Experience: 'Jan 2014 - Jan - 2015'
}, {
    heading: ['Senior IT Consultant'],
    Company: 'Google',
    Experience: 'Jan 2015 - Feb -2020'
}, {
    heading: ['Technical Programmer', 'Technical Consultant'],
    Company: 'IBM',
    Experience: 'Jan 2013 - feb - 2014'
}]

class EditWorkExperience extends Component {
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
            <ImageBackground style={styles.ImageBlue}
            source={
            require('../Img/bg.jpg')
            }
            resizeMode={
            'stretch'
            } >
                <StatusBar hidden={true} />
                <ImageBackground style={styles.ImageBlue}
            source={require('../Img/glossy.png')}
            resizeMode={'stretch'}>
            <NavigationHead centerComponent='Work Experience' rightComponent="Save" onPress={() => this.Back()} onExit={() => this.save()}/>
                    <View style={{
                width: wp('96%'),
                height: hp('90%') - (scale(137) + StatusBar.currentHeight),
                backgroundColor: themeWhite,
                marginHorizontal: wp('2%'),
                marginTop: scale(20),
                borderRadius: scale(20),
                elevation: 7,
                top: wp(10)
            }}><View style={{
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
                fontSize: scale(14),
                fontFamily: FontBold
            }}>Edit Work Experience</Text></View>
            <View style={{
                alignItems: "flex-end",
                right: wp(5),
                top: hp(-2)
            }}><CustomButton title={'Add Experience'}
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
                borderWidth: 0
            }}
            titleStyle={{
                color: themeWhite,
                position: 'absolute',
                fontFamily: FontRegular,
                fontSize: scale(10),
            }}
            /></View>
          <View style={{
                width: '90%',
                alignItems: "center",
                alignSelf: "center",
                top: hp(-18),
                height: hp('46%'),
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
            </View></View>
                </ImageBackground></ImageBackground>
        )
    }
}

export default withNavigationFocus(EditWorkExperience);