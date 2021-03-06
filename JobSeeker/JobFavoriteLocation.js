import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    ImageBackground,
    FlatList,
    Dimensions,
    Text,
    Image,
    View,
    TextInput
} from 'react-native';
import BackNext from '../Component/BackNext'
import SuggestionView from '../Component/SuggestionView'
import {
    withNavigationFocus
} from 'react-navigation';
import {
    scale,
    snack
} from '../src/Util';
import CustomInput from '../Component/Input'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    Background,
    themeColor,
    FontBold
} from '../Constant/index'
import styles from '../src/Style';
import http from '../api'
import {
    library
} from '../src/IconManager';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';


var mg = []

class JobFavoriteLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            dataCheck: [],
            show: false,
            suggesion: []

        };
        this.arrayholder = [];

    }

    componentDidMount() {
        var data = []

        try {
            http.GET('api/appcityjson/get').then((res) => {
                if (res['data']['status']) {
                    console.log('res', res['data']['result']);
                    this.setState({
                        dataCheck: res['data']['result'],
                    });
                    this.arrayholder = res['data']['result'];
                    //            //will get data in this    res['data']['result']
                } else {
                    snack(res['data']['message'])

                }
            }, err => snack(err['message']));
        } catch (error) {
            snack(error)

        }
    }

    choose = (choose) => {
        console.log('choose')
        mg.push(choose)
        mg = [...new Set(mg)]
        console.log('sfdsff', mg)
        let mni = []
        for (let i in mg) {
            if (mg[i] != choose || mg[i] != '')
                mni.push(mg[i])
        }
        this.setState({
            suggesion: mni,
            name: '',
            show: !this.state.show
        })
    }
    cheks = (text) => {

        var data = []
        const newData = this.arrayholder.filter(item => {
            const itemData = item != null && `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.toString().indexOf(textData) > -1;
        });
        for (let i in newData) {
            data.push({
                'name': newData[i],
                'backGround': 'white'
            })
        }
        if (newData != '') {
            this.setState({
                dataCheck: newData,
                name: text
            })
        } else {
            newData.push(text)
            this.setState({
                dataCheck: newData,
                name: text

            })
        }
    }
    suggestionTag = (elements, index) => {
        const {
            suggesion,
            dataCheck
        } = this.state;
        let m = suggesion
        for (let i in suggesion) {
            if (m[i] == elements) {
                m.splice(i, 1),
                    mg.splice(i, 1)
            }
            for (let j in dataCheck) {
                if (dataCheck[j]['name'] == elements)
                    dataCheck[j]['backGround'] = 'white'
            }
        }
        this.setState({
            suggesion: m
        })
    }
    next = () => {
        mg = this.state.name.split(',')
        mg = [...new Set(this.state.suggesion)]
        console.log('mg', mg)

        global.Job_Location = mg;
        this.props.navigation.navigate('JobFavoriteCompany')
    }
    back = () => {
        this.props.navigation.goBack();
    }
    renderItem = (item, index) => {
        return (
            <View style={{
                width: wp(80),
                marginLeft: scale(34),
            }}>
            <TouchableWithoutFeedback onPress={() => this.choose(item)}>
            <View style={{
                flexDirection: 'row',
                alignItems: "center"
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(68)
            }}><Text style={{
                fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor
            }}>{item}</Text></View>
            </View>
            </TouchableWithoutFeedback>
            </View>
        )
    }

    render() {
        const {
            suggesion,
            dataCheck
        } = this.state

        return (
            <SafeAreaView style={styles.backGround}>
            <ImageBackground style={styles.ImageBlue}
            source = {Background}
            resizeMode = {
            'stretch'
            } >
        <StatusBar hidden ={true}/>
            <View style={styles.MainFlex}>
        <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={styles.HeadingText}><Text style={[{
                fontSize: scale(24),
                textAlign: 'center'
            }, styles.FontSty]}>What's your favorite location?</Text></View><View style={{
                top: scale(20)
            }}><CustomInput value = {this.state.name} placeholder={'Place to Work'} 
            inputContainerStyle={{borderRadius:scale(20),height:scale(45),width:'92%',backgroundColor:"#fff",borderBottomColor: "#E5E5E5",
        borderBottomWidth: 0.3,}}
            textChange = {
            (text) => {
                this.setState({
                    show: text != '' ? true : false
                })
                this.cheks(text)
            }}
            inputStyle={{
                fontWeight: "bold",
                fontSize: scale(18),
                color: themeColor

            }}
            iconStyle={{
                height: 25,
                width: 25
            }}
            /></View>
            <View style={{
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: 'wrap',
                marginTop: scale(1),
                width: wp(87),
                height: suggesion != [] && scale(70)
            }}><ScrollView contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                {suggesion && suggesion.map((elements, index) => 
                    <SuggestionView onPress={() => this.suggestionTag(elements, index)} elements={elements} index={index} />
            )}
            </ScrollView>
            </View>
            { this.state.show && <View style={{
                width: wp(87),
                borderRadius: scale(5),
                height: dataCheck.length != 1 ? hp(12) : hp(6),
                backgroundColor: "#fff",
                position: "absolute",
                top: scale(290),
                alignItems: "center"
            }}><FlatList style={{
                marginTop: scale(2)
            }}
            data = {this.state.dataCheck}
            keyboardShouldPersistTaps='always'
            showsHorizontalScrollIndicator = { false  }
            removeClippedSubviews={true}
            renderItem={({item, index}) => this.renderItem(item, index)}
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={70}
            getItemLayout={(data, index) => (
            {
                length: hp('1%'),
                offset: hp('1%') * index,
                index
            }
            )}
            keyExtractor = {
            (item, index) => index + ''
            }
            /></View> }
            </View>
            <BackNext onBack={this.back} onNext={this.next} />

            </View>
        </ImageBackground></SafeAreaView>
        )
    }
};

export default withNavigationFocus(JobFavoriteLocation);