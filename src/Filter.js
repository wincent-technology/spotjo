import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView, ImageBackground, TouchableWithoutFeedback, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from './Style'
import { left, library, icon, play, leftVid } from './IconManager';
import { scale, getStatusBarHeight } from './Util'
import { iconSearch, TRANLINE, switchColor, themeColor, themeWhite, Background, IC_ARR_UP, IC_ARR_DOWN, minimumSalary, salaryType, company, skill, skillCategory, skillLavel, Filterjobtype, searchType } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import Slider from '@react-native-community/slider';
import ToggleSwitch from '../Component/ToggleSwitch'
import CustomInput from '../Component/Input'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel, CheckBox, DropDownItem, NavigationHead, Rating } from '../Component/ViewManager.js'

var radio_props = [{
    label: '  By Distance',
    value: 0
}, {
    label: '  By Location',
    value: 1
}];



class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Hourly: true,
            Monthly: false,
            Yearly: false,
            ByDistance: false,
            ByLocation: false,
            flag: true,
            name: '',
            addSkill: ['J2EE', 'SQL,Mysql', 'Java'],
            FullTime: false,
            PartTime: false,
            // Employed: false,
            // Internship: false,
            // StudentJobs: false,
            // HelpingVacancies: false,
            // Freelancer: false,
            Employed: false,
            Internship: false,
            StudentJobs: false,
            HelpingVacancies: false,
            Freelancer: false

        };
    }



    Back = () => {
        console.log("hi");
        this.props.navigation.goBack()
    }
    Exit = () => {
        this.props.navigation.goBack()

    }
    addsSkill = (text) => {
        var i = text;
        let gems = this.state.addSkill
        // var in =  this.state.addSkill; 
        gems.push(i);
        this.setState({
            addSkill: gems
        });
        console.log('adskil', this.state.addSkill);
    }



    render() {
        const {Hourly, Monthly, Yearly, ByDistance, ByLocation, name, addSkill, Employed, Internship, StudentJobs, HelpingVacancies, Freelancer, skillCategorylist, FullTime, PartTime} = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <NavigationHead centerComponent='Edit Filter' rightComponent='Exit' onPress={() => this.Back()} onExit={() => this.Exit()}/>
            <View style={styles.FilterMainView}>
            <ImageBackground style={{
                width: wp('96%'),
                height: hp('100%') - (StatusBar.currentHeight + 50 + hp(5)),
            }} source={require('../Img/ract.png')} resizeMode={'stretch'}>
            <ScrollView style={styles.FilterScroll} nestedScrollEnabled={true}>
                <DropDownItem
            style={[styles.FilterDropDown, {
                marginTop: scale(15)
            }]}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={minimumSalary} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Minimum Salary</Text>
                </View>
            }
            ><View style={styles.FilterMinimumSalary}><View style={styles.FilterMinimumSalaryMin}><Text style={styles.FilterMinText}>0</Text>
            <Text style={styles.FilterMaxText}>150k+</Text></View><Slider
            style={styles.FilterMinimumSalarySlider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={themeColor}
            maximumTrackTintColor={themeColor}
            /></View>
            </DropDownItem>
           <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}>
            <View style={styles.fliterIcon}>
            <Image source={salaryType} style={styles.imageStyle} resizeMode={'contain'}/>
            </View><Text style={styles.DropDownHeader}>Salary Type</Text>
                </View>
            }
            ><View style={styles.SalaryTypeView}><CheckBox
            selected={Hourly}
            style={styles.CheckBoxLabel}
            textStyle={styles.CheckBoxLabelFont}
            onPress={() => {
                this.setState({
                    Hourly: !Hourly
                })
            }}
            text='Hourly'
            /><CheckBox
            selected={Monthly}
            textStyle={styles.CheckBoxLabelFont}
            style={styles.CheckBoxLabel}
            onPress={() => {
                this.setState({
                    Monthly: !Monthly
                })
            }}
            text='Monthly'
            /><CheckBox
            selected={Yearly}
            textStyle={styles.CheckBoxLabelFont}
            style={styles.CheckBoxLabel}
            onPress={() => {
                this.setState({
                    Yearly: !Yearly
                })
            }}
            text='Yearly'
            />   
            </View>
            </DropDownItem>
             <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={company} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Company</Text>
                </View>
            }
            ><View><CustomInput placeholder = {'Select Company'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                // width: "100%",
                height: scale(40),
                borderColor: themeColor,
                justifyContent: "center",
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            placeholderTextColor={themeWhite}
            containerStyle={{
                width: wp(85)
            }}
            iconName={iconSearch}
            iconStyle={{
                height: 25,
                width: 25
            }}
            iconColor={'#fff'}
            />
            </View>
            </DropDownItem>
            <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={skill} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Skill</Text>
                </View>
            }
            ><View style={{
                // width: "80%",
            }}><CustomInput placeholder = {'Add Skill'} textChange = {(text) => this.setState({
                name: text
            })} inputContainerStyle={{
                backgroundColor: themeColor,
                height: scale(40),
                // width: "100%",
                borderColor: themeColor,
                borderWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: 'white',
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                fontWeight: "bold"
            }}
            containerStyle={{
                width: wp(85)
            }}
            placeholderTextColor={themeWhite}
            iconName={iconSearch}
            iconStyle={{
                height: 25,
                width: 25
            }}
            iconColor={'#fff'}

            onSubmitEditing={(event) => this.addsSkill(event.nativeEvent.text)}
            /><ScrollView style={{
                marginTop: '-5%',
                marginBottom: 20,
                height: scale(50),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                width: wp(85)
            }} nestedScrollEnabled={true}>
            {this.state.addSkill.map((item, index) => {
                return (
                    <View style={{
                        flexDirection: 'row',
                        width: wp(85),
                        justifyContent: "center",
                        marginBottom: scale(2),
                        // marginLeft: '3%',
                        height: scale(15)
                    }}><View style={{
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: '35%'
                    }}><Text key={index}
                    style={{
                        fontSize: scale(16),
                        color: themeColor,
                        fontFamily: 'Roboto-Regular',
                    }}>
                      {item}
                    </Text></View><View style={{
                        alignItems: "flex-end",
                        justifyContent: "center",
                        width: '35%'

                    }}><Rating
                    type='custom'
                    imageSize={18}
                    ratingCount={5}
                    defaultRating={20}
                    readonly={false}
                    ratingBackgroundColor='transparent'
                    startingValue={0}
                    // ratingColor={"#f1ee40"}
                    // tintColor={themeWhite}
                    /></View></View>
                )
            })}</ScrollView>
            </View>
            </DropDownItem>
            <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={skillCategory} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Skill Category</Text>
                </View>
            }
            ><View style={{
                marginHorizontal: '1%',
                top: 10
            }}><ScrollView style={{
                marginTop: '-5%',
                marginBottom: 20,
            // height: scale(50),
            }} contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center"
            }} nestedScrollEnabled={true}>
            <View Style={{
                flexDirection: "column",
            }}><View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginBottom: scale(10),
            }}><CheckBox
            selected={Employed}
            style={styles.CheckBoxLabel}
            textStyle={styles.CheckBoxLabelFontSc}
            onPress={() => {
                this.setState({
                    Employed: !Employed
                })
            }}
            text='Employed'
            /><CheckBox
            selected={Internship}
            textStyle={styles.CheckBoxLabelFontSc}
            style={styles.CheckBoxLabel}
            onPress={() => {
                this.setState({
                    Internship: !Internship
                })
            }}
            text='Internship'
            />  
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                flexWrap: "wrap",
                marginBottom: scale(10),
            }}>
            <CheckBox
            selected={StudentJobs}
            textStyle={styles.CheckBoxLabelFontSc}
            style={styles.CheckBoxLabel}
            onPress={() => {
                this.setState({
                    StudentJobs: !StudentJobs
                })
            }}
            text='StudentJobs'
            /><CheckBox
            selected={Freelancer}
            textStyle={styles.CheckBoxLabelFontSc}
            style={styles.CheckBoxLabel}
            onPress={() => {
                this.setState({
                    Freelancer: !Freelancer
                })
            }}
            text='Freelancer'
            />
            <CheckBox
            selected={HelpingVacancies}
            style={styles.CheckBoxLabel}
            textStyle={styles.CheckBoxLabelFontSc}
            onPress={() => {
                this.setState({
                    HelpingVacancies: !HelpingVacancies
                })
            }}
            text='HelpingVacancies'
            /></View>
            </View>
            </ScrollView></View>
            </DropDownItem>
           <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={skillLavel} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Skill Level</Text>
                </View>
            }
            ><Text style={[
                styles.txt,
                {
                    fontSize: 20,
                }
            ]}>
                hi
              </Text>
            </DropDownItem>
             <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={Filterjobtype} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Job Type</Text>
                </View>
            }
            ><View style={{
                width: '80%',
                marginLeft: '10%',
                height: scale(50),
                marginTop: scale(-30),
                marginBottom: scale(5)
            }}>
            <View style={styles.PersonalInfoChoose}>
                            <View style={styles.PersonalInfoRowChoose}>
                                <View style={[styles.PersonalInfoStartChoose, {
                flexDirection: 'row',
                width: '40%'
            }]}><Text style={{
                marginRight: scale(5),
                fontSize: scale(18),
                color: '#000'
            }}>Fulltime</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={FullTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                FullTime: toggle
            })}
            /></View></View>
            <View style={[styles.PersonalInfoEndChoose, {
                flexDirection: "row"
            }]}><Text style={{
                marginRight: scale(5),
                fontSize: scale(18),
                color: '#000'
            }}>Part-time</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={PartTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                PartTime: toggle
            })}
            /></View></View></View>
             </View>
            </View>
            </DropDownItem>
            <DropDownItem
            // key={i}
            style={styles.FilterDropDown}
            contentVisible={false}
            invisibleImage={IC_ARR_DOWN}
            visibleImage={IC_ARR_UP}
            header={
            <View  style={styles.FilterDropDownInnerView}><View style={styles.fliterIcon}><Image source={searchType} style={styles.imageStyle} resizeMode={'contain'}/></View><Text style={styles.DropDownHeader}>Search Type</Text>
                </View>
            }
            ><View style={[styles.RadioSearchType, {
                flexDirection: "row"
            }]}>
            <CheckBox
            selected={ByDistance}
            style={styles.CheckBoxLabel}
            textStyle={styles.CheckBoxLabelFont}
            onPress={() => {
                this.setState({
                    ByDistance: !ByDistance
                }, () => {
                    this.props.navigation.navigate('ScreenMap')
                })
            }}
            text='By Distance'
            /><CheckBox
            selected={ByLocation}
            style={styles.CheckBoxLabel}
            textStyle={styles.CheckBoxLabelFont}
            onPress={() => {
                this.setState({
                    ByLocation: !ByLocation
                })
            }}
            text='By Location'
            /></View>
            </DropDownItem>
            <View style={[{
                marginTop: scale(80),
            }, styles.SaveFilterButton]}>
        <TouchableWithoutFeedback style={[{
                width: wp('80%')
            }, styles.SaveFilterButton]} onPress={this.talent}><View  style={[
                styles.SaveFilterButtonView, styles.SaveFilterButton]}><Text style={[{
                fontSize: scale(20)
            }, styles.FontSty]}>Save Filter</Text></View></TouchableWithoutFeedback>
        </View>

  </ScrollView>
  </ImageBackground>
           </View>
           <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
        </ImageBackground></SafeAreaView>
        )
    }
}
;

export default withNavigationFocus(Filter);