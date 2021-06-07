import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    TouchableWithoutFeedback,
    StatusBar,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    View,TouchableOpacity,
    TextInput,ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import {
    scale
} from '../src/Util';
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    switchColor,
    Background,
    themeColor,
    themeWhite,
    iconSearch,
    darkract,
    FontBold
} from '../Constant/index'
import styles from '../src/Style';
import TalentButton from '../Component/TalentButton'
import Texting from '../Constant/Text'
import { library, play } from '../src/IconManager';


class JobBasicType extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            FullTime: false,
            PartTime: false,
            Employed: false,
            Internship: false,
            StudentJobs: false,
            HelpingVacancies: false,
            Freelancer: false,
            same:true,
            role:''
        };
    }

    next = () => {
        console.log("this.state", this.state);
    }


    componentWillUnmount (){
        this.setState({
            name: '',
            FullTime: false,
            PartTime: false,
            Employed: false,
            Internship: false,
            StudentJobs: false,
            HelpingVacancies: false,
            Freelancer: false,
        });
    }


    render() {
        const {
            FullTime,
            PartTime,
            Employed,
            Internship,
            StudentJobs,
            HelpingVacancies,
            Freelancer,
            name,same
        } = this.state
        return (

           <>
            <StatusBar hidden={false} backgroundColor={themeWhite} barStyle='dark-content'/>
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: hp(2),
                marginTop:hp(2)
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginVertical: hp(1)

            }}><Texting style={{
                fontSize: hp(2.7),
                fontFamily: "Roboto-Bold",
                color: '#333'
            }} text={'Job_Basic_Type'}/></View>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginTop: hp(1)
            }}><Texting style={{
                fontSize: hp(2.7),
                fontFamily: "Roboto-Regular",
                textAlign: "center",
                color: '#333'
            }} text='Please_Provide'/></View>
            <View style={{
                marginTop: hp(3),flexDirection:'row',justifyContent:'center',alignItems:'center'
            }}>
            <CustomInput placeholder = {global.language == 'english' ? 'New Job Title' : 'New Job Title' } textChange = {(text) => global.Job_Title = text}
            inputContainerStyle={{
                // backgroundColor: themeColor,
                // width: "100%",
                height: hp(5),
                borderColor: '#eee',
                justifyContent: "center",
                borderBottomWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: '#333',
                fontSize: hp(2.5),
                fontFamily: "Roboto-Regular",
                fontWeight: "bold"
            }}
            placeholderTextColor={'#333'}
            containerStyle={{
                width: wp(80),
                height: hp(5)
            }}
            />
            <Text style={{fontSize:hp(2.2),fontFamily:FontBold,height:hp(4),justifyContent:'flex-start',color:'#333'}}>(m/w/d)</Text>
            </View>
            {this.state.same ? <View style={{flexDirection:"row",justifyContent:'space-between',width:wp(90),marginTop:5}}>
                <Text style={{
                     color: '#333',
                fontSize: hp(2.2),
                fontFamily: "Roboto-Regular",
                fontWeight: "bold",marginLeft:wp(5)
                }}>Role Same As Job Title</Text>
                <TouchableOpacity onPress={()=> this.setState({same:!this.state.same})} style={{marginRight:wp(-2)}}>{library(this.state.same && 'check-box',hp(3),'green')}</TouchableOpacity>
            </View> : <View style={{flexDirection:"row",justifyContent:'space-around',width:wp(100),marginTop:5}}><CustomInput placeholder = {global.language == 'english' ? 'Add Role' : 'New Job Title' } textChange = {(text) => global.Job_Title = text}
            inputContainerStyle={{
                // backgroundColor: themeColor,
                width: wp(74),
                height: hp(4),
                borderColor: '#eee',
                justifyContent: "center",
                borderBottomWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: '#333',
                fontSize: hp(2.5),
                fontFamily: "Roboto-Regular",
                fontWeight: "bold"
            }}
            placeholderTextColor={'#333'}
            containerStyle={{
                width: wp(82),
                height: hp(4),
            }}
            />
                <TouchableOpacity onPress={()=> this.setState({same:!this.state.same})}>{library(!this.state.same && 'check-box-outline-blank' ,hp(3),'green')}</TouchableOpacity>
            </View> }
            <Texting style={[  styles.Employment ,{
                fontSize: hp(2.7),
                fontWeight: "bold",
                color:"#333",marginTop:scale(10),
            }]} text='How_will_you_use_your_talent'/>
                            <View style={{
                                flexDirection: 'column',
    width: wp(85),
    top: hp(1)
                            }}>
                            
                            <View style={styles.PersonalInfoRowChoose}>
                                <TalentButton height = {true} name='FullTime' job = {true} bool = {FullTime} onPress={
                                    () => this.setState({
                                FullTime: !this.state.FullTime
                            },() => global.FullTime = this.state.FullTime)
                                } />
                                 <TalentButton  height = {true} name='Part_time' job = {true} bool = {PartTime} onPress={
                                    () => this.setState({
                                        PartTime: !this.state.PartTime
                            },() => global.PartTime = this.state.PartTime)
                                } />
            </View>
             <View style={{
                marginTop: hp(2),marginBottom:hp(2)
            }}><View style={{
                                    justifyContent:"center",alignItems:"center"
                                }}><Texting style={[  styles.Employment ,{
                fontSize: hp(2.7),
                fontWeight: "bold",
                color:"#333"
            }]} text='Employment'/>
            </View></View>
            </View>

            <View style={styles.PersonalInfoRowChoose}>
            <TalentButton name='Employed' height = {true} job = {true} bool = {Employed} onPress={
                                    () => this.setState({
                                Employed: !this.state.Employed
                            },() => global.Employed = this.state.Employed)
                                } />
                                <TalentButton height = {true} job = {true} name='Freelancers' bool = {Freelancer} onPress={
                                    () => this.setState({
                                        Freelancer: !this.state.Freelancer
                            },() => global.Freelancer = this.state.Freelancer)
                                } /></View>

            <View style={styles.PersonalInfoRowChoose}>
            <TalentButton height = {true} name='Internship' job = {true} bool = {Internship} onPress={
                                    () => this.setState({
                                        Internship: !this.state.Internship
                            },() => global.Internship = this.state.Internship)
                                } />
            <TalentButton  height = {true} name='Student_jobs' job = {true} bool = {StudentJobs} onPress={
                                    () => this.setState({
                                StudentJobs: !this.state.StudentJobs
                            },() => global.StudentJobs = this.state.StudentJobs)
                                } />
                                </View>
                                <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoRowChoose}>
                                <View style={[styles.PersonalInfoStartEmp, {
                width: wp(55)
            }]}>
            <TouchableOpacity style={{
        borderRadius: 20,borderWidth : 1,marginTop:scale(0),borderColor:HelpingVacancies ? themeColor:'#333', backgroundColor: HelpingVacancies ? themeColor : 0,paddingHorizontal:scale(9),}} 
    onPress={ () => this.setState({
                                        HelpingVacancies: !this.state.HelpingVacancies
                            },() => global.HelpingVacancies = this.state.HelpingVacancies)}>
        <Texting style={[styles.Employment, {
                fontSize: hp(2.7),
                color:HelpingVacancies ? '#fff':'#333',
                fontWeight:"normal"
            }]} text='Helping_Vacancies' />
    </TouchableOpacity>
            </View><View style={[styles.PersonalInfoEndEmp, {
                width: wp(20)
            }]}></View></View>
                                </View>
            </View>
            </>
        )
    }
};

export default JobBasicType;