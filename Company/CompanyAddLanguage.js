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

import SuggestionView from '../Component/SuggestionView'

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
        name: text.toUpperCase(),
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
  AddUni = () => {
    try {
      http.GET('api/webuser/unicol/get').then((res) => {
          if (res['data']['status']) {
              // console.log('data>>>', res['data']['result'])
              this.setState({
                  dataCheckU: res['data']['result'],
              });
              this.arrayholderU = res['data']['result'];
              //            //will get data in this    res['data']['result']
          } else {
              snack(res['data']['message'])
          }
      }, err => snack(err['message']));
  } catch (error) {
      snack(error)

  }

  }



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
        suggesion: mni,
        name:  choose,
        EduTitle:choose,
        show: !this.state.show
    })
    this.state.uni && this.setState({
      suggesion: mni,
      uniVerityName: choose,
      show: !this.state.show
    })
    console.log('this.state>>>>>>>>>>>>>',this.state.EduTitle,)
    console.log('this.state>>>>>>>>>>>>>',choose)
    console.log('this.state>>>>>>>>>>>>>',this.state.name)

}
cheks = (text) => {
  // console.log('text')
    var data = []
    const newData = this.arrayholder.filter(item => {
      // console.log('item',item)
      const itemData = item != null && item != '' ? `${item.english}` : `${item}`
      const textData = text.toUpperCase();
      // console.log('itemdata', itemData)
      return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    });
    for (let i in newData) {
        data.push({
            'name': newData[i],
            'backGround': 'white'
        })
    }
    if (newData != '') {
        this.setState({
            dataCheck: newData,
            name: text,
            // EduTitle:text

        })
    } else {
        newData.push({english:text})
        this.setState({
            dataCheck: newData,
            name: text,
            // EduTitle:text

        })
    }
}

Unis = (text) => {
  console.log('text')
    var data = []
    const newData = this.arrayholderU.filter(item => {
      // console.log('item',item);
        const itemData = item != null && item != '' ? `${item.english}` : `${item}`
        const textData = text.toUpperCase();
        // console.log('itemdata', itemData)
        return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    });
    for (let i in newData) {
        data.push({
            'name': newData[i],
            'backGround': 'white'
        })
    }
    if (newData != '') {
        this.setState({
            dataCheckU: newData,
            uniVerityName: text
        })
    } else {
        newData.push(text)
        this.setState({
            dataCheckU: newData,
            uniVerityName: text

        })
    }
}

renderItem = (item, index) => {
    return (
        <View style={{
            width: wp(80),
            marginLeft: scale(34),
        }}>
        <TouchableWithoutFeedback onPress={() => this.choose(item.english)}>
        <View style={{
            flexDirection: 'row',
            alignItems: "center"
        }}>
        <View style={{
            alignItems: "flex-start",
            width: wp(68)
        }}><Text style={{
            fontWeight: "bold",
            fontSize: scale(18),
            color: themeColor
        }}>{item.english}</Text></View>
        </View>
        </TouchableWithoutFeedback>
        </View>
    )
}
suggestionTag = (elements, index) => {
    const {
        suggesion,
        dataCheck
    } = this.state;
    let m = suggesion
    for (let i in suggesion) {
        if (m[i] == elements) {
            m.splice(i, 1),
                mg.splice(i, 1)
        }
        // for (let j in dataCheck) {
        //     if (dataCheck[j]['name'] == elements)
        //         dataCheck[j]['backGround'] = 'white'
        // }
    }
    this.setState({
        suggesion: m
    })
}

  save = () => {
    console.log('data',global.LanguageSkill)
    global.LanguageSkill = this.state.addSkill
    // try {
    //   http
    //     .POST('api/user/editskill', {
    //       id: global.Id,
    //       skills: global.UserSkill,
    //       salRatting: global.salaryrating,
    //         minSal: global.minSalary,
    //         maxSal: global.maxSalary,
    //     })
    //     .then(
    //       async(res) => {
    //         console.log('res',res)
    //         if (res['data']['status']) {
    //           console.log('responce user', res['data']['result']);
    //           var result = await AsyncStorage.getItem('UserLoggedInData');
    //           result = JSON.parse(result);
    //           result.skills = global.UserSkill
    //           await AsyncStorage.setItem('UserLoggedInData', JSON.stringify(result));
    //           console.log('ress',result)
    //           // this.props.navigation.navigate('JobEditProfile');
    //         } else {
    //           snack(res['data']['message']);
    //         }
    //       },
    //       (err) => snack(err['message']),
    //     );
    // } catch (error) {
    //   snack(error);
    // }
    // // alert('video is coming soon');
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
      if (m[i].name == item) {
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
    console.log('this.sum',this.state.sum);
    return (
      <>
          <View style={{flexDirection:"row",justifyContent:"space-between",width:wp(90),padding:10,marginHorizontal:wp(5),height:150,alignItems:"center"}}>
          <View style={{width:wp(40),alignItems:"center",justifyContent:"center",}}>
          <Image
                    source={skillframe}
                    style={{
                      height: scale(100),
                      width: scale(100),
                    }}
                    resizeMode={'cover'}
                  />
          </View>
          <View
              style={{
                // width:wp(50) 
                alignItems: 'center',
                justifyContent:"center",
                
                // right: wp(10),
              }}>
              <CustomButton
                title={'+Add Language'}
                onPress={this.Add}
                containerStyle={{
                  // width: ,
                  color: 'black',
                  // fontFamily: FontRegular
                }}
                buttonStyle={{
                  backgroundColor: '#333',
                  height:30,
                  borderRadius: scale(2),
                  borderWidth: 0,
                  // elevation: 6
                }}
                titleStyle={{
                  color: themeWhite,
                  position: 'absolute',
                  fontFamily: FontBold,
                  fontSize: scale(14),
                }}
              />
            </View>
          </View>
          {edu && <View style = {
        {
            top: scale(10),
            marginHorizontal:wp(5),
            justifyContent:"center",
            alignItems:"center"
        }}><Text style={{
            fontWeight: "bold",
            fontSize: scale(20),
            color: themeColor
        }}>
            Select Language
        </Text></View>}
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
                backgroundColor: "blue",
                marginTop:-120,
                // position: "absolute",
                // top: scale(265),
                marginHorizontal:wp(7)
            }}>
            <FlatList
            data = {this.state.edu ? this.state.dataCheck : this.state.dataCheckU}
            keyboardShouldPersistTaps='always'
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => this.renderItem(item, index)}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('1%'),
                offset: hp('1%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            /></View> }
            {rate && <EducationRate name={'Add Language'} placeHolder={'Rate Your Language'} 
           starCount={this.state.rating} onStarRatingPress={(rating)=> this.setState({
             rating
           })} onBack={()=> this.setState({
              edu:true,rate:false
            })} onFinish ={
              ()=> this.setState({
              uni:false,rate:false,edu:false
            },()=> this.addsSkill(this.state.name,this.state.rating))
            }/>}
            
          <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  alignSelf: 'center',
                  top: hp(5),
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
                height:50,borderBottomColor:'#eee',
            }} key={index}>
            <View style={{
                marginRight: scale(5)
            }}><Icon2 name={'highlight-off'} size={scale(20)} color={themeColor} onPress={() => {
              this.remove(item.name, index);
            }}/></View>
            
            <View style={{
                flexDirection: 'row',
                justifyContent:"space-between",
                // paddingBottom: hp(1),
                // width:wp(80)
            }}><View style={{width:wp(45)}}>
<Text style={{
                fontFamily: FontBold,
                fontSize: scale(16),
                color: themeColor,width:wp(40)
            }} numberOfLines={1}>{item.name}</Text>
            </View>
            <View>
            <StarRating
                emptyStar={blanks}
                fullStar={Fulls}
                halfStar={'star-half'}
                iconSet={'MaterialIcons'}
                disabled={false}
                maxStars={5}
                starSize={scale(17)}
                rating={item.rating}
            starStyle={{marginLeft:2}}
                // selectedStar={(rating) => this.props.onStarRatingPress(rating)}
                fullStarColor={'orange'}
              />
            </View>
                    </View>
            <View style={{
                borderBottomWidth: scale(2),
                borderBottomColor: '#eee',
                width: wp(78),
                alignItems: "center"
            }}/></View>
                      );
                    })}
                  </ScrollView>
              </View>
      </>
    );
  }
}

export default withNavigationFocus(CompanyAddLanguage);