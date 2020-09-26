import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, TouchableWithoutFeedback, TouchableOpacity, ImageBackground, Text, Image, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import styles from './Style'
import { left, library, icon, play, leftVid } from './IconManager';
import { themeColor, themeWhite, Background, sort, filter, TRANLINE } from '../Constant/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../Component/responsive-ratio';
import { scale } from './Util'
import { Rating, NavigationHeader } from '../Component/ViewManager.js'
import ItemMV from './ItemMV'
import CompanyProfile from './CompanyProfile';
import DeviceInfo from 'react-native-device-info';

// import styles from './Style'



class JobList extends PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }
    componentDidMount() {
        const {params} = this.props.navigation.state;
        const otherParam = params ? params.otherParam : null;
        console.log('other', otherParam)
        this.setState({
            data: otherParam || []
        })
        // console.log('console>>>', otherParam[0].skills);


    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    push = (item) => {
        // console.log("heelo", item);
        // global.ig = item
        this.props.navigation.navigate('CompanyProfile', {
            item: item
        })
    }
    Back = () => {
        this.props.navigation.navigate('ChooseTalent')
    }
    render() {
        const {data} = this.state;
        return (
            <View style={styles.backGround}>
        <StatusBar hidden={true}/>
        <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode={'stretch'}>
            <NavigationHeader onPress={() => this.Back()} text={global.Job_Title}/>
            <View style={styles.JoblistSecondViewHeading}>
            <View style={styles.JoblistSecondViewHeadingResult}>
            <Text style={styles.JoblistSecondViewHeadingText}>Results - {data.length}</Text>
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


export default withNavigationFocus(JobList);