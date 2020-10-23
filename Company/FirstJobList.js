import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';
import styles from '../src/Style'
import { left, library, icon, play, leftVid } from '../src/IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE, male, female, canvas, FontBold, url } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMVJobb from './ItemMVJobb'
import CompanyProfile from '../src/CompanyProfile';
import DeviceInfo from 'react-native-device-info';

// import styles from './Style'
var c = 0;
// const data = [{
//     name: 'Suresh Kumar',
//     Header: 'JAVA DEVELOPER(M/W)',
//     image: male,
//     ComPany_Name: 'Porsche AG',
//     Working: 'Employed',
//     Address: 'Stuttgart',
//     skill: ['JAVA', 'J2EE', 'SQL'],
//     work_Experience: '5-6 Years',
//     salary: '50000$',
//     cell: '00-00-000',
//     email: 'Email@email.com'
// }, {
//     name: 'Kusuma Kulkarni',
//     Header: 'JAVA DEVELOPER(M/W)',
//     image: female,
//     ComPany_Name: 'Google',
//     Working: 'Employed',
//     Address: 'Stuttgart',
//     skill: ['JAVA', 'J2EE', 'SQL'],
//     work_Experience: '5-6 Years',
//     salary: '50000$',
//     cell: '00-00-000',
//     email: 'Email@email.com'
// }, {
//     name: 'Ramya Priya',
//     Header: 'JAVA DEVELOPER(M/W)',
//     image: female,
//     ComPany_Name: 'Amazon',
//     Working: 'Employed',
//     Address: 'Stuttgart',
//     skill: ['JAVA', 'J2EE', 'SQL'],
//     work_Experience: '5-6 Years',
//     salary: '50000$',
//     cell: '00-00-000',
//     email: 'Email@email.com'
// }, {
//     name: 'Suresh Kumar',
//     Header: 'JAVA DEVELOPER(M/W)',
//     image: male,
//     ComPany_Name: 'Porsche AG',
//     Working: 'Employed',
//     Address: 'Stuttgart',
//     skill: ['JAVA', 'J2EE', 'SQL'],
//     work_Experience: '5-6 Years',
//     salary: '50000$',
//     cell: '00-00-000',
//     email: 'Email@email.com'
// },];


class FirstJobList extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    Filter = () => {
        this.props.navigation.navigate('FilterUser')
    }

    push = (item) => {

        // global.item = item;

        this.props.navigation.navigate('UserPro', {
            item: item
        })

    }
    Back = () => {
        this.props.navigation.goBack();
    }
    componentDidMount() {

        this.checking();
    }
    Video = (item) => {
        console.log('hels');
        let m = url + 'images/user/' + item.video
        if (item)
            this.props.navigation.navigate('VideoPlayer', {
                vid: m
            })
        else
            alert('not uploaded');
    // this.props.navigation.navigate('VideoResume');
    }
    checking = () => {
        console.log('hey', global.all)
        // const {params} = this.props.navigation.state;
        // const otherParam = params ? params.otherParam : null;

        // console.log('other item>>>>>>>>>>>>>>>>>>>>>>>>>>', otherParam);
        this.setState({
            data: global.all
        })
    }
    render() {
        const {data} = this.state
        return (
            <View style={styles.backGround}>
            <NavigationEvents onDidFocus={this.checking}/>
        <StatusBar hidden={true}/>
        <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text={global.Job_Title}/>
            <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - {data && data.length}</Text>
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
   
        {this.state.data != '' ? ( <FlatList
            style={{
                marginTop: 4,
                marginBottom: 45,
                backgroundColor: 'transparent',
            }}
            data = {data}
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => <ItemMVJobb
                item={item}
                index={index}
                push={this.push}
                Video={this.Video}
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
            />)
                : (<View  style = {{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                }}>
            <Text style={{
                    textAlign: 'center',
                    fontFamily: FontBold,
                    color: themeWhite,
                    fontSize: scale(18),
                    width: wp(60)
                }}>No Data found 😞</Text><NavigationEvents onDidFocus={this.checking}/>
            </View>) }
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


export default withNavigationFocus(FirstJobList);