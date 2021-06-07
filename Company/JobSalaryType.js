import React, {
    Component
  } from 'react';
  import {
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Text,
    Image,
    View,TouchableOpacity
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
//   import * as Animatable from 'react-native-animatable';

  class JobSalaryType extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        salaryMax:0,
        salaryrating:1,
        salary:1,
        Hourly: false,
        Monthly: false,
        Yearly: false,
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
        salaryMax: Math.round(parseInt(global.maxSalary) || 45) *150/200,
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
        const {
            Hourly,
            Monthly,
            Yearly,
        } = this.state
      return (
        <>
          <AddExpSkillEdu source = {salaryFrame} title={global.language == 'english' ? 'Salary Type' : 'ger Salary'} onPress={this.Add}/>
            <View style={{flexDirection:"column",alignItems:"center",marginTop:hp(3),width:wp(100)}} onStartShouldSetResponder={() => true} >
            <View style={{
                  flexDirection: 'row',
                  marginBottom: scale(10),
                  marginLeft: wp(5),
                  alignItems: "center",
                  flexWrap: "wrap"
                  // paddingHorizontal:"5%"
                }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", height: hp(6), width: "100%" }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        Hourly: !Hourly,
                      });
                    }} style={{ borderColor: Hourly ? themeColor : '#000', backgroundColor: Hourly ? themeColor : themeWhite, width: "44%", justifyContent: "center", alignItems: "center", borderRadius: scale(30), borderWidth: 1, paddingHorizontal: scale(10) }}>
                      <Texting style={[{ color: Hourly ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='Hourly' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        Monthly: !Monthly,
                      });
                    }} style={{ borderColor: Monthly ? themeColor : '#000', backgroundColor: Monthly ? themeColor : themeWhite, width: "44%", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: scale(30), paddingHorizontal: scale(10), marginRight: "8%" }}>
                      <Texting style={[{ color: Monthly ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='Monthly' />
                    </TouchableOpacity>

                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", height: hp(6), width: "100%", marginTop: scale(15) }}>
                    <TouchableOpacity onPress={() => {
                      this.setState({
                        Yearly: !Yearly,
                      });
                    }} style={{ borderColor: Yearly ? themeColor : '#000', backgroundColor: Yearly ? themeColor : themeWhite, width: "44%", borderWidth: 1, justifyContent: "center", alignItems: "center", borderRadius: scale(30), paddingHorizontal: scale(10) }}>
                      <Texting style={[{ color: Yearly ? 'white' : '#000' }, styles.CheckBoxLabelFont]} text='Yearly' />
                    </TouchableOpacity>
                  </View>
                </View>
            </View>
        </>
      );
    }
  }
  

  export default withNavigationFocus(JobSalaryType);