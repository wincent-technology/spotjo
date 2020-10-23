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
import CustomInput from '../Component/Input'
import ToggleSwitch from '../Component/ToggleSwitch'
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
            name
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
            }, styles.FontSty]}>Select the talent type?</Text></View>
            <View style={styles.PersonalInfoChoose}>
                            <View style={styles.PersonalInfoRowChoose}>
                                <View style={[styles.PersonalInfoStartChoose, {
                flexDirection: 'row'
            }]}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(16)
            }, styles.Employment]}>Fulltime</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={FullTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                FullTime: toggle
            },() => global.FullTime = toggle)}
            /></View></View>
            <View style={[styles.PersonalInfoEndChoose, {
                flexDirection: "row"
            }]}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(16)
            }, styles.Employment]}>Part-time</Text><View style={
            styles.SwitchView}><ToggleSwitch
            isOn={PartTime}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                PartTime: toggle
            },() => global.PartTime = toggle)}
            /></View></View></View>
             <View style={{
                top: hp(4)
            }}>
                                <View style={[styles.PersonalInfoStartChoose, {
                flexDirection: 'row'
            }]}><Text style={[{
                marginRight: scale(5),
                fontSize: scale(18),
                fontWeight: "bold"
            }, styles.Employment]}>Employment</Text></View></View></View>
            <View style={styles.PersonalInfoEmpoyementList}>
            <View style={[styles.PersonalInfoRowChoose, {
                marginTop: hp(5)
            }]}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Employed</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Employed}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Employed: toggle
            },() => global.Employed = toggle)}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Internship</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Internship}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Internship: toggle
            },() => global.Internship = toggle)}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Student jobs</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={StudentJobs}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                StudentJobs: toggle
            },() => global.StudentJobs = toggle)}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={[styles.PersonalInfoStartEmp, {
                width: wp(50)
            }]}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Helping Vacancies</Text></View>
                                <View style={[styles.PersonalInfoEndEmp, {
                width: wp(20)
            }]}><View style={styles.SwitchView}><ToggleSwitch
            isOn={HelpingVacancies}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                HelpingVacancies: toggle
            },() => global.HelpingVacancies = toggle)}
            /></View></View></View>
            <View style={styles.PersonalInfoRowChoose}>
                                <View style={styles.PersonalInfoStartEmp}><Text style={[styles.Employment, {
                fontSize: scale(16)
            }]}>Freelancer</Text></View>
                                <View style={styles.PersonalInfoEndEmp}><View style={styles.SwitchView}><ToggleSwitch
            isOn={Freelancer}
            onColor={switchColor}
            offColor="#b4b4b4"
            size="small"
            onToggle={toggle => this.setState({
                Freelancer: toggle
            },() => global.Freelancer = toggle)}
            /></View></View></View>
            <View style={{
                flexDirection: "row",
                width: wp(100),
                top: hp(10)
            }}>
            <View style={{
                alignItems: "flex-start",
                justifyContent: "center",
                width: wp(20),
                marginLeft: wp(-6)
            }}>
            <TouchableOpacity style={styles.Size} onPress={this.back} hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'flex-end',
                // right: wp(7),
                width: wp(62)
            }}><TouchableOpacity style={styles.Size} onPress={this.next} hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableOpacity></View>
            </View>
            </View>
            </View>
            </View>
        </ImageBackground></SafeAreaView>
        )
    }
};

export default withNavigationFocus(ChooseTalentCom);