import React, { Component } from 'react';
import { SafeAreaView, StatusBar, ImageBackground, FlatList, Text, Image, View, ScrollView } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, leftVid } from '../src/IconManager';
import { scale } from '../src/Util'
import { themeColor, themeWhite, TRANLINE, rightWrongBack } from '../Constant/index'
import { Rating, NavigationHeader } from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { FontBold, FontRegular, Background } from '../Constant/index'
import JobBasicInfoItemMV from './JobBasicInfoItemMV'


class BasicInfoOfCompany extends Component {
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
        console.log("hello>>>>>>>>>", global.item)
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source={Background}
            resizeMode={'stretch'}>
                <StatusBar hidden={true} />
                    <ImageBackground style={{
                width: wp('96%'),
                marginHorizontal: wp(2),
                height: hp('100%') - (StatusBar.currentHeight + 150 + hp(5)),
                top: wp(14)
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <View style={{
                alignItems: "center",
                top: hp(1)
            }}><Text style={{
                color: themeColor,
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }}>BASIC INFO</Text></View>
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                top: hp(1),
                marginLeft: wp('29%'),
                width: wp('38%'),
                height: hp('12%'),
                // borderRadius: scale(20),
                overflow: 'hidden',
            }}><Image
            source={{
                uri: global.item.image,
            }}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
          <View style={{
                width: '90%',
                top: hp(2),
                height: hp('50%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp('5%'),
                // marginTop: scale(20),
                borderRadius: scale(20),
            // elevation: 7,
            }}>
            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",

            // marginLeft: wp(3)
            }}>
            <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }}>Company</Text>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.item.ComPany_Name}</Text>
            </View>
            </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: '98%',
                marginVertical: hp(1),
                alignItems: "center"
            }}/>
            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",

            // marginLeft: wp(3)
            }}>
            <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }}>Location</Text>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.item.Address}</Text>
            </View>
            </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: '98%',
                marginVertical: hp(1),
                alignItems: "center"
            }}/>
            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",

            // marginLeft: wp(3)
            }}>
            <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }}>Function</Text>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.item.skill.map((item, index) => {
                return (
                    <Text key={index} style={{
                        fontFamily: FontBold,
                        fontSize: scale(16),
                        color: '#000'
                    }}>{item},</Text>
                )
            })}</Text>
            </View>
            </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: '98%',
                marginVertical: hp(1),
                alignItems: "center"
            }}/>
             <View style={{
                flexDirection: "column",
                alignItems: "flex-start",

            // marginLeft: wp(3)
            }}>
            <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }}>Experience</Text>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.item.work_Experience}</Text>
            </View>
            </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: '98%',
                marginVertical: hp(1),
                alignItems: "center"
            }}/>
            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",

            // marginLeft: wp(3)
            }}>
            <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }}>Work Type</Text>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.item.work_Type}</Text>
            </View>
            </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: '98%',
                marginVertical: hp(1),
                alignItems: "center"
            }}/>

            </View></ImageBackground>
            
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
            <View style={{
                top: hp(7),
                // zIndex: 5,
                height: hp(6),
                width: wp(105),
                left: wp(-2)
            }}>
            <Image source={rightWrongBack} style={styles.imageStyle} resizeMode={'stretch'}/></View>
                </ImageBackground></SafeAreaView>
        )
    }
}

export default withNavigationFocus(BasicInfoOfCompany);