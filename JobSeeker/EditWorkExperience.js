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
  educationCap,blanks,Fulls
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
  clock,
  education,expframe
} from '../Constant/index';
import AsyncStorage from '@react-native-community/async-storage';

import ItemMV from './ItemMV';
import DateTimePicker from '@react-native-community/datetimepicker';
import http from '../api';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';
import CustomInput from '../Component/Input';
import EducationComponent from '../Component/EducationComponent';
import EducationComponentUni from '../Component/EducationComponentUni';
import EducationRate from '../Component/EducationRate'
import AddExpSkillEdu from '../Component/AddExpSkillEdu'
import SuggestionView from '../Component/SuggestionView'
import ListEdu from '../Component/ListEdu';
import ListOfChoosed from '../Component/ListOfChoosed'

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
class EditWorkExperience extends Component {
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
      rating:3,Company:'',
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
      sum: global.Experience,
    });
  }

    





cheks = (text) => {
  // console.log('text')
        this.setState({
            name: text,
            })


}

Unis = (Company) => {
    this.setState({Company})
}


renders = (item) => {
  return <View style={{
    flexDirection: "row",
    alignItems: "center"
}}>
<View style={{
    marginHorizontal: scale(5)
}}><Icon2 name={'highlight-off'} size={scale(20)} color={themeColor} onPress={() => this.remove(item.Role)}/></View>
<View style={{
    flexDirection: "column",
    paddingTop: hp(1),
    // height: hp(4),
    width: wp('80%')
}}><Text style={{
    fontFamily: FontBold,
    fontSize: hp(2.5),
    color: themeColor
}} numberOfLines={1}>{item.Role}</Text>
<View style={{
    flexDirection: 'row',
    justifyContent:"space-between",
    paddingBottom: hp(1),
}}><View style={{alignItems:'flex-start',width:wp(55),flexDirection:"column"}}>
<Text style={{
    fontFamily: FontBold,
    fontSize: scale(11),
    color: '#000',
}}>{item.Company} , {item.From} - {item.To}</Text>
</View>
<View style={{alignItems:"flex-end",marginTop:0,marginRight:0}}>
<StarRating
    emptyStar={blanks}
    fullStar={Fulls}
    halfStar={'star-half'}
    iconSet={'MaterialIcons'}
    disabled={false}
    maxStars={5}
    starSize={scale(15)}
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
</View>
}

  save = () => {
    global.Experience = this.state.sum;
    try {
      http
        .POST('api/user/editworkexp', {
          id: global.Id,
          workexp: global.Experience,
        })
        .then(
          async (res) => {
            if (res['data']['status']) {
              console.log('responce user', res);

              var result = await AsyncStorage.getItem('UserLoggedInData');
              result = JSON.parse(result);
              result.workexp = global.Experience
              AsyncStorage.setItem('UserLoggedInData', JSON.stringify(result));

              // this.props.navigation.navigate('JobEditProfile');
            } else {
              snack(res['data']['message']);
            }
          },
          (err) => snack(err['message']),
        );
    } catch (error) {
      console.log(error);
    }
  };
  Add = () => {
    this.setState({
      edu: true,
    });
  };

  ads = () => {
    const {
      fromDate,
      toDate,
      rating
    } = this.state;
    var tempo = this.state.sum || [];
    tempo.push({
      Role : this.state.name.toUpperCase(),
      Company : this.state.Company.toUpperCase(),
      From : fromDate,
      To : toDate,
      rating : rating,
    });


    this.setState({
      sum: tempo,
      show: !this.state.show,
      fromDate: 'From Date',
      toDate: 'To Date',
      Company: '',
      name:'',
    },()=> this.save());

  };
  remove = (item, index) => {
    console.log(index, item);
    const {
      sum
    } = this.state;
    let m = sum;
    for (let i in m) {
      if (m[i].Role == item) {
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
      dataCheck,Company,
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
          <AddExpSkillEdu source = {expframe} title='Add_Experience' onPress={this.Add}/>
          {edu && <EducationComponent name={this.state.name} placeHolder={`What's your Role`} 
          textChange={
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.cheks(text)
            }} suggesion={suggesion} onNext={()=> {
              this.setState({
                edu:false,
                uni:true
              })
            }} />}
          {uni && <EducationComponentUni name={this.state.Company} placeHolder={'Enter Company name'} 
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
            {rate && <EducationRate name={'Add Rating'} placeHolder={'Rate Your Experience'} 
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
                height: dataCheck.length != 1 ? hp(12) : hp(6),
                backgroundColor: "#fff",
                position: "absolute",
                top: scale(260),
                marginHorizontal:wp(7)
            }}>
            <ListOfChoosed data={this.state.edu ? this.state.dataCheck : this.state.dataCheckU} 
            keyboardShouldPersistTaps="always" 
            renderItem={({item, index}) => this.renderItem(item, index)}/>
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
                  }} data={this.state.sum && this.state.sum}  renderItem={({item}) => (
                    this.renders(item)
                  )}/>
              </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

export default withNavigationFocus(EditWorkExperience);