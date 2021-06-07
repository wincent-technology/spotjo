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
  leftVid,
  library
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

import SuggestionView from '../Component/SuggestionView'
import ListOfChoosed from '../Component/ListOfChoosed';
import Texting from '../Constant/Text'
import AddExpSkillEdu from '../Component/AddExpSkillEdu'
import Itemskill from './Itemskill'

var mg = []

var items = global.language == 'english' ? true : false

class CompanyAddSkilJob extends Component {
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
    suggesion: [],
    natHeight:1
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
      addSkill: global.addSkill || [],
    });


    let data = []
    try {
        http.GET('api/skill/get').then((res) => {
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
          this.save()
        },
      );
    } else alert('You can upload upto 5 Skills');
  };
  



choose = (choose) => {
    console.log('choose')
    mg.push(choose)
    mg = [...new Set(mg)]
    console.log('sfdsff', mg)
    let mni = []
    for (let i in mg) {
        if (mg[i] != choose || mg[i] != '')
            mni.push(mg[i])
    }
    this.state.edu && this.setState({
      name:  global.language == 'english' ? choose.english : choose.german,
      EduTitle:choose,
        show: !this.state.show
    })
   
    console.log('this.state>>>>>>>>>>>>>',choose)

}
cheks = (text) => {
  // console.log('text')
  
  let newData = this.arrayholder.filter(item => {
    const itemData = global.language == 'english' ? item && item != '' ? item.english : `${item}` : item && item != '' ? item.german : `${item}`
    const textData = text.toUpperCase();
    // console.log('itemdata', itemData)
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
  }else{
    this.setState({name:text})
  }
}

renderItem = (item, index) => {
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
              fontSize: hp(2.7),
              color: themeWhite,
            }}>
            {global.language == 'english' ? item.english : item.german}
          </Text>
          {item.right && (
            <View
              style={{
                // top: scale(-7),
                left: scale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {library('highlight-off', hp(2.6), themeColor)}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}


  save = () => {
    global.addSkill = this.state.addSkill
  };

  Add = () => {
    this.setState({
      edu: true,
    });
  };
  handleChange = (value, index) => {
    var arr = [];
    arr = this.state.addSkill;
    console.log('addSkill', this.state.addSkill, value, index);
    arr[index].rating = value;
    this.setState({
      addSkill: arr,
    });

    console.log('addSkill', this.state.addSkill);
  };
  remove = (item, index) => {
    console.log(index, item);
    const {
      addSkill
    } = this.state;
    let m = addSkill;
    for (let i in m) {
      if (m[i].english == item.english) {
        m.splice(i, 1);
      }
    }
    this.setState({
      addSkill: m,
    });
  };

  render() {
    const {
      suggesion,
      dataCheck,
      edu,rate
    } = this.state;
    // console.log('this.sum',this.state.sum);
    return (
      <>
          <AddExpSkillEdu source = {skillframe} title={global.language == 'english' ? '+Add Skills' : '+ger Skills'} onPress={this.Add}/>
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
        }} text='Whats_your_Talent' />
        </View>}
          {edu && <EducationComponent  placeHolder={'Enter Skills'} name={this.state.name} addskillStyle={{elevation:8,borderBottomWidth:0,borderWidth:0}}
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
                height: dataCheck.length != 1 ? hp(15) : hp(6),
                backgroundColor: "#fff",
                marginTop:hp(-17.5),
                // position: "absolute",
                // top: scale(265),
                marginHorizontal:wp(7)
            }}  onLayout={(e) =>
                    this.setState({natHeight: e.nativeEvent.layout.height})
                  }>
            <ListOfChoosed keyboardShouldPersistTaps='always' data = {this.state.edu ? this.state.dataCheck : this.state.dataCheckU} contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }} renderItem={({item, index}) => this.renderItem(item, index)} />
            </View> }
            {rate && <EducationRate name={'Add Skill'} placeHolder={'Rate Your skill'} 
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
                  borderRadius: scale(20),
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
                      marginBottom: 30,
                    }}
                    contentContainerStyle={{
                      alignItems: 'center',
                      justifyContent: 'center',
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
            }} >{global.language == 'english' ? item.english : item.german}</Text>
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
                selectedStar={(rating) =>
                                  this.handleChange(rating,index)
                                }
            starStyle={{marginHorizontal:2}}
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

export default withNavigationFocus(CompanyAddSkilJob);