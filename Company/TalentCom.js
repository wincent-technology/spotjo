import React, {
    Component
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ImageBackground,
    Dimensions,
    Text,
    Image,
    View,
    TextInput,
    FlatList
} from 'react-native';
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
    heightPercentageToDP as hp,
    vw,
    vh
} from '../Component/responsive-ratio';
import {
    Background,
    themeColor,
    FontBold
} from '../Constant/index'
import http from '../api';
import styles from '../src/Style'
import {
    library
} from '../src/IconManager';
import Icon2 from 'react-native-vector-icons/dist/MaterialIcons';



var mg = []
class TalentCom extends Component {
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

    next = () => {
        // let min = ['sum', 'sum', 'min', 'two'];
        // let ing = [...new Set(min)];
        // console.log('ing', ing);

        // mg = this.state.name.split(',')
        mg = [...new Set(this.state.suggesion)]
        console.log('mg', mg)

        global.Job_Title = mg;
        this.props.navigation.navigate('LocationCom')
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

    componentDidMount() {
        var data = []
        try {
            http.GET('api/userwejson/get').then((res) => {
                if (res['data']['status']) {
                    console.log('result', res['data']['result'])
                    // for (let i in res['data']['result']) {
                    //     data.push({
                    //         'name': res['data']['result'][i],
                    //         'backGround': 'white'
                    //     })
                    // }
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
    cheks = (text) => {

        var data = []
        const newData = this.arrayholder.filter(item => {
            const itemData = item != null && `${item.toUpperCase()}   
                    ${item.toUpperCase()} ${item.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.toString().indexOf(textData) > -1;
        });
        // for (let i in newData) {
        //     data.push({
        //         'name': newData[i],
        //         'backGround': 'white'
        //     })
        // }
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
        }
        this.setState({
            suggesion: m
        })
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
            resizeMode = {'stretch'}>
        <StatusBar hidden ={true}/>
            <View style={{
                flex: 1
            }}>
        <View style={[{
                top: scale(30)
            }, styles.CenterLogo]}><View><Image source = {require('../Img/logo-spotjo.png')}
            resizeMode={'contain'}
            style={{
                height: scale(150),
                width: Dimensions.get('window').width / 2 + scale(80),
            }}/></View><View style={{
                top: scale(20)
            }}><Text style={[{
                fontSize: scale(24),
                fontFamily: 'Roboto-Bold'
            }, styles.FontSty]}>Which talent do you want?</Text></View><View style={{
                top: scale(20)
            }}><CustomInput placeholder = {'E.g (Java Developer)'} value = {this.state.name} textChange = {
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
            />
            </View>
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
                {suggesion && suggesion.map((elements, index) => <TouchableWithoutFeedback onPress = {() => this.suggestionTag(elements, index)}><View style={{
                    flexDirection: 'row',
                    height: scale(30),
                    borderRadius: scale(5),
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: scale(3),
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: scale(5),
                    marginBottom: scale(2)
                }}><View style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    paddingLeft: scale(10)
                }}><Text style={{
                    color: themeColor,
                    fontFamily: FontBold
                }}>{elements}</Text></View>
                <View style={{
                    top: scale(-7),
                    left: scale(5)

                }}>
                {
                library('highlight-off', scale(14), themeColor)
                }
                </View>
                    </View></TouchableWithoutFeedback>
            )}
            </ScrollView>
            </View>
             { this.state.show && <View style={{
                width: wp(87),
                borderRadius: scale(5),
                height: dataCheck.length != 1 ? hp(12) : hp(6),
                backgroundColor: "#fff",
                position: "absolute",
                top: scale(260)
            }}>
            <FlatList
            data = {dataCheck}
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
            /></View>}
            </View>
            <View style={{
                flexDirection: "row",
                width: wp(100),
                top: hp(15),
            }}>
            <View style={{
                alignItems: "flex-start",
                width: wp(40),
                marginLeft: wp(7)
            }}>
            <TouchableOpacity style={styles.Size} onPress={this.back} hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}><View  style={styles.Size}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Back</Text></View></TouchableOpacity>
            </View>
            <View style={{
                alignItems: 'flex-end',
                // right: wp(7),
                width: wp(47)
            }}><TouchableOpacity style={styles.Size} onPress={this.next} hitSlop={{top: 40, bottom: 40, left: 50, right: 50}}><View  style={[styles.Size, {
                alignItems: 'flex-end'
            }]}><Text style={[{
                fontSize: scale(20),
            }, styles.FontSty]}>Next</Text></View></TouchableOpacity></View>
            </View>
            </View>
        </ImageBackground></SafeAreaView>
        )
    }
};

export default withNavigationFocus(TalentCom);