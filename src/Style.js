import {
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';
import {
  scale,
  getStatusBarHeight
} from './Util';
const {
  height,
  width
} = Dimensions.get('window');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  themeColor,
  themeWhite
} from '../Constant/index';
import {
  FontBold,
  FontRegular
} from '../Constant/index';
import DeviceInfo from 'react-native-device-info';

let hasNotch = DeviceInfo.hasNotch();
module.exports = {
  textboxfieldd: {
    fontWeight: 'bold',
  },
  MainFlex: {
    flex: 1,
  },
  backGround: {
    flex: 1,
    backgroundColor: themeWhite,
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
    height: hp(5.5),
    width: wp(70),
    backgroundColor: themeWhite,
    elevation: 17,
  },
  TalentView: {
    height: hp(5.5),
    width: wp(70),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeWhite,
    borderRadius: scale(5),
  },
  OppoTalentText: {
    fontSize: hp(3),
    fontFamily: FontBold,
    color: '#37c0d3',
    fontWeight: 'bold',
  },
  LookingFor: {
    fontSize: hp(3.8),
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
    fontFamily: FontRegular,
  },
  Homelogin: {
    top: scale(50),
    right: scale(25),
    position: 'absolute',
  },
  HomeLogo: {
    top: scale(150),
    height: hp(20),
    width: Dimensions.get('window').width / 2 + scale(80),
    justifyContent: 'center',
    alignItems: 'center',
    left: Dimensions.get('window').width / 4 - scale(40),
    position: 'absolute',
  },
  Homelooking: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(43),
  },
  Homebut: {
    left: Dimensions.get('window').width / 7,
    marginTop: hp(50),
    position: 'absolute',
  },
  HomebutGuest: {
    left: Dimensions.get('window').width / 7,
    marginTop: height/2 + scale(50),
    position: 'absolute',
  },
  HomeTel: {
    left: Dimensions.get('window').width / 7,
    marginTop: hp(57),
    position: 'absolute',
  },
  FontSty: {
    color: themeWhite,
    fontWeight: 'bold',
    // fontFamily: FontRegular
  },
  Size: {
    // backgroundColor:"blue",
    // width: scale(50),
    width: wp('20%'),
  },
  BackNextRootView :{
      flexDirection: 'row',
      width: wp(86),
      position:"absolute",
      bottom: 5,
      marginLeft:wp(7),
      justifyContent:"space-between",
  },
  BackNextButtonView:{
    width: wp(40),
    justifyContent:"center",
    alignItems:"center",
  },
  BackTouchableView:{
    width: wp(20),
    justifyContent:"center",
    alignItems:"center",
    borderTopWidth:1,
    borderTopColor:"#fff",
    height:hp(5),
  },
  SuggestionView:{
    flexDirection: 'row',
    height: scale(30),
    borderRadius: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(3),
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: scale(5),
    marginBottom: scale(2),
  },
  SuggestionViewText:{
    color: themeColor,
    fontFamily: FontBold,
    fontSize:scale(12)
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
    width: scale(33),
    top: 2,
    alignSelf: 'center',
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
    position: 'absolute',
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
    height:hp(6.5),
    // marginTop: hasNotch ? StatusBar.currentHeight + hp(3.5) : hp(1),
  },
  FilterLeft: {
    left: scale(5),
    position: 'absolute',
  },
  FilterMainView: {
    width: wp('96%'),
    height: hp('100%') - scale(7),
    // marginBottom:scale(50),
    // flexGrow:1,
    // backgroundColor: themeWhite,
    marginHorizontal: wp('2%'),
    // marginTop: scale(20),
    borderRadius: scale(20),
    // overflow:"hidden"
    // elevation: 7,
  },
  FilterScroll: {
    alignSelf: 'stretch',
    
    // marginTop: scale(5),
  },
  FilterDropDown: {
    width: wp('90%'),
    borderBottomWidth: scale(1),
    marginLeft: wp('2.3%'),
    // marginTop: scale(2),
    borderTopColor: 'gray',
    borderBottomColor: 'rgba(169,169,169,0.8)',
    borderRightColor: 'gray',
    borderRadius: scale(5),
    // borderBottomWidth: scale(2),
    overflow: 'hidden',
    // height:100
    // height:"auto"
    // elevation: scale(4)
  },
  FilterDropDownInnerView: {
    height: hp(7),
    // width: scale(25),
    alignItems: 'center',
    marginLeft: scale(10),
    flexDirection: 'row',
    // justifyContent:"space-between",
    // marginBottom:20
    flex:1
  },
  DropDownHeader: {
    fontSize: hp(3.2),
    fontFamily: FontRegular,
    color: '#000',
    marginLeft: hp(1.5),
  },
  FilterMinimumSalary: {
    width: wp('90%'),
    height: scale(60),
  },
  FilterMinimumSalaryMin: {
    flexDirection: 'row',
    marginBottom: scale(-10),
  },
  FilterMinText: {
    left: scale(15),
    fontSize: hp(2),
    fontFamily: FontRegular,
  },
  FilterMaxText: {
    right: scale(20),
    position: 'absolute',
    fontSize: hp(2),
    fontFamily: FontRegular,
  },
  FilterMinimumSalarySlider: {
    width: wp('80%'),
    marginLeft: scale(-5),
    flex: 1,
    height: scale(10),
    alignSelf: 'center',
    marginTop: scale(-35),
  },
  SalaryTypeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(10),
    marginBottom: scale(10),
  },
  CheckBoxLabel: {
    marginLeft: scale(7),
  },
  CheckBoxLabelFont: {
    fontSize: hp(2.7),
    fontFamily: FontRegular,
  },
  CheckBoxLabelFontSc: {
    fontSize: scale(18),
    fontFamily: FontRegular,
  },
  RadioSearchType: {
    // flexDirection: "row",
    justifyContent: 'center',
    // alignItems: 'center',
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
    justifyContent: 'space-around',
    flexDirection:"row",
    alignItems: 'center',
    height: hp(6),
  },
  SaveFilterButtonView: {
    width: wp('35%'),
    backgroundColor: themeColor,
    borderRadius: hp(5),
  },
  ItemMVMainView: {
    flex: 1,
    // backgroundColor: themeWhite,
    height: hp(26),
    width: wp(97),
    marginHorizontal: wp(1.5),
    marginVertical: hp(0.5),
    borderRadius: scale(15),
    // elevation: 5,
  },
  ItemMVSecondView: {
    flexDirection: 'row',
    marginTop: scale(5),
    width: wp(98),
    alignItems: 'center',
  },
  ItemMVHeader: {
    fontWeight: 'normal',
    fontSize: hp(2.2),
    fontFamily: FontBold,
    color: themeColor,
    fontWeight: 'bold',
    marginLeft: scale(10),
  },
  ItemMVPlayNowView: {
    flexDirection: 'row',
    right: scale(15),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemMVPlayNowText: {
    fontSize: scale(12),
    fontFamily: FontRegular,
    color: themeColor,
    fontWeight: 'bold',
    // alignSelf: "center"
  },
  ItemMVPlayIcon: {
    marginLeft: scale(5),
    height: hp(3),
    width: wp(9),
    // borderBottomColor: themeColor,
    // borderBottomWidth: scale(2),
    // borderRadius: scale(5),
    // paddingTop: scale(1)
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemMVImage: {
    height: hp(14),
    width: wp(32),
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
    // backgroundColor: 'blue',
    flexDirection: 'row',
    height: 'auto',
    alignItems: 'center',
  },
  CompanyDetailIcon: {
    marginTop: scale(5),
    marginLeft: scale(12),
    flexDirection: 'row',alignItems: 'center',height:hp(4.3)
  },
  ItemDetailLabel: {
    marginLeft: scale(6),
    fontFamily: FontRegular,
    fontSize: hp(2),
    // marginTop: scale(-1)
  },
  ItemDetailLabel1: {
    marginLeft: scale(10),
    fontSize: hp(2),
    fontFamily: FontRegular,
    width:wp(72)
    // marginTop: scale(-3),
    // justifyContent: "center"
  },
  CompanyProfileDetailLabel100: {
    // marginTop: scale(-2),
    fontSize: hp(2),
    fontFamily: 'Roboto-Regular',
  },
  ItemMVDetailColor: {
    color: themeColor,
    fontFamily: FontRegular,
    fontSize: hp(2),
  },
  ItemMVTimeStamp: {
    flexDirection: 'row',
    // marginTop: scale(8),
    marginTop: hp(2.5),
    backgroundColor: 'transparent',
    justifyContent:'space-between',
    paddingHorizontal:10,
    alignItems:"center"
  },
  ItemMVTimeStampView: {
    // left: scale(20),
    // position: 'absolute',
  },
  ItemMVRatingView: {
    // right: scale(12),
    marginTop: scale(-2),
    // position: 'absolute',
    backgroundColor: 'transparent',
  },
  JoblistMainView: {
    flexDirection: 'row',
    width: wp('100%'),
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : hp(1)
  },
  JoblistLogo: {
    marginLeft: hp(1),
    justifyContent: 'center',
    alignItems: 'flex-start',
    // paddingTop: hp(1.5),
    position: 'absolute',
    // alignSelf: 'center'
  },
  JoblistLogoImageSize: {
    width: hp(2.7),
    height: hp(2.7),
  },
  JoblistMainViewHeading: {
    marginLeft: hp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  JoblistMainViewHeadingText: {
    fontSize: scale(20),
    fontFamily: FontBold,
    fontWeight: 'bold',
    color: '#333',
  },
  JoblistSecondViewHeading: {
    borderTopColor: 'gray',
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1.5),
    borderBottomColor: 'gray',
    flexDirection: 'row',
    width: wp('100%'),
    backgroundColor: themeWhite,
    height: scale(40),
    alignItems: 'center',
    elevation: 5,
    justifyContent:'space-between'
  },
  JoblistSecondViewHeadingResult: {
    backgroundColor: themeWhite,
    justifyContent: 'center',
    left: scale(10),
  },
  JoblistSecondViewHeadingText: {
    fontSize: hp(3),
    fontFamily: FontRegular,
    fontWeight: 'normal',
  },
  JoblistUpperButton: {
    fontSize: scale(19),
    fontFamily: FontRegular,
    color: '#333',
    marginLeft: scale(2),
  },
  JobListUpperButtonView: {
    right: scale(10),
    // position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginHorizontal: scale(5)
  },
  JobListUpperButtonIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CompanyProfileIcon: {
    height: hp(4),
    width: hp(4),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  CompanyDetailProfileIcon: {
    height: hp(4),
    width: hp(4),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  fliterIcon: {
    height: hp(4.5),
    width: hp(4.5),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  CompanyProfileMainImage: {
    width: wp('96%'),
    height: hp('100%') - (StatusBar.currentHeight + scale(60)),
    // backgroundColor: themeWhite,
    marginHorizontal: wp('2%'),
    marginTop: scale(20),
    borderRadius: scale(20),
    // elevation: 8,
    // borderBottomWidth: scale(2),
    // borderRightWidth: scale(1),
    borderRightColor: 'gray',
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
    borderRightColor: 'gray',
  },
  CompanyProfileImageSize: {
    width: wp(90.4),
    // marginLeft: wp(2),
    marginHorizontal: wp('2.35%'),
    height: hp(26),
    borderTopLeftRadius: scale(17.5),
    borderTopRightRadius: scale(17.5),
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
    height: hp(5.5),
    width: wp('80%'),
    backgroundColor: themeWhite,
    elevation: 17,
  },
  CompanyLoginalentView: {
    height: hp(5.5),
    width: wp('80%'),
    alignItems: 'center',
    backgroundColor: themeWhite,
    borderRadius: scale(5),
    marginBottom: scale(5),
    borderRadius: scale(5),
    flexDirection: 'row',
  },
  CompanyOppoTalentText: {
    fontSize: hp(2.6),
    fontFamily: FontBold,
    color: '#37c0d3',
    fontWeight: 'bold',
  },
  CompanyLoginButton: {
    borderRadius: scale(5),
    flexDirection: 'row',
  },
  CompanyLoginIcon: {
    height: hp(2.7),
    width: hp(2.7),
    marginLeft: scale(50),
    marginRight: scale(10),
  },
  CompanyLoginAccountText: {
    bottom: scale(60),
    alignSelf: 'center',
    position: 'absolute',
    textAlign: 'center',
    alignItems: 'center',
  },
  CompanyLoginWithEmailView: {
    height: hp(4.5),
    width: wp(25),
    alignItems: 'center',
    backgroundColor: themeWhite,
    borderRadius: scale(5),
    marginBottom: scale(5),
    elevation: 5,
  },
  ButtonStyle: {
    backgroundColor: themeWhite,
    // borderRadiuserLeftWidth: scale(5),
    borderColor: 'rgba(55,192,211,0.4)',
    borderLeftWidth: scale(8),
    borderTopWidth: scale(1),
    borderTopColor: '#b4b4b4',
    borderRightWidth: scale(1),
    borderBottomWidth: scale(1),
    borderBottomColor: '#b4b4b4',
    borderRightColor: '#b4b4b4',
  },
  titleStyle: {
    color: 'black',
    position: 'absolute',
    left: scale(45),
    fontFamily: FontRegular,
    fontSize: scale(20),
    // right: scale(25)
  },
  NativeViewButton: {
    width: wp(84),
    height: hp(5),
    borderBottomWidth: scale(1.5),
    marginVertical: wp(1),
    borderBottomColor: '#b0b0b0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  NativeSecondView: {
    height: hp(4.2),
    width: hp(4.2),
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginRight: scale(10),
  },
  NativeThirdView: {
    width: wp(60),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  NativeFontSty: {
    color: 'black',
    position: 'absolute',
    fontFamily: FontRegular,
    fontSize: hp(2.8),
  },
  buttonContainerStyle: {
    width: '93%',
    marginLeft: '3%',
    marginVertical: scale(1),
    color: 'black',
    fontFamily: FontRegular,
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
    height: hp('30%'),
    width: wp('96%'),
    marginLeft: wp('2%'),
    marginTop: wp('2%'),
  },
  MapSliderText: {
    marginTop: hp(1.5),
    width: wp('90%'),
    height: hp(3.5),
    marginLeft: wp('5%'),
  },
  MapVerticalList: {
    width: wp('99%'),
    height: hp('43%'),
    marginTop: scale(10),
    marginBottom: scale(50),
    // backgroundColor: themeColor
    // backgroundColor: themeWhite
  },
  VideoIconSize: {
    height: scale(45),
    width: scale(40),
  },
  AvtarView: {
    width: wp(29),
    height: wp(29),
    // backgroundColor: "transparent",
    // borderColor: "#eee",
    // borderWidth: wp(0.7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  PersonalInfo: {
    flexDirection: 'column',
    width: wp(80),
    top: hp(3),
  },
  PersonalInfoRow: {
    flexDirection: 'row',
    borderBottomWidth: wp(0.3),
    paddingBottom: wp(0.5),
    borderColor: '#fff',
    marginTop: wp(1),
    height: hp(5.5),
  },
  PersonalInfoStart: {
    alignItems: 'flex-start',
    width: wp(40),
    justifyContent: 'center',
  },
  PersonalInfoEnd: {
    alignItems: 'flex-end',
    width: wp(40),
    // justifyContent: "center"
  },
  PersonalInfoText: {
    color: '#fff',
  },
  PersonalInfoChoose: {
    flexDirection: 'column',
    width: wp(85),
    top: hp(3),
   
  },
  PersonalInfoRowChoose: {
    flexDirection: 'row',
    // borderBottomWidth: wp(0.3),
    // paddingBottom: wp(0.5),
    // borderColor: '#fff',
    marginTop: hp(1),
  },
  PersonalInfoStartChoose: {
    // alignItems: 'center',
    // justifyContent:"center",
    width: wp(42),
    // backgroundColor:"blue"
  },
  PersonalInfoEndChoose: {
    alignItems: 'flex-end',
    width: wp(43),
    justifyContent: 'center',
    // backgroundColor:"blue"

    // backgroundColor: "yellow"
  },
  PersonalInfoEmpoyementList: {
    flexDirection: 'column',
    width: wp(70),
    top: hp(3),
  },
  PersonalInfoStartEmp: {
    alignItems: 'flex-start',
    width: wp(40),
  },
  PersonalInfoEndEmp: {
    alignItems: 'flex-end',
    width: wp(40),
    justifyContent: 'center',
    // backgroundColor: "yellow"
  },
  HeaderLayer: {
    backgroundColor: '#ecfbfe',
    width: wp(80),
    marginLeft:wp(2),
    borderRadius: wp(10),
    height: hp(4.3),
    marginBottom: scale(2),
    justifyContent: 'center',
  },
  TranLingImage: {
    bottom: 40,
    height: 5,
    width: '100%',
    position: 'absolute',
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
  EmploymentJobtype: {
    fontFamily: FontRegular,
    color: themeWhite,
    fontWeight: 'bold',
  },
  PersonalCompanyTextInput: {
    width: wp(43),
    alignItems: 'center',
    // justifyContent:"flex-start",
    right: wp(-5),
    marginTop: scale(0),
    // backgroundColor:"blue",
    height:hp(5)

  },
  PersonalCompanystyleInput: {
    width: '100%',
    marginTop:scale(3),
    height:hp(5),
    // alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 0,
    borderRadius: scale(5),
    // backgroundColor: 'green',
  },
  TextInputAddExp: {
    height: scale(40),
    width: wp(80),
    borderColor: themeWhite,
    borderWidth: scale(1),
    marginTop: scale(5),
    marginHorizontal: scale(5),
    color: themeWhite,
    fontSize: scale(16),
    fontFamily: FontRegular,
    fontWeight: '700',
    borderRadius: scale(5),
  },
  TextInputAddExpView: {
    marginVertical: scale(10),
    width: wp(84),
    // height: scale(150),
    marginLeft: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor,
    borderRadius: scale(5),
  },
  skillCatView: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: '15%',
    height: scale(20),
  },
  skillCatViewSecond: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '60%',
  },
  skillCatViewThird: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '10%',
  },
  fontSkill: {
    fontSize: scale(18),
    fontFamily: 'Roboto-Regular',
  },
  itemsHiddenView: {
    flexDirection: 'row',
    width: wp(82),
    // backgroundColor:"blue",
    justifyContent: 'space-between',
    marginBottom: scale(2),
    marginTop: scale(2),
    height: scale(16),
    alignItems: 'center',

  },
  itemsHiddenSView: {
    height: scale(20),
    width: scale(20),
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginTop: scale(-2),
  },
  itemsHiddenTView: {
    alignItems: 'flex-start',
    // justifyContent: 'center',
    width: '50%',
    marginLeft: '3%',
  },
  itemsHiddenFont: {
    fontSize: scale(16),
    color: themeWhite,
    fontFamily: 'Roboto-Regular',
  },
  itemsHiddenViewRate: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

    alignItems: 'flex-end',
  },
  itemsHiddenViewScr: {
    backgroundColor: 'transparent',
    marginTop: '-7%',
    marginBottom: 27,
  },
  itemsHiddenViewCont: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(85),
    flexGrow: 1,
  },
  addSkillMainView: {
    flexDirection: 'row',
    width: wp(85),
    justifyContent: 'center',
    marginBottom: scale(2),
    // marginLeft: '3%',
  },
  addSkillSecView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '35%',
  },
  addSkillFont: {
    fontSize: scale(16),
    color: themeColor,
    fontFamily: 'Roboto-Regular',
  },
  addSkillView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '35%',
  },
  MatchersStyleTab: {
    alignItems: 'center',
    width: wp(100) / 3 - scale(7),
    height: wp(100) / 3 - scale(7),
    marginLeft: scale(5),
    justifyContent: 'center',
    borderRadius: scale(20),
    borderColor: 'white',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  postedJoblist: {
    width: wp(25),
    height: wp(25),
    borderRadius: scale(20),
    borderColor: 'white',
    overflow: 'hidden',
  },
};