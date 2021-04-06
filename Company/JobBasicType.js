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
    TextInput,ScrollView
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
    darkract
} from '../Constant/index'
import styles from '../src/Style';
import TalentButton from '../Component/TalentButton'
import Texting from '../Constant/Text'


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
        };
    }

    next = () => {
        console.log("this.state", this.state);
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
            name
        } = this.state
        return (

           <>
            <StatusBar hidden={false} backgroundColor={themeColor} />
            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: hp(4)
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginVertical: hp(1)

            }}><Texting style={{
                fontSize: scale(20),
                fontFamily: "Roboto-Bold",
                color: '#333'
            }} text={'Job_Basic_Type'}/></View>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginTop: hp(1)
            }}><Texting style={{
                fontSize: scale(19),
                fontFamily: "Roboto-Regular",
                textAlign: "center",
                color: '#333'
            }} text='Please_Provide'/></View>
            <View style={{
                marginTop: hp(3)
            }}><CustomInput placeholder = {global.language == 'english' ? 'New Job Title' : 'New Job Title' } textChange = {(text) => global.Job_Title = text}
            inputContainerStyle={{
                // backgroundColor: themeColor,
                // width: "100%",
                height: scale(40),
                borderColor: '#eee',
                justifyContent: "center",
                borderBottomWidth: scale(1),
                borderRadius: scale(5),
            }} inputStyle={{
                color: '#333',
                fontSize: scale(18),
                fontFamily: "Roboto-Regular",
                fontWeight: "bold"
            }}
            placeholderTextColor={'#333'}
            containerStyle={{
                width: wp(86),
                height: scale(40)
            }}
            /></View>
            <Texting style={[  styles.Employment ,{
                fontSize: scale(18),
                fontWeight: "bold",
                color:"#333",marginTop:scale(15),
            }]} text='How_will_you_use_your_talent'/>
                            <View style={styles.PersonalInfoChoose}>
                            
                            <View style={styles.PersonalInfoRowChoose}>
                                <TalentButton name='FullTime' job = {true} bool = {FullTime} onPress={
                                    () => this.setState({
                                FullTime: !this.state.FullTime
                            },() => global.FullTime = this.state.FullTime)
                                } />
                                 <TalentButton name='Part_time' job = {true} bool = {PartTime} onPress={
                                    () => this.setState({
                                        PartTime: !this.state.PartTime
                            },() => global.PartTime = this.state.PartTime)
                                } />
            </View>
             <View style={{
                marginVertical: hp(4)
            }}><View style={{
                                    justifyContent:"center",alignItems:"center"
                                }}><Texting style={[  styles.Employment ,{
                fontSize: scale(22),
                fontWeight: "bold",
                color:"#333"
            }]} text='Employment'/>
            </View></View>
            </View>

            <View style={styles.PersonalInfoRowChoose}>
            <TalentButton name='Employed'  job = {true} bool = {Employed} onPress={
                                    () => this.setState({
                                Employed: !this.state.Employed
                            },() => global.Employed = this.state.Employed)
                                } />
                                <TalentButton job = {true} name='Freelancers' bool = {Freelancer} onPress={
                                    () => this.setState({
                                        Freelancer: !this.state.Freelancer
                            },() => global.Freelancer = this.state.Freelancer)
                                } /></View>

            <View style={styles.PersonalInfoRowChoose}>
            <TalentButton name='Internship' job = {true} bool = {Internship} onPress={
                                    () => this.setState({
                                        Internship: !this.state.Internship
                            },() => global.Internship = this.state.Internship)
                                } />
            <TalentButton name='Student_jobs' job = {true} bool = {StudentJobs} onPress={
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
        borderRadius: 20,borderWidth : 1,borderColor:HelpingVacancies ? themeColor:'#333', backgroundColor: HelpingVacancies ? themeColor : 0,paddingHorizontal:scale(9),}} 
    onPress={ () => this.setState({
                                        HelpingVacancies: !this.state.HelpingVacancies
                            },() => global.HelpingVacancies = this.state.HelpingVacancies)}>
        <Texting style={[styles.Employment, {
                fontSize: scale(20),
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