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
  Rating,
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
  clock,
  education,SearchFrame
} from '../Constant/index';
import ItemMV from '../JobSeeker/ItemMV';
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
import ListEdu from '../Component/ListEdu';

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
var items = global.language == 'english' ? true : false
import AddExpSkillEdu from '../Component/AddExpSkillEdu'


class CompanyEditEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
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


  componentWillUnmount() {
    console.log(">>>",global.Education);
    this.setState({
      show: false,
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
    });
  }

  componentDidMount() {
    console.log(">>>",global.Education);
    this.setState({
      sum: global.Education || [],
    });

    

    let data = []
    try {
        http.GET('api/webuser/degree/get').then((res) => {
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
  // console.log('choose')
  mg.push(choose)
  mg = [...new Set(mg)]
  // console.log('sfdsff', mg)
  let mni = []

  mg.filter((i) => i != choose || (i != '' && mni.push(i)));


  // for (let i in mg) {
  //     if (mg[i] != choose || mg[i] != '')
  //         mni.push(mg[i])
  // }

  this.state.edu && this.setState({
      suggesion: mg,
      name:  global.language == 'english' ? choose.english : choose.german,
      EduTitle:choose,
      show: !this.state.show
  })
  this.state.uni && this.setState({
    suggesion: mni,
    uniVerityName: global.language == 'english' ? choose.english : choose.german,
    EduUni:choose,
    show: !this.state.show
  })
  // console.log('this.state>>>>>>>>>>>>>',choose)

}
cheks = (text) => {
    let newData = this.arrayholder.filter(item => {
      const itemData = global.language == 'english' ? item && item != '' ? item.english : `${item}` : item && item != '' ? item.german : `${item}`
        const textData = text.toUpperCase();
        console.log('itemdata', itemData)
        return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;

    });
    
  newData = newData.length && newData.length < 10 ? newData : newData.slice(0, 10);
    this.setState({
      name:text
    })

    if (newData.length) {
        this.setState({
            dataCheck: newData,
            // EduTitle:!newData && text

        })
    } 
}

Unis = (text) => {
  console.log('text')
    
    let newData = this.arrayholderU.filter(item => {
      // console.log('item',item);
      const itemData = global.language == 'english' ? item && item != '' ? item.english : `${item}` : item && item != '' ? item.german : `${item}`
        const textData = text.toUpperCase();
        return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    });

  // newData = newData.filter((item) => !mg.includes(item));
  newData = newData.length && newData.length < 10 ? newData : newData.slice(0, 10);

  if (newData.length) {
        this.setState({
            dataCheckU: newData,
            uniVerityName: text
        })
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
              fontSize: scale(18),
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
              {library('highlight-off', scale(17), themeColor)}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}


  save = () => {
    global.Education = this.state.sum;
  };
  Add = () => {
    this.setState({
      edu: true,
    });
  };

  ads = () => {
    const {
      EduTitle,
      uniVerityName,EduUni,
      fromDate,
      toDate,
      sum,rating
    } = this.state;
    console.log('this.state',EduTitle,EduUni,fromDate,toDate)
    var tempo = this.state.sum || [];
    // let tempo = [] ;
      // console.log('thisss',this.state.EduTitle.toUpperCase(),this.state.uniVerityName.toUpperCase(),this.state.fromDate,this.state.toDate,this.state.rating)


      // console.log('i>>>this.state',...this.state.sum);
    tempo.push({
      Degree : EduTitle && {english : EduTitle.english.toUpperCase(),german: EduTitle.german.toUpperCase()},
      // University : EduUni && {english : EduUni.english.toUpperCase(),german: EduUni.german.toUpperCase()},
      // From : fromDate,
      // To : toDate,
      rating : rating,
    });

    this.setState({
      sum: tempo,
      show: !this.state.show,
      fromDate: '',
      toDate: '',
      EduTitle: '',
      EduUni: '',
      uniVerityName:'',
    },()=> this.save());

  };
  remove = (item, index) => {
    console.log(index, item);
    const {
      sum
    } = this.state;
    let m = sum;
    for (let i in m) {
      if (m[i].Degree == item.Degree) {
        m.splice(i, 1);
      }
    }
    this.setState({
      sum: m,
    });
  };

  onChange = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({
        from: !this.state.from,
      });
      return;
    } else {
      this.setState({
        fromDate: monthNames[new Date(selectedDate).getMonth()] +
          ' ' +
          new Date(selectedDate).getFullYear(),
        from: !this.state.from,
      });
    }
  };
  onChange1 = (event, selectedDate) => {
    if (selectedDate === undefined) {
      this.setState({
        to: !this.state.to,
      });
      return;
    } else {
      this.setState({
        toDate: monthNames[new Date(selectedDate).getMonth()] +
          ' ' +
          new Date(selectedDate).getFullYear(),
        to: !this.state.to,
      });
    }
  };
  render() {
    const {
      suggesion,
      dataCheck,
      edu,uni,rate
    } = this.state;
    return (
      <>
          <StatusBar hidden={false} backgroundColor={themeWhite} />
          <AddExpSkillEdu source = {SearchFrame} title={global.language == 'english' ? '+Add Education' : '+ger Education'} onPress={this.Add}/>
          {edu && <EducationComponent  addskillStyle={{elevation:8,borderBottomWidth:0,borderWidth:0}} name={this.state.name} placeHolder={'Enter Education'} 
          textChange={
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.cheks(text)
            }} suggesion={suggesion} show={this.state.show} onNext={()=> {
              this.setState({
                edu:false,
                rate:true
              })
              this.AddUni();
            }} />}
          {/* {uni && <EducationComponentUni show = {this.state.show }width = {true} name={this.state.uniVerityName} placeHolder={'Enter University'} 
          textChange={
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.Unis(text)
            }} suggesion={this.state.suggesion} onResponse={()=> this.setState({
                            from: !this.state.from,
                          })} fromDate={this.state.fromDate} toDate={this.state.toDate} onResponseTo={
                            ()=> this.setState({
                            to: !this.state.to,
                          })
                          }  onNext={()=> {
              this.setState({
                rate:true,
                uni:false
              })
            }} onBack={()=> this.setState({
              uni:false,edu:true
            })}

            />} */}
            {rate && <EducationRate name={'Add Education'} placeHolder={'Rate Your Education'} 
           starCount={this.state.rating} onStarRatingPress={(rating)=> this.setState({
             rating
           })} onBack={()=> this.setState({
              uni:true,rate:false
            })} onFinish ={
              ()=> this.setState({
              uni:false,rate:false,edu:false
            },()=> this.ads())
            }/>}
                          {/* {this.state.from && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.Start_date}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                      />
                    )}
                    {this.state.to && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.Start_date}
                        mode={'date'}
                        is24Hour={false}
                        display="default"
                        onChange={this.onChange1}
                      />
                    )} */}
         
            { this.state.show && <View style={{
                // width: wp(90),
                borderRadius: scale(5),
                height: (dataCheck.length != 1 || this.state.dataCheckU.length != 1) ? hp(20) : hp(6),
                backgroundColor: "#fff",
                position: "absolute",
                top: hp(33),
                marginHorizontal:wp(7),
                // minWidth:scale(200)
            }}>
            <ListOfChoosed renderItem={({item, index}) => this.renderItem(item, index)} 
            contentContainerStyle={{
                      flexGrow: 1,
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
            keyboardShouldPersistTaps='always' data = {this.state.edu ? this.state.dataCheck : this.state.dataCheckU}/>
            </View> }
          <View
                style={{
                  width: wp(88.5),
                  alignItems: 'center',
                  alignSelf: 'center',
                  top: hp(2),
                  height: hp('50%'),
                  backgroundColor: themeWhite,
                  borderRadius: scale(20),
                }}>
                <View
                  style={{
                    borderBottomWidth: scale(1),
                    borderBottomColor: '#eee',
                    width: wp(80),
                    alignItems: 'center',
                  }}
                />
                <ListEdu style={{
                    backgroundColor: themeWhite,
                  }} data={this.state.sum && this.state.sum} renderItem={({item, index}) => (
                    <ItemMV item={item} index={index} remove={this.remove} />
                  )}/>
              </View>
      </>
    );
  }
}

export default withNavigationFocus(CompanyEditEducation);