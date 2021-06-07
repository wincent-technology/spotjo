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
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,TouchableOpacity
} from 'react-native';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  left,
  leftVid
} from '../src/IconManager';
import {
  scale,
  snack
} from '../src/Util';
import {
  themeColor,
  themeWhite,
  TRANLINE,
  educationCap,
} from '../Constant/index';
import {
  StarRating,
  NavigationHead
} from '../Component/ViewManager';
import CustomButton from '../Component/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../Component/responsive-ratio';
import {
  FontBold,
  FontRegular,
  Background,
  interViewBack,
  cal,
  clock,blanks,Fulls,
  education,skillframe
} from '../Constant/index';
// import ItemMV from './ItemMV';
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';
import EducationComponent from '../Component/EducationComponent';
import EducationComponentUni from '../Component/EducationComponentUni';
import EducationRate from '../Component/EducationRate'
import AsyncStorage from '@react-native-community/async-storage';
import Texting from '../Constant/Text'
import SuggestionView from '../Component/SuggestionView'
import ListOfChoosed from '../Component/ListOfChoosed';

var monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
var mg = []
import AddExpSkillEdu from '../Component/AddExpSkillEdu'

// var Items = global.language == 'english' ? true : false

class CompanyAddLanguage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addSkill: [],
      show: false,
      sum: [],
      edu:false,
      fromDate: 'From Date',
      toDate: 'To Date',
      Start_date: Date.now(),
      from: false,
      to: false,
      EduTitle: '',
      EduUni: '',
      name: '',
      uni:false,
      uniVerityName:'',
      rate:false,
      rating:3,
    Anywhere: false,
    dataCheck: [],
    dataCheckU: [],
    suggesion: []
    };
      this.arrayholder = [];
      this.arrayholderU = [];


  }

  Back = () => {
    // console.log("hi");
    this.props.navigation.goBack();
  };

  componentDidMount() {
    // console.log(">>>",global.UserSkill);
    this.setState({
      addSkill: global.LanguageSkill || [],
    });


    let data = []
    try {
        http.GET('api/language/get').then((res) => {
            if (res['data']['status']) {
                // console.log('data>>>', res['data']['result'])
                this.setState({
                    dataCheck: res['data']['result'],
                });
                this.arrayholder = res['data']['result'];
                //            //will get data in this    res['data']['result']
            } else {
                snack(res['data']['message'])
            }
        }, err => snack(err['message']));
    } catch (error) {
        snack(error)
    }
  }
  addsSkill = (text,rating) => {
    let gems = this.state.addSkill || [];
    // var in =  this.state.addSkill;
    console.log('gems', gems, text, gems.length);
    if (gems.length <= 4) {
      gems.push({
        german: text.german.toUpperCase(),
        english: text.english.toUpperCase(),
        rating
      });
      this.setState({
          addSkill: gems,
        },
        () => {
          global.LanguageSkill = this.state.addSkill;
          this.save()
        },
      );
    } else alert('You can upload upto 5 Skills');
  };
 


choose = (choose) => {
    // console.log('choose')
    mg.push(choose)
    mg = [...new Set(mg)]
    // console.log('sfdsff', mg)
    let mni = []

  // mg.filter((i) => i != choose || (i != '' && mni.push(i)));


    for (let i in mg) {
        if (mg[i] != choose || mg[i] != '')
            mni.push(mg[i])
    }

    this.state.edu && this.setState({
        suggesion: mni,
        name:  global.language === 'english' ? choose.english : choose.german,
        EduTitle:choose,
        show: !this.state.show
    })
}

cheks = (text) => {
  // console.log('text')
    let newData = this.arrayholder.filter(item => {
      // console.log('item',item)
      const itemData = global.language === 'english' ? item && item != '' ? item.english : `${item}` : item && item != '' ? item.german : `${item}`
      const textData = text.toUpperCase();
      console.log('itemdata', itemData)
      return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    });

    newData = newData.filter((item) => !mg.includes(item));
  newData = newData.length && newData.length < 10 ? newData : newData.slice(0, 10);

    
    if (newData.length) {
        this.setState({
            dataCheck: newData,
            name: text,
            // EduTitle:text

        })
    } 
}



renderItem = (item,index) => {
  return (
    <View
      style={{
        width: 'auto',
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 2,
      }}>
      <TouchableWithoutFeedback
        onPress={() =>this.choose(item, index)}>
        <View
          style={{
            alignItems: 'flex-start',
            // borderWidth: item.cell != '' ? 1 : 0,
            borderColor: themeColor,
            borderRadius: 10,
            paddingHorizontal: 10,
            width: 'auto',
            backgroundColor: themeColor,
            borderColor:themeColor,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: scale(18),
              color: themeWhite,
            }}>
            {global.language === 'english' ? item.english : item.german}
          </Text>
          {item.right && (
            <View
              style={{
                // top: scale(-7),
                left: scale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {library('highlight-off', scale(17), themeColor)}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}


  save = () => {
    console.log('data',global.LanguageSkill)
    global.LanguageSkill = this.state.addSkill
  };

  Add = () => {
    this.setState({
      edu: true,
    });
  };

  remove = (item, index) => {
    console.log(index, item);
    const {
      addSkill
    } = this.state;
    let m = addSkill;
    for (let i in m) {
      if (m[i] == item) {
        m.splice(i, 1);
      }
    }
    this.setState({
      addSkill: m,
    });
  };

  render() {
    const {
      Anywhere,
      name,
      suggesion,
      dataCheck,
      dataCheckU,
      show,edu,uni,rate
    } = this.state;
    // console.log('this.sum',this.state.sum);
    return (
      <>
          <AddExpSkillEdu source = {skillframe} title={global.language == 'english' ? '+Add Language' : '+ger Language'} onPress={this.Add}/>

          {edu && <View style = {
        {
            top: scale(0),
            marginHorizontal:wp(5),
            justifyContent:"center",
            alignItems:"center"
        }}><Texting style={{
            fontWeight: "bold",
            fontSize: hp(3),
            color: themeColor
        }} text='Select_Language'/>
            </View>}
          {edu && <EducationComponent name={this.state.name} placeHolder={'Enter Language'} addskillStyle={{elevation:8,borderBottomWidth:0,borderWidth:0}}
          textChange={
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.cheks(text)
            }} suggesion={suggesion} onNext={()=> {
              this.setState({
                edu:false,
                rate:true
              })
            }} />}
            { this.state.show && <View style={{
                // width: wp(90),
                borderRadius: scale(5),
                height:  dataCheck.length != 1 ? hp(12) : dataCheck.length == 1 ? hp(6) : 0,
                backgroundColor: "#FFF",
                marginTop:hp(-17.5),
                // position: "absolute",
                // top: scale(265),
                marginHorizontal:wp(7)
            }}>
            <ListOfChoosed renderItem={({item, index}) => this.renderItem(item, index)} keyboardShouldPersistTaps='always' data = {this.state.edu ? this.state.dataCheck : this.state.dataCheckU}/>
            </View> }
            {rate && <EducationRate name={'Add Language'} placeHolder={'Rate Your Language'} 
           starCount={this.state.rating} onStarRatingPress={(rating)=> this.setState({
             rating
           })} onBack={()=> this.setState({
              edu:true,rate:false
            })} onFinish ={
              ()=> this.setState({
              uni:false,rate:false,edu:false
            },()=> this.addsSkill(this.state.EduTitle,this.state.rating))
            }/>}
            
          <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  top: hp(2),
                  height: hp('50%'),
                  backgroundColor: themeWhite,
                  marginHorizontal: wp('2%'),
                  // marginTop: scale(20),
                  borderRadius: scale(20),
                  // elevation: 7,
                }}>
                <View
                  style={{
                    borderBottomWidth: scale(1),
                    borderBottomColor: '#eee',
                    width: '90%',
                    alignItems: 'center',
                  }}
                />
                <ScrollView
                    style={{
                      backgroundColor: themeWhite,
                      // marginTop: '-7%',
                      marginBottom: 30,
                      // alignSelf: 'stretch',
                    }}
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      // marginHorizontal: wp(7),
                    }}
                    nestedScrollEnabled={true}>
                    {this.state.addSkill.map((item, index) => {
                      return (
                        <View style={{
                flexDirection: "row",
                alignItems: "center",
                width:wp(79),
                    borderBottomWidth: scale(1),
                height:'auto',paddingVertical:5,borderBottomColor:'#eee',
            }} key={index}>
            <View style={{
                marginRight: scale(5)
            }}><Icon2 name={'highlight-off'} size={hp(2.5)} color={themeColor} onPress={() => {
              this.remove(item, index);
            }}/></View>
            
            <View style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                // paddingBottom: hp(1),
                // width:wp(80)
            }}><View style={{width:wp(45)}}>
<Text style={{
                fontFamily: FontBold,
                fontSize: hp(2),
                color: themeColor
            }}>{global.language == 'english' ? item.english : item.german}</Text>
            </View>
            <View style={{
                alignItems: "flex-end",
                justifyContent: "center",
                width: '30%',
                alignItems: "center"
            }}>
            <StarRating
                emptyStar={blanks}
                fullStar={Fulls}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                disabled={false}
                maxStars={5}
                starSize={hp(2.5)}
                rating={item.rating}
            starStyle={{marginHorizontal:2}}
                // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
                fullStarColor={'orange'}
              />
            </View>
                    </View>
            </View>
                      );
                    })}
                  </ScrollView>
              </View>
      </>
    );
  }
}

export default withNavigationFocus(CompanyAddLanguage);