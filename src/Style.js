import { Dimensions, StyleSheet, StatusBar } from 'react-native';
import { scale, getStatusBarHeight } from './Util';
const {height, width} = Dimensions.get('window');
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from '../Component/responsive-ratio';
import { themeColor, themeWhite } from '../Constant/index';
import { FontBold, FontRegular } from '../Constant/index';
import DeviceInfo from 'react-native-device-info';

let hasNotch = DeviceInfo.hasNotch();

module.exports = {
    MainFlex: {
        flex: 1,
    },
    backGround: {
        flex: 1,
        backgroundColor: themeColor
    },
    ImageBlue: {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        position: 'absolute',
    },
    imageStyle: {
        height: '100%',
        width: '100%',
    },
    SplashLogoSpotjo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    OpportunityView: {
        height: scale(40),
        width: scale(250),
        backgroundColor: themeWhite,
        elevation: 17,
    },
    TalentView: {
        height: scale(40),
        width: scale(250),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeWhite,
    },
    OppoTalentText: {
        fontSize: scale(18),
        fontFamily: FontBold,
        color: '#37c0d3',
        fontWeight: 'bold',
    },
    LookingFor: {
        fontSize: scale(24),
        fontFamily: FontBold,
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.9)',
    },
    YoutTubeLogo: {
        marginLeft: scale(5),
        height: scale(22),
        width: scale(28),
        backgroundColor: themeWhite,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    MainScreenPlayLogo: {
        marginLeft: scale(5),
        height: scale(21),
        width: scale(27),
        backgroundColor: themeWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Homeplay: {
        top: scale(55),
        left: scale(25),
        position: 'absolute',
        flexDirection: 'row',
    },
    Hometext: {
        color: themeWhite,
        fontFamily: FontRegular
    },
    Homelogin: {
        top: scale(50),
        right: scale(25),
        position: 'absolute',
    },
    HomeLogo: {
        top: scale(150),
        height: scale(150),
        width: Dimensions.get('window').width / 2 + scale(80),
        justifyContent: 'center',
        alignItems: 'center',
        left: Dimensions.get('window').width / 4 - scale(40),
        position: 'absolute',
    },
    Homelooking: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(300),
    },
    Homebut: {
        left: Dimensions.get('window').width / 7,
        marginTop: scale(360),
        position: 'absolute',
    },
    HomeTel: {
        left: Dimensions.get('window').width / 7,
        marginTop: scale(420),
        position: 'absolute',
    },
    FontSty: {
        color: themeWhite,
        fontWeight: 'bold',
    // fontFamily: FontRegular
    },
    Size: {
        height: scale(20),
        // width: scale(50),
        width: wp('20%'),

    },
    CenterLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    SwitchView: {
        backgroundColor: themeWhite,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(18),
        height: scale(18),
        width: scale(32),
        top: 2,
        alignSelf: "center"
    },
    MainSwitchView: {
        position: 'absolute',
        flexDirection: 'row',
    },
    HeadingText: {
        top: scale(10),
        width: wp('80%'),
    },
    Next: {
        top: hp('80%'),
        right: wp('7%'),
        position: "absolute"
    },
    Employment: {
        fontFamily: FontRegular,
        color: themeWhite,
        fontWeight: 'bold',
    },
    NameTag: {
        position: 'absolute',
        marginLeft: scale(15),
        flexDirection: 'row',
    },
    filterHeader: {
        flexDirection: 'row',
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hasNotch ? StatusBar.currentHeight + hp(3.5) : hp(2),
    },
    FilterLeft: {
        left: scale(10),
        position: 'absolute',
    },
    FilterMainView: {
        width: wp('96%'),
        height: hp('100%') - (scale(100) + StatusBar.currentHeight),
        // backgroundColor: themeWhite,
        marginHorizontal: wp('2%'),
        marginTop: scale(20),
        borderRadius: scale(20),
    // elevation: 7,
    },
    FilterScroll: {
        alignSelf: 'stretch',
        marginBottom: scale(20),
        marginTop: scale(5),
    },
    FilterDropDown: {
        width: wp('90%'),
        borderWidth: scale(1),
        marginLeft: wp('2.3%'),
        marginTop: scale(2),
        borderLeftWidth: scale(8),
        borderLeftColor: 'rgba(55,192,211,0.5)',
        borderTopColor: 'gray',
        borderBottomColor: 'rgba(169,169,169,0.8)',
        borderRightColor: 'gray',
        borderRadius: scale(5),
        borderBottomWidth: scale(2)
    // overflow: "hidden",
    // elevation: scale(4)
    },
    FilterDropDownInnerView: {
        height: scale(40),
        // width: scale(25),
        alignItems: 'center',
        marginLeft: scale(10),
        flexDirection: 'row',
    },
    DropDownHeader: {
        fontSize: scale(21),
        fontFamily: FontRegular,
        color: '#000',
        marginLeft: scale(5),
    },
    FilterMinimumSalary: {
        width: wp('90%'),
        height: scale(50),
    },
    FilterMinimumSalaryMin: {
        flexDirection: 'row',
    },
    FilterMinText: {
        left: scale(15),
        fontSize: scale(12),
        fontFamily: FontRegular,
    },
    FilterMaxText: {
        right: scale(20),
        position: 'absolute',
        fontSize: scale(12),
        fontFamily: FontRegular,
    },
    FilterMinimumSalarySlider: {
        width: wp('86%'),
        height: scale(10),
        flex: 1,
        alignSelf: 'center',
    },
    SalaryTypeView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(10),
        marginBottom: scale(10),
    },
    CheckBoxLabel: {
        marginLeft: scale(9),
    },
    CheckBoxLabelFont: {
        fontSize: scale(18),
        fontFamily: FontRegular,
    },
    RadioSearchType: {
        // flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('90%'),
        height: scale(40),
        marginTop: scale(-10),
    },
    RadioSearchTypeView: {
        height: 15,
        alignItems: 'center',
    // margin: 5,
    },
    RadioSearchTypeLabel: {
        fontSize: scale(14),
        fontFamily: FontRegular,
        color: '#000',
        fontWeight: 'bold',
    },
    SaveFilterButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(40),
    },
    SaveFilterButtonView: {
        width: wp('60%'),
        backgroundColor: themeColor,
        borderRadius: scale(5),
    },
    ItemMVMainView: {
        flex: 1,
        // backgroundColor: themeWhite,
        height: hp('26%'),
        width: wp('98%'),
        marginLeft: wp('1%'),
        marginVertical: hp(0.5),
        borderRadius: scale(15),
        elevation: 5,
    },
    ItemMVSecondView: {
        flexDirection: 'row',
        marginTop: scale(5),
        width: wp('98%'),
    },
    ItemMVHeader: {
        fontWeight: 'normal',
        fontSize: scale(15),
        fontFamily: FontBold,
        color: themeColor,
        fontWeight: 'bold',
        marginLeft: scale(10),
    },
    ItemMVPlayNowView: {
        flexDirection: 'row',
        right: scale(15),
        position: 'absolute',
    },
    ItemMVPlayNowText: {
        fontSize: scale(12),
        fontFamily: FontRegular,
        color: themeColor,
        fontWeight: 'bold',
        alignSelf: "center"
    },
    ItemMVPlayIcon: {
        marginLeft: scale(5),
        height: scale(20),
        width: scale(26),
        // borderBottomColor: themeColor,
        // borderBottomWidth: scale(2),
        borderRadius: scale(5),
        paddingTop: scale(1)
    // justifyContent: 'center',
    // alignItems: 'center',
    },
    ItemMVImage: {
        height: scale(95),
        width: scale(110),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(1),
        marginLeft: scale(10),
        marginTop: scale(7),
        borderColor: themeColor,
    },
    ItemMVDetail: {
        position: 'absolute',
        marginTop: scale(30),
        marginLeft: scale(140),
        flexDirection: 'column',
    },
    ItemMVDetailIcon: {
        marginTop: scale(2),
        flexDirection: 'row',

    },
    CompanyDetailIcon: {
        marginTop: scale(5),
        marginLeft: scale(12),
        flexDirection: 'row',

    },
    ItemDetailLabel: {
        marginLeft: scale(6),
        fontFamily: FontRegular,
        fontSize: scale(12)

    },
    ItemDetailLabel1: {
        marginLeft: scale(10),
        fontSize: scale(18),
        fontFamily: FontRegular,
    // justifyContent: "center"
    },
    CompanyProfileDetailLabel100: {
        top: scale(1),
        fontSize: scale(14),
        fontFamily: 'Roboto-Regular',
    },
    ItemMVDetailColor: {
        color: themeColor,
        fontFamily: FontRegular,
        fontSize: scale(12)

    },
    ItemMVTimeStamp: {
        flexDirection: 'row',
        marginTop: scale(10),
        marginBottom: scale(20),
    },
    ItemMVTimeStampView: {
        left: scale(20),
        position: 'absolute',
    },
    ItemMVRatingView: {
        right: scale(12),
        position: 'absolute',
    },
    JoblistMainView: {
        flexDirection: 'row',
        width: wp('100%'),
        backgroundColor: 'transparent',
        alignItems: "center",
        marginTop: hasNotch ? StatusBar.currentHeight + hp(3.5) : hp(2)
    },
    JoblistLogo: {
        marginLeft: scale(10),
        justifyContent: 'center',
        alignItems: 'flex-start',
        // paddingTop: hp(1.5),
        position: "absolute"
    // alignSelf: 'center'
    },
    JoblistLogoImageSize: {
        width: scale(18),
        height: scale(18),
    },
    JoblistMainViewHeading: {
        marginLeft: scale(10),
        justifyContent: 'center',
        alignItems: 'center',

    },
    JoblistMainViewHeadingText: {
        fontSize: scale(20),
        fontFamily: FontBold,
        fontWeight: 'bold',
        color: themeWhite
    },
    JoblistSecondViewHeading: {
        borderTopColor: 'gray',
        borderTopWidth: scale(2),
        borderBottomWidth: scale(2),
        borderBottomColor: 'gray',
        flexDirection: 'row',
        width: wp('100%'),
        backgroundColor: themeWhite,
        height: scale(40),
        alignItems: 'center',
        elevation: 8,
    },
    JoblistSecondViewHeadingResult: {
        backgroundColor: themeWhite,
        justifyContent: 'center',
        left: scale(10),
    },
    JoblistSecondViewHeadingText: {
        fontSize: scale(20),
        fontFamily: FontRegular,
        fontWeight: 'normal',

    },
    JoblistUpperButton: {
        fontSize: scale(19),
        fontFamily: FontRegular,
        color: themeColor,
        marginLeft: scale(2)
    },
    JobListUpperButtonView: {
        right: scale(10),
        position: 'absolute',
        justifyContent: 'center',
        flexDirection: 'row',
    // marginHorizontal: scale(5)
    },
    JobListUpperButtonIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    CompanyProfileIcon: {
        height: scale(13),
        width: scale(13),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    CompanyDetailProfileIcon: {
        height: scale(18),
        width: scale(18),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    fliterIcon: {
        height: scale(30),
        width: scale(30),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    CompanyProfileMainImage: {
        width: wp('96%'),
        height: hp('100%') - (StatusBar.currentHeight + scale(100)),
        // backgroundColor: themeWhite,
        marginHorizontal: wp('2%'),
        marginTop: scale(20),
        borderRadius: scale(20),
        // elevation: 8,
        // borderBottomWidth: scale(2),
        // borderRightWidth: scale(1),
        borderRightColor: "gray"
    },
    CompanyProfileMainImage1: {
        width: wp('96%'),
        height: hp('100%') - (StatusBar.currentHeight + scale(135)),
        // backgroundColor: themeWhite,
        marginHorizontal: wp('2%'),
        marginTop: scale(20),
        borderRadius: scale(20),
        // elevation: 8,
        // borderBottomWidth: scale(2),
        // borderRightWidth: scale(1),
        borderRightColor: "gray"
    },
    CompanyProfileImageSize: {
        width: wp(91),
        // marginLeft: wp(2),
        marginHorizontal: wp('2%'),
        height: hp(30),
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        overflow: 'hidden',
    },
    CompanyProfileSecongImage: {
        marginTop: hp('-7.5%'),
        borderWidth: scale(2),
        borderColor: themeColor,
        marginLeft: wp('26.5%'),
        width: wp('40%'),
        height: hp('15%'),
        borderRadius: scale(20),
        overflow: 'hidden',
    },
    CompanyProfileDetail: {
        marginLeft: scale(20),
        marginTop: scale(10),
        flexDirection: 'column',
    },
    CompanyLoginOpportunityView: {
        height: scale(40),
        width: wp('80%'),
        backgroundColor: themeWhite,
        elevation: 17,
    },
    CompanyLoginalentView: {
        height: scale(40),
        width: wp('80%'),
        alignItems: 'center',
        backgroundColor: themeWhite,
        borderRadius: scale(5),
        marginBottom: scale(5),
    },
    CompanyOppoTalentText: {
        fontSize: scale(18),
        fontFamily: FontBold,
        color: '#37c0d3',
        fontWeight: 'bold',
    },
    CompanyLoginButton: {
        borderRadius: scale(5),
        flexDirection: 'row',
    },
    CompanyLoginIcon: {
        height: scale(20),
        width: scale(20),
        marginLeft: scale(50),
        marginRight: scale(10),
    },
    CompanyLoginAccountText: {
        bottom: scale(40),
        alignSelf: 'center',
        position: 'absolute',
        textAlign: 'center',
        alignItems: 'center',
    },
    CompanyLoginWithEmailView: {
        height: scale(30),
        width: scale(100),
        alignItems: 'center',
        backgroundColor: themeWhite,
        borderRadius: scale(5),
        marginBottom: scale(5),
        elevation: 5,
    },
    ButtonStyle: {
        backgroundColor: themeWhite,
        borderRadiuserLeftWidth: scale(5),
        borderColor: 'rgba(55,192,211,0.4)',
        borderLeftWidth: scale(8),
        borderTopWidth: scale(1),
        borderTopColor: '#b4b4b4',
        borderRightWidth: scale(0.5),
        borderBottomWidth: scale(1),
        borderBottomColor: '#b4b4b4',
        borderRightColor: '#b4b4b4',
    },
    titleStyle: {
        color: 'black',
        position: 'absolute',
        left: scale(45),
        fontFamily: FontRegular,
        fontSize: scale(20)
    // right: scale(25)
    },
    buttonContainerStyle: {
        width: '93%',
        marginLeft: '3%',
        marginVertical: scale(1),
        color: 'black',
        fontFamily: FontRegular
    },
    JobEditProfileMainView: {
        height: hp('18%'),
        marginTop: '3%',
        width: '91%',
        marginLeft: '3.5%',
        overflow: 'hidden',
        // backgroundColor: '#5D26C1',
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(10),
        flexDirection: 'column',
    },
    JobEditProfileHead: {
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        marginHorizontal: scale(30),
        marginTop: scale(10),
        marginBottom: scale(5),
    },
    JobEditProfileResumeVideo: {
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        marginRight: scale(10),
    },
    MapViewStyle: {
        height: wp('65%'),
        width: wp('96%'),
        marginLeft: wp('2%'),
        marginTop: wp('2%'),
    },
    MapSliderText: {
        marginTop: scale(10),
        width: wp('90%'),
        height: scale(20),
        marginLeft: wp('5%')
    },
    MapVerticalList: {
        width: wp('99%'),
        height: hp('43%'),
        marginTop: 10,
        marginBottom: 60,
    // backgroundColor: themeColor
    // backgroundColor: themeWhite
    },
    VideoIconSize: {
        height: scale(45),
        width: scale(40)
    },
    AvtarView: {

        width: wp(32),
        height: wp(32),
        // backgroundColor: "transparent",
        // borderColor: "#eee",
        // borderWidth: wp(0.7),
        justifyContent: "center",
        alignItems: "center"

    },
    PersonalInfo: {
        flexDirection: 'column',
        width: wp(80),
        top: hp(3)
    },
    PersonalInfoRow: {
        flexDirection: "row",
        borderBottomWidth: wp(0.3),
        paddingBottom: wp(0.5),
        borderColor: '#fff',
        marginTop: wp(1)
    },
    PersonalInfoStart: {
        alignItems: 'flex-start',
        width: wp(40)
    },
    PersonalInfoEnd: {
        alignItems: 'flex-end',
        width: wp(40)
    },
    PersonalInfoText: {
        color: "#fff",
    },
    PersonalInfoChoose: {
        flexDirection: 'column',
        width: wp(85),
        top: hp(3)
    },
    PersonalInfoRowChoose: {
        flexDirection: "row",
        // borderBottomWidth: wp(0.3),
        // paddingBottom: wp(0.5),
        // borderColor: '#fff',
        marginTop: hp(1)
    },
    PersonalInfoStartChoose: {
        alignItems: 'flex-start',
        width: wp(42)
    },
    PersonalInfoEndChoose: {
        alignItems: 'flex-end',
        width: wp(43),
        justifyContent: "center"
    // backgroundColor: "yellow"
    },
    PersonalInfoEmpoyementList: {
        flexDirection: 'column',
        width: wp(70),
        top: hp(3)
    },
    PersonalInfoStartEmp: {
        alignItems: 'flex-start',
        width: wp(40)
    },
    PersonalInfoEndEmp: {
        alignItems: 'flex-end',
        width: wp(40),
        justifyContent: "center"
    // backgroundColor: "yellow"
    },
    HeaderLayer: {
        backgroundColor: "rgba(255,255,255,0.4)",
        width: wp(80),
        borderRadius: wp(10),
        height: hp(5),
        justifyContent: "center",
    },
    TranLingImage: {
        bottom: 47,
        height: 5,
        width: '100%',
        position: "absolute",
    },
    myProfileIconImage: {
        height: scale(25),
        marginLeft: scale(15),
        width: scale(25),
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    myProfileIconImageBuilding: {
        height: scale(40),
        width: scale(35),

        justifyContent: 'center',
        alignItems: 'flex-start',
    },
};