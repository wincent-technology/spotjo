import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    View,
    TextInput
} from 'react-native';
import {
    withNavigationFocus,
    NavigationEvents
} from 'react-navigation';
import {
    scale,
    snack
} from '../src/Util';
import TalentButton from '../Component/TalentButton'
import BackNext from '../Component/BackNext'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    switchColor,
    Background,
    themeColor
} from '../Constant/index'
import styles from '../src/Style';
import http from '../api';
class ChooseTalentCom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            FullTime: false,
            PartTime: false,
            Employed: false,
            Internship: false,
            StudentJobs: false,
            HelpingVacancies: false,
            Freelancer: false,
        };
    }


    componentDidMount() {
        this.setState({
            FullTime: global.FullTime,
            PartTime: global.PartTime,
            Employed: global.Employed,
            Internship: global.Internship,
            StudentJobs: global.StudentJobs,
            HelpingVacancies: global.HelpingVacancies,
            Freelancer: global.Freelancer,
        })
    }
    checking = () => {
        this.setState({
            FullTime: global.FullTime,
            PartTime: global.PartTime,
            Employed: global.Employed,
            Internship: global.Internship,
            StudentJobs: global.StudentJobs,
            HelpingVacancies: global.HelpingVacancies,
            Freelancer: global.Freelancer,
        })
    }

    next = () => {
        try {
            http.POST('api/jobseeker/get', {
                workexp: global.Job_Title,
                place: global.Job_Location,
                FullTime: this.state.FullTime,
                PartTime: this.state.PartTime,
                Employed: this.state.Employed,
                Internship: this.state.Internship,
                StudentJobs: this.state.StudentJobs,
                HelpingVacancies: this.state.HelpingVacancies,
                Freelancer: this.state.Freelancer
            }).then((res) => {
                if (res['data']['status']) {
                    let data = []
                    let From,
                        To,
                        tmpobj,
                        jobs = res['data']['result'];

                    for (let i in jobs) {

                        if (jobs[i]['workexp']) {
                            for (let j in jobs[i]['workexp']) {
                                if (global.Job_Title.indexOf(jobs[i]['workexp'][j]['heading']) != -1) {
                                    tmpobj = JSON.parse(JSON.stringify(jobs[i]));

                                    From = jobs[i]['workexp'][j]['From'].split(' ');
                                    To = jobs[i]['workexp'][j]['To'].split(' ');

                                    tmpobj.Company = jobs[i]['workexp'][j]['Company'];
                                    tmpobj.heading = jobs[i]['workexp'][j]['heading'];
                                    tmpobj.totalExp = To[1] - From[1];

                                    data.push(tmpobj);
                                }
                            }
                        }
                    }

                    console.log("data >>>", data);

                    global.all = global.Job_Title && global.Job_Location != [] || '' ? data : [];
                    this.props.navigation.navigate('TabScreenCompany')

                    // will get data in this    res['data']['result']             
                    // this.props.navigation.navigate('TabScreenJob')
                } else {
                    console.log('sf', res['data']['message'])

                }
            }, err => console.log('dgfgdg', err['message']));
        } catch (error) {
            console.log('err', error)

        }
        // this.props.navigation.navigate('TabScreen')


    }
    back = () => {
        this.props.navigation.goBack();
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
        } = this.state
        return (
            <SafeAreaView style={styles.backGround}>
            <NavigationEvents onDidFocus={this.checking}/>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <View style={styles.MainFlex}>
        <View style={[{
                top: scale(30),
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(140),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={{
                width: wp('80%')
            }}><Text style={[{
                fontSize: scale(24),
                textAlign: 'center'
            }, styles.FontSty]}>How will you use your talent?</Text></View>
            <View style={styles.PersonalInfoChoose}>
                            <View style={styles.PersonalInfoRowChoose}>
                                <TalentButton name='FullTime' bool = {FullTime} onPress={
                                    () => this.setState({
                                FullTime: !this.state.FullTime
                            },() => global.FullTime = this.state.FullTime)
                                } />
                                 <TalentButton name='Part-time' bool = {PartTime} onPress={
                                    () => this.setState({
                                        PartTime: !this.state.PartTime
                            },() => global.PartTime = this.state.PartTime)
                                } />
            </View>
             <View style={{
                marginVertical: hp(7)
            }}><View style={{
                                    justifyContent:"center",alignItems:"center"
                                }}><Text style={[{
                fontSize: scale(22),
                fontWeight: "bold"
            }, styles.Employment]}>Employment</Text>
            </View></View>
            </View>
            <View style={styles.PersonalInfoRowChoose}>
            <TalentButton name='Employed' bool = {Employed} onPress={
                                    () => this.setState({
                                Employed: !this.state.Employed
                            },() => global.Employed = this.state.Employed)
                                } />
                                <TalentButton name='Freelancer' bool = {Freelancer} onPress={
                                    () => this.setState({
                                        Freelancer: !this.state.Freelancer
                            },() => global.Freelancer = this.state.Freelancer)
                                } /></View>

            <View style={styles.PersonalInfoRowChoose}>
            <TalentButton name='Internship' bool = {Internship} onPress={
                                    () => this.setState({
                                        Internship: !this.state.Internship
                            },() => global.Internship = this.state.Internship)
                                } />
            <TalentButton name='Student jobs' bool = {StudentJobs} onPress={
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
        borderRadius: HelpingVacancies ? 20 : 0,backgroundColor: HelpingVacancies ? "green" : 0,paddingHorizontal:scale(10),}} 
    onPress={ () => this.setState({
                                        HelpingVacancies: !this.state.HelpingVacancies
                            },() => global.HelpingVacancies = this.state.HelpingVacancies)}>
        <Text style={[styles.Employment, {
                fontSize: scale(20)
            }]}>Helping Vacancies</Text>
    </TouchableOpacity>
            </View>
                                <View style={[styles.PersonalInfoEndEmp, {
                width: wp(20)
            }]}></View></View>
                                </View>
                                
            </View>
            <BackNext onBack={this.back} onNext={this.next} />
            </View>
        </ImageBackground></SafeAreaView>
        )
    }
};

export default withNavigationFocus(ChooseTalentCom);