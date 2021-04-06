import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    FlatList,
    Text,
    Image,
    View,
    ScrollView
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    leftVid
} from '../src/IconManager';
import {
    scale
} from '../src/Util'
import {
    themeColor,
    themeWhite,
    TRANLINE,
    rightWrongBack,
    Companyavtar
} from '../Constant/index'
import {
    Rating,
    NavigationHeader
} from '../Component/ViewManager'
import CustomButton from '../Component/Button'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
    FontBold,
    FontRegular,
    Background,
    darkract
} from '../Constant/index'
var m = ''

import Texting from '../Constant/Text'
const Items = global.language == 'english' ? true : false
class PreviewJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            def: ''
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

    // dateDiffInDays() {
    //     const a = new Date(global.Start_date).getFullYear()
    //     const b = new Date(global.End_date).getFullYear()
    //     global.CompanyExp = Math.floor(b - a)
    //     return Math.floor(b - a)

    // }

    render() {
        const {
            Hourly,
            Monthly,
            Yearly
        } = this.state
        return (
            <SafeAreaView style={styles.backGround}>
           
            <StatusBar hidden={false} backgroundColor={themeWhite} />
                    <View style={{
                width: wp('96%'),
                height: hp('100%') - 100,
                marginTop:scale(5)
            // marginHorizontal: wp(2),
            }}>
            <View style={{
                alignItems: "center",
                top: hp(1)
            }}><Texting style={{
                color: themeColor,
                fontWeight: 'bold',
                fontSize: scale(18),
                fontFamily: FontBold
            }} text = 'BASIC_INFO'/></View>
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
            source={global.uploadUri ? {
                uri: global.uploadUri,
            } : Companyavtar}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
          <View style={{
                width: '96%',
                top: hp(2),
                height: hp('60%'),
                backgroundColor: themeWhite,
                marginHorizontal: wp(2),
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
            <Texting style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }} text='Company'/>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.Company}</Text>
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
            <Texting style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }} text='Location'/>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,
                width: wp(85),
            }} numberOfLines={1}>{global.Address}</Text>
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
            <Texting style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }} text='Function'/>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.addSkill.map((item, index) => {
                return (
                    <Text key={index} style={{
                        fontFamily: FontBold,
                        fontSize: scale(16),
                        color: '#000'
                    }}>{Items ? item.english : item.german},</Text>
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
            <Texting style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }} text='Experience'/>
            </View>
             <View style={{
                alignItems: "flex-start",
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.minYear}-{global.maxYear} Years</Text>
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
            <Texting style={{
                fontSize: scale(18),
                fontFamily: FontBold,
                color: themeColor
            }}  text='Work_Type'/>
            </View>
             <View style={{
                alignItems: "flex-start",
                flexDirection: "row"
            }}>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.FullTime ? <Texting text='FullTime' /> : ''}</Text>
            <Text style={{
                color: '#000',
                fontSize: scale(16),
                fontFamily: FontBold,

            }}>{global.PartTime ? <Text> , PartTime</Text> : ''}</Text>
            </View>
            </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: '98%',
                marginVertical: hp(1),
                alignItems: "center"
            }}/>

            </View></View>
            
          
                </SafeAreaView>
        )
    }
}

export default withNavigationFocus(PreviewJob);