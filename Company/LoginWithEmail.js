import React, {
  Component
} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style';
import {
  scale,
  snack
} from '../src/Util';
import {
  left,
  library,
  icon,
  play,
  leftVid
} from '../src/IconManager';
import CustomInput from '../Component/TextInput';
import {
  Background,
  url,themeWhite,themeColor
} from '../Constant/index';
import http from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import PermissionHelper from '../Component/PermissionHelper'
import Texting from '../Constant/Text'


class LoginWithEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',pass:false
    };
  }

  create = () => {
    this.props.navigation.navigate('NoAccount');
  };
  forgat = () => {
    this.props.navigation.navigate('EmailSend');
  };

  permission = async () => {
    const granted = await PermissionHelper.Storage.isLocationPermissionGranted();
    if (granted)
       {  Geolocation.getCurrentPosition((info) => {
              console.log('inf>>>>>>>>>>', info);
              global.let = info.coords.latitude;
              global.long = info.coords.longitude;
            });
      }
    else
    {const granted = await PermissionHelper.Storage.requestLocationPermission();
        !granted && this.permission();  }
  }


  onLogin = async () => {
    // this.permission();
    const {
      email,
      password
    } = this.state;
    try {
      if (email.length > 0 && password.length > 0) {
        http
          .POST('api/company/login', {
            email: email,
            password: password,
          })
          .then(
            (res) => {
              console.log('sdf', res['data']);
              if (res['data']['status']) {
                if (res['data']['result']['role'] == '2' || res['data']['result']['role'] == '3') {
                  console.log('login id ', res['data']['result']);
                  global.role = res['data']['result']['role'] ? 'Super Admin' : ''
                  global.Service = res['data']['result']['services'];
                  global.Id = res['data']['result']['id'];
                  global.Email = res['data']['result']['email'];
                  global.Branch = res['data']['result']['branch'];
                  global.uploadUri =
                    url + 'images/company/' + res['data']['result']['logo'];
                  global.Mobile = res['data']['result']['mobile'];
                  global.Company = res['data']['result']['name'];
                  global.Video =
                    url + 'images/company/' + res['data']['result']['video'];
                  global.WebSite = res['data']['result']['website'];
                  global.Address = res['data']['result']['address'];
                  global.Service = res['data']['result']['services'];
                  global.let = parseFloat(res['data']['result']['latitude']) || 1;
                  global.long = parseFloat(res['data']['result']['longitude']) || 1;
                  console.log('glo', global.let, global.long);
                  AsyncStorage.setItem(
                    'CompanyLoggedInData',
                    JSON.stringify(res['data']['result']),
                  );
                  if (res['data']['result']['isLoggedFirstTime'] == 0) {
                    this.props.navigation.navigate('TalentCom');
                  } else {
                    // this.props.navigation.navigate('TalentCom');

                    this.props.navigation.navigate('ComEdit');
                  }
                } else {
                  console.log('login id ', res['data']['result']);
                  global.role = res['data']['result']['role'] == '4' ? 'Staff' : '';
                  global.Service = res['data']['result']['services'];
                  global.Id = res['data']['result']['companyId'];
                  global.Email = res['data']['result']['email'];
                  global.Branch = res['data']['result']['branch'];
                  global.uploadUri =
                    url + 'images/company/' + res['data']['result']['logo'];
                  global.Mobile = res['data']['result']['mobile'];
                  global.Company = res['data']['result']['name'];
                  global.Video =
                    url + 'images/company/' + res['data']['result']['video'];
                  global.WebSite = res['data']['result']['website'];
                  global.Address = res['data']['result']['address'];
                  global.let = parseFloat(res['data']['result']['latitude']) || (global.let || 10);
                  global.long = parseFloat(res['data']['result']['longitude']) || (global.long || 10);
                  console.log('glo', global.let, global.long);
                  // AsyncStorage.setItem('CompanyLoggedInData', JSON.stringify(res['data']['result']));
                  this.props.navigation.navigate('TalentCom');
                }
              } else {
                snack(res['data']['message']);
              }
            },
            (err) => snack(err['message']),
          );
      } else {
        snack('Required Email Password');
      }
    } catch (error) {
      snack('error while register' + error);
    }
  };
// CallApiJob = () => {
//   try {
//     http.POST('api/jobseeker/get', {
//         ComId:global.Id,
//     }).then((res) => {
//         if (res['data']['status']) {
//             let data = []
//             let From,
//                 To,
//                 tmpobj,
//                 jobs = res['data']['result'];
//                 let items=global.language =='english' ? true:false
//                 for (let i =0; i<jobs.length; i++) {

//                     if (jobs[i]['workexp']) {
//                         for (let j = 0; j<jobs[i]['workexp'].length;j++)
//            {
//                         if (global.Job_Title.indexOf(items ? (jobs[i]['workexp'][j]['Role']) : (jobs[i]['workexp'][j]['Role'])  != -1)) {
//                             tmpobj = JSON.parse(JSON.stringify(jobs[i]));

//                             From = jobs[i]['workexp'][j]['From'].split(' ');
//                             To = jobs[i]['workexp'][j]['To'].split(' ');

//                             tmpobj.Company = jobs[i]['workexp'][j]['Company'];
//                             tmpobj.Role = jobs[i]['workexp'][j]['Role'];
//                             tmpobj.totalExp = To[1] - From[1];

//                             data.push(tmpobj);
//                         }
//                     }
//                 }
//             }

//             console.log("data >>>", data);

//             global.all = global.Job_Title && global.Job_Location != [] || '' ? data : [];
//             this.props.navigation.navigate('TabScreenCompany')
//         } else {
//             console.log('sf', res['data']['message'])

//         }
//     }, err => console.log('dgfgdg', err['message']));
// } catch (error) {
//     console.log('err', error)

// }
// }



  render() {
    const {pass} = this.state
    return (
      <SafeAreaView style={styles.backGround}>
        <ImageBackground
          style={styles.ImageBlue}
          source={Background}
          resizeMode={'stretch'}>
          <StatusBar hidden={true} />
          <View
            style={[
              {
                top: scale(30),
              },
              styles.CenterLogo,
            ]}>
            <View>
              <Image
                source={require('../Img/logo-spotjo.png')}
                resizeMode={'contain'}
                style={{
                  height: scale(150),
                  width: Dimensions.get('window').width / 2 + scale(80),
                }}
              />
            </View>
            <Texting style={styles.LookingFor} text='Login'/>
            <Texting
              style={[
                styles.LookingFor,
                {
                  fontSize: scale(17),
                },
              ]} text='Login_with_your_email_address'/>
          </View>
          <View
            style={{
              // left: Dimensions.get('window').width / 7,
              marginTop: scale(45),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomInput
              placeholder={'Email or Username'}
              textChange={(text) =>
                this.setState({
                  email: text,
                })
              }
            />
            <CustomInput
              placeholder={'Password'}
              passs={true} pass={pass} onPress={()=> this.setState({pass:!this.state.pass})}
              textChange={(text) =>
                this.setState({
                  password: text,
                })
              }
            />
            <TouchableWithoutFeedback onPress={this.forgat}>
              <Texting
                style={{
                  marginTop: scale(-8),
                  marginLeft: scale(115),
                  marginBottom: scale(40),
                  color: '#fff',
                }} text='Forget_Password'/>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              style={styles.CompanyLoginOpportunityView}
              onPress={this.onLogin}>
              <View
                style={[
                  styles.CompanyLoginWithEmailView,
                  {
                    borderRadius: scale(5),
                    justifyContent: 'center',
                  },
                ]}>
                <View>
                  <Texting style={styles.CompanyOppoTalentText} text='Login'/>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.CompanyLoginAccountText}>
            <Texting
              style={[
                {
                  fontSize: scale(23),
                },
                styles.FontSty,
              ]} text='Dont_Have_Account'/>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Texting
                style={[
                  {
                    fontSize: scale(19),
                  },
                  styles.FontSty,
                ]} text='Create_new_account'/>
              <TouchableWithoutFeedback onPress={this.create}>
                <Texting
                  style={[
                    {
                      textDecorationLine: 'underline',
                      // textDecorationColor: "#fff",
                      fontSize: scale(19),
                    },
                    styles.FontSty,
                  ]} text='Click_here'/>
                  
              </TouchableWithoutFeedback>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
export default withNavigationFocus(LoginWithEmail);