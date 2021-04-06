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
  import Texting from '../Constant/Text'
  import AddExpSkillEdu from '../Component/AddExpSkillEdu'
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
      return (
        <>
          <AddExpSkillEdu source = {salaryFrame} title='Save_Salary' onPress={this.Add}/>
            <View style={{flexDirection:"column",alignItems:"center",marginTop:-5}}>
            <Text style={{fontSize:18,fontFamily:FontBold}}>
                          {Math.round((this.state.salaryMax * 200)/150)} K
                        </Text>
            <View style={{
                            opacity: 1,
                            width: wp(60),
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