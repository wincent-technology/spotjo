import React, {
    PureComponent
} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Text,
    Image,
    View
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import styles from '../src/Style'
import {
    left,
    library,
    icon,
    play,
    leftVid
} from '../src/IconManager';
import {
    themeColor,
    themeWhite,
    Background,
    sort,
    filter,
    TRANLINE,
    darkract,
} from '../Constant/index'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../Component/responsive-ratio';
import {
    scale
} from '../src/Util'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import {
    Rating,
    NavigationHead
} from '../Component/ViewManager.js'
import ItemMV from '../src/ItemMV'
import DeviceInfo from 'react-native-device-info';
import JobTaskDescription from './JobTaskDescription';
import http from '../api'

class CompanyService extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    Filter = () => {
        this.props.navigation.navigate('Filter')
    }

    // push = (item) => {
    //     console.log("heelo", item);
    // // global.item = item;
    // // this.props.navigation.navigate('CompanyProfile')
    // }
    componentDidMount() {
        this.setState({
            name: global.Service
        })
    }
    Back = () => {
        this.props.navigation.navigate('ComEdit');
    }
    handleChange = (text) => {
        // event.persist();
        console.log("textArea", text);
        this.setState({
            name: text
        })
        global.Service = this.state.name;
    }

    Exit = () => {
        try {
            http.POST('api/company/serviceedit', {
                comId: global.Id,
                services: this.state.name
            }).then((res) => {
                if (res['data']['status']) {
                    this.props.navigation.navigate('ComEdit');
                } else {
                    snack(res['data']['message'])

                }
            }, err => snack(err['message']));
        } catch (error) {
            snack(error)

        }

    }

    render() {
        const {
            name
        } = this.state;
        return (
            <View style={styles.backGround}>
                <StatusBar hidden={false} backgroundColor={themeWhite} />
                    <NavigationHead centerComponent='Company Service' rightComponent='Save' onPress={() => this.Back()} onExit={() => this.Exit()} />
                    <View style={{
                height: hp(100) - (hp(11) + scale(45))
            }}>
            
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
            <View style={{
                alignItems: "center",
                width: wp(96),
                marginTop: hp(4),
                marginBottom: hp(2),
            }}><Text style={{
                fontSize: scale(18),
                fontFamily: "Roboto-Bold",
                color: themeWhite
            }}>Company Service</Text></View>
            <View style={{
                marginTop: hp(0)
            }}><TextInput
            multiline={true}
            numberOfLines={10}
            style={{
                height: hp(65),
                width: wp(86),
                borderRadius: scale(10),
                backgroundColor: '#eee',
                alignSelf: 'center',
                textAlignVertical: 'top'
            }}
            onChangeText ={(text) => this.handleChange(text)}
            value={name}
            /></View>
           </View>
            </View>
            </View>
        )
    }
};

export default withNavigationFocus(CompanyService);