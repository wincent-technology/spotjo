import React, {
    Component
  } from 'react';
  import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Text,
    Image,
    View,
  } from 'react-native';
  import {
    withNavigationFocus
  } from 'react-navigation';
  import styles from '../src/Style';
  import {
    scale,
    snack
  } from '../src/Util';
  import {
    themeColor,
    themeWhite,
  } from '../Constant/index';
  import {
    NavigationHead
  } from '../Component/ViewManager';
  import CustomButton from '../Component/Button';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../Component/responsive-ratio';
  import LinearGradient from 'react-native-linear-gradient';
  import Slider from '@react-native-community/slider';
  import {
    FontBold,
    Background,
    salaryFrame
  } from '../Constant/index';
  import http from '../api';
  import AsyncStorage from '@react-native-community/async-storage';
  
  class CompanyAddSalary extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        salaryMax:0,
        salaryrating:1,
        salary:1,
      }  
  
    }
  
    Back = () => {
      // console.log("hi");
      this.props.navigation.goBack();
    };
  
    componentDidMount() {
      console.log('this.edu', global.minSalary, global.maxSalary);
  
      this.setState({
        salary: parseInt(global.minSalary) || 0,
        salaryMax: Math.round(parseInt(global.maxSalary) || 0) *150/200,
        salaryrating: global.salaryrating || 1,
      });
      console.log(this.state);
    }
    
  
    save = () => {
      console.log('data',global.UserSkill)
      global.maxSalary = Math.round((this.state.salaryMax * 200)/150);
      global.minSalary =  this.state.salary;
      global.salaryrating = this.state.salaryrating
      // try {
      //   http
      //     .POST('api/user/editskill', {
      //       id: global.Id,
      //       salRatting: global.salaryrating,
      //       minSal: Math.round(this.state.salary),
      //       maxSal: global.maxSalary,
      //       skills: global.UserSkill,
      //     })
      //     .then(
      //       async(res) => {
      //         console.log('res',res)
      //         if (res['data']['status']) {
      //           console.log('responce user', res['data']['result']);
      //           var result = await AsyncStorage.getItem('UserLoggedInData');
      //           result = JSON.parse(result);
      //           result.salRatting =global.salaryrating 
      //           result.minSal =global.minSalary
      //           result.maxSal =global.maxSalary
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
      // alert('video is coming soon');
    };
    Add = () => {
      console.log('sal',this.state.salaryMax);
      // this.setState({
      //   salaryMax:Math.round((this.state.salaryMax * 200)/150),
      // });
      this.save()
      console.log('sal>>>>>>>>>>>>',);

    };
  
    render() {
      const {
        Anywhere,
        name,
        suggesion,
        dataCheck,
        dataCheckU,
        show,edu,uni,rate,progress
      } = this.state;
      console.log('this.sum',this.state.sum);
      return (
        <>
          
            <View style={{flexDirection:"row",justifyContent:"space-between",width:wp(90),padding:10,marginHorizontal:wp(5),height:150,alignItems:"center"}}>
            <View style={{width:wp(40),alignItems:"center",justifyContent:"center",}}>
            <Image
                      source={salaryFrame}
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
                  title={'Save Salary'}
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
            <View style={{flexDirection:"column",alignItems:"center",marginTop:-5}}>
            <Text style={{fontSize:18,fontFamily:FontBold}}>
                          {Math.round((this.state.salaryMax * 200)/150)} K
                        </Text>
            <View style={{
                            opacity: 1,
                            // position: 'absolute',
                            width: wp(60),
                            // top: scale(30),
                            backgroundColor: 'transparent',
                            height: hp(30) * 1.5,marginHorizontal:wp(15)
                        }}>
                        
                        <Slider
            maximumTrackTintColor="transparent"
            onValueChange={ salaryMax => this.setState({salaryMax},()=> console.log('salaryMax',salaryMax)) }
            thumbTintColor={'transparent'}
            value={this.state.salaryMax}
            maximumValue={150}
            style={{
                width: wp("127%"),
                transform: [{
                    rotate: '-90deg'
                }],
                height:hp(61),
                zIndex:1,
                // width: scale(screenWidth - scale(80))

            }}
            minimumTrackTintColor = {'transparent'} />
              <LinearGradient style={{
                            height: hp(30) * this.state.salaryMax / 100,
                            marginTop:(hp((30) * 1.5)) - (hp(30) * this.state.salaryMax / 100),
                            width: wp(60),
                            transform: [{
                                    rotate: '-180deg'
                                }],
                            position: 'absolute',
                        }} colors={[themeColor, themeColor,'rgba(55, 192, 211,0.2)',]}/>
              
            </View>
            <Text style={{fontSize:18,fontFamily:FontBold}}>3 k</Text>
            </View>
        </>
      );
    }
  }
  
  export default withNavigationFocus(CompanyAddSalary);