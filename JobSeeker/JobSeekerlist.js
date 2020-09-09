import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, ScrollView, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, TRANLINE, home, place, screen, edit, earth, dollor, user, bag, sort, filter, } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';
import JobCompanyProfile from './JobCompanyProfile';
import { NavigationEvents } from 'react-navigation';

global.back = false
// import styles from './Style'
var c = 0;
const data = [{
    Header: 'JAVA DEVELOPER(M/W)',
    image: 'https://turbologo.com/articles/wp-content/uploads/2019/11/Porsche-logo-cover-1280x720.jpg',
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com',
    work_Type: "Full Time",
    Description: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],
    About_Company: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],
}, {
    Header: 'Senior Java Devloper',
    image: 'https://cdn.vox-cdn.com/thumbor/2eZPJ-j9zXm5AIro7TIiEBCgNoc=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/assets/3218223/google.jpg',
    ComPany_Name: 'Google',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com',
    work_Type: "Half Time",
    Description: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],
    About_Company: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],

}, {
    Header: 'JAVA DEVELOPER / J2EE',
    image: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png',
    ComPany_Name: 'Amazon',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com',
    work_Type: "Full Time",
    Description: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],
    About_Company: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],

}, {
    Header: 'JAVA DEVELOPER(M/W)',
    image: 'https://di-uploads-pod3.dealerinspire.com/porscheoffremont/uploads/2018/09/porsche-logo.jpg',
    ComPany_Name: 'Porsche AG',
    Working: 'Employed',
    Address: 'Stuttgart',
    skill: ['JAVA', 'J2EE', 'SQL'],
    work_Experience: '5-6 Years',
    salary: '50000$',
    webSite: 'www.example.com',
    work_Type: "Half Time",
    Description: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],
    About_Company: ['Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'As our vehicle Technician you will be responsible for the service, fault diagnosis and repair of a variety',
        'Discover more and how to apply.',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team',
        'Porsche Centre Guildford therefore seek the best in class vehicle technicians to join our service team'
    ],

},];

global.item = data[0];

class JobSeekerlist extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {};
    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        console.log("heelo", item);
        global.item = item;
        this.props.navigation.navigate('JobCompanyProfile');
    }

    Back = () => {
        this.props.navigation.navigate('ChooseTalent')
    }
    render() {
        console.warn(">>", DeviceInfo.hasNotch())

        return (

            <View style={styles.backGround}>
        <StatusBar hidden={true}/>
           <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text='Fresher Java Developer'/>
            <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - 200</Text>
           </View>
            <View style={styles.JobListUpperButtonView}><TouchableWithoutFeedback>
            <View style={[{
                marginRight: scale(15)
            }, styles.JobListUpperButtonIcon]}>
            <Image source ={sort} style={{
                height: scale(20),
                width: scale(16)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Sort</Text>
            </View>
            </TouchableWithoutFeedback>
             <TouchableWithoutFeedback onPress={this.Filter}>
            <View style={styles.JobListUpperButtonIcon}>
            <Image source ={filter} style={{
                height: scale(19),
                width: scale(14),
                marginTop: scale(1)
            }} resizeMode={'contain'}/>
            <Text style={styles.JoblistUpperButton}>Filter</Text>
            </View>
            </TouchableWithoutFeedback>
   </View></View>
   
   <FlatList
            style={{
                marginTop: 4,
                marginBottom: 50,
                backgroundColor: 'transparent',
            }}
            data = {data}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMV
                item={item}
                index={index}
                push={this.push}
                // getAudioTimeString={this.getAudioTimeString}
                />}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('28%'),
                offset: hp('28%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            />
            <View style={styles.TranLingImage}>
             <Image
            source={TRANLINE}
            style={styles.imageStyle}
            resizeMode={'stretch'}
            /></View>
            </ImageBackground>
        </View>
        )
    }
}
;


// class CompanyProfile extends Component {
//     render() {
//         return <View><Text>{this.props.item.header}</Text></View>;
//     }
// }


export default withNavigationFocus(JobSeekerlist);