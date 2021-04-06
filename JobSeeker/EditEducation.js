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
import ItemMV from './ItemMV';
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';
import EducationComponent from '../Component/EducationComponent';
import EducationComponentUni from '../Component/EducationComponentUni';
import EducationRate from '../Component/EducationRate'
import AsyncStorage from '@react-native-community/async-storage';
import ListOfChoosed from '../Component/ListOfChoosed'
import SuggestionView from '../Component/SuggestionView'
import AddExpSkillEdu from '../Component/AddExpSkillEdu';
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


class EditEducation extends Component {
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

  componentDidMount() {
    console.log(">>>",global.UserEducation);
    this.setState({
      sum: global.UserEducation || [],
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
        name:  items ? choose.english : choose.german,
        EduTitle:choose,
        show: !this.state.show
    })
    this.state.uni && this.setState({
      suggesion: mni,
      uniVerityName: items ? choose.english : choose.german,
      EduUni:choose,
      show: !this.state.show
    })
    console.log('this.state>>>>>>>>>>>>>',choose)
}
cheks = (text) => {
  // console.log('text')
    var data = []
    const newData = this.arrayholder.filter(item => {
        // const itemData = item.items && `${item.items.toUpperCase()}   
        //         ${item.items.toUpperCase()} ${item.items.toUpperCase()}`;
      const itemData = items ? item && item != '' ? item.english : `${item}` : item && item != '' ? item.german : `${item}`
        const textData = text.toUpperCase();
        console.log('itemdata', itemData)
        return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;

    });
    for (let i in newData) {
        data.push({
            'name': newData[i],
            // 'backGround': 'white'
        })
    }
    if (newData != '') {
        this.setState({
            dataCheck: newData,
            name: text,
            // EduTitle:!newData && text

        })
    } 
}

Unis = (text) => {
  console.log('text')
    var data = []
    const newData = this.arrayholderU.filter(item => {
      // console.log('item',item);
      const itemData = items ? item && item != '' ? item.english : `${item}` : item && item != '' ? item.german : `${item}`
        const textData = text.toUpperCase();
        return itemData != null && itemData.toUpperCase().toString().indexOf(textData) > -1;
    });
    for (let i in newData) {
        data.push({
            'name': newData[i],
            // 'backGround': 'white'
        })
    }
    if (newData != '') {
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
        <TouchableWithoutFeedback onPress={() => this.choose(item)}>
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
        }}>{items ? item.english : item.german}</Text></View>
        </View>
        </TouchableWithoutFeedback>
        </View>
    )
}


  save = () => {
    global.UserEducation = this.state.sum;
    try {
      http
        .POST('api/user/editeducation', {
          id: global.Id,
          education: global.UserEducation,
        })
        .then(
          async (res) => {
            if (res['data']['status']) {
              console.log('responce user', res['data']['result']);
              var result = await AsyncStorage.getItem('UserLoggedInData');
              result = JSON.parse(result);
              result.education = global.UserEducation
              AsyncStorage.setItem('UserLoggedInData', JSON.stringify(result));

              this.props.navigation.navigate('JobEditProfile');
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      snack(error);
    }
    global.UserEducation = this.state.sum;
    // this.props.navigation.navigate('JobEditProfile');
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
      Degree : {english : EduTitle.english.toUpperCase(),german: EduTitle.german.toUpperCase()},
      University : {english : EduUni.english.toUpperCase(),german: EduUni.german.toUpperCase()},
      From : fromDate,
      To : toDate,
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
      if (m[i].id == item.id) {
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
      Anywhere,
      name,
      suggesion,
      dataCheck,
      dataCheckU,
      show,edu,uni,rate
    } = this.state;
    console.log('this.sum',this.state.sum);
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          tintColor={themeWhite}
          resizeMode={'stretch'}>
          <StatusBar hidden={false} backgroundColor={themeColor} />
          <NavigationHead
            centerComponent="Education"
            rightComponent="Save"
            onPress={() => this.Back()}
            onExit={() => this.save()}
          />
          <AddExpSkillEdu source = {SearchFrame} title='Add_Education' onPress={this.Add}/>
          {edu && <EducationComponent name={this.state.name} placeHolder={'Enter Education'} 
          textChange={
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.cheks(text)
            }} suggesion={suggesion && suggesion} onNext={()=> {
              this.setState({
                edu:false,
                uni:true
              })
              this.AddUni();
            }} />}
          {uni && <EducationComponentUni name={this.state.uniVerityName} placeHolder={'Enter University'} 
          textChange={
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.Unis(text)
            }} suggesion={suggesion} onResponse={()=> this.setState({
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
            })}/>}
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
                          {this.state.from && (
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
                    )}
         
            { this.state.show && <View style={{
                // width: wp(90),
                borderRadius: scale(5),
                height: dataCheck.length > 1 ? hp(12) : 0,
                backgroundColor: "#fff",
                position: "absolute",
                top: scale(260),
                marginHorizontal:wp(7)
            }}>
            <ListOfChoosed keyboardShouldPersistTaps='always' data = {this.state.edu ? this.state.dataCheck : this.state.dataCheckU} renderItem={({item, index}) => this.renderItem(item, index)} />
            </View> }
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
                <ListEdu style={{
                    backgroundColor: themeWhite,
                  }} data={this.state.sum && this.state.sum} renderItem={({item, index}) => (
                    <ItemMV item={item} index={index} remove={this.remove} />
                  )}/>
              </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(EditEducation);