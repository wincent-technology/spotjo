import React, { Component } from 'react'
import { Input, Icon, Image } from 'react-native-elements'
import { themeColor, cal, clock,FontBold } from '../Constant/index'
import { View,Text } from 'react-native'
import { scale } from '../src/Util'
import { play,library } from '../src/IconManager'
import { TouchableOpacity } from 'react-native-gesture-handler'

const All = {height:scale(44),borderRadius:scale(20),width:45,marginRight:-3,justifyContent:"center",alignItems:"center"}
export default CustomInput = (props) => <Input
    containerStyle={[{
        width: '100%',
        alignSelf: 'center',
        marginVertical: 6,
    }, props.containerStyle]}
    
    inputContainerStyle={[{
        height: props.height ? props.height : scale(45),
        width: props.width ? props.width : '92%',
        alignSelf: 'center',
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 0.3,
        
        borderRadius: scale(5),
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#fff"
    }
        , props.inputContainerStyle]}
    inputStyle={[{
        fontSize: props.fontSize ? props.fontSize : scale(16),
        color: props.color ? props.color : themeColor,
        fontWeight: props.fontWeight ? props.fontWeight : 'normal'
    }, props.inputStyle]}
    keyboardType = {props.keyboardType ? props.keyboardType : 'default'  }
    placeholder={props.placeholder}
    placeholderTextColor = {props.placeholderTextColor ? props.placeholderTextColor : themeColor}
    value = {props.value}
    underlineColorAndroid = {'transparent'}
    multiline = {props.multiline}
    secureTextEntry = {
    props.secureTextEntry
    }
    onChangeText = {
    (text) => props.textChange ? props.textChange(text) : null
    }
    onSubmitEditing = {
    (text) => props.onSubmitEditing ? props.onSubmitEditing(text) : null
    }
    errorStyle = {
    {
        color: 'red'
    }
    }
    leftIcon = {
    <View style={{
        marginLeft: 10
    }}>
    <Image
    source = {props.iconName ? props.iconName : require('../Img/search.png')}
    style={[{
        width: props.width ? props.width : 25,
        height: props.height ? props.height : 25
    }], props.iconStyle}
    resizeMode={'contain'}
    /></View>
    }
    leftIconContainerStyle = {[
        {
            padding: 0
        }, props.leftIconContainerStyle]
    } { ...props
    }
   
    rightIcon = {
    <View style={{
        marginRight: props.Company || props.pass  ? 0 : 10,
    }}>
     {props.RightIcon && <Image
    source = {props.RightIcon ? cal : props.RightIcon}
    style={[{
        width: props.width ? props.width : 25,
        height: props.height ? props.height : 25
    }], props.righticonStyle}
    resizeMode={'contain'}
    />}
    {props.Company && <View style={[{backgroundColor:props.Anywhere ? '#37c0d3' : '#cdf5fd'},All]} onStartShouldSetResponder={props.onPress}>
                        <Text style={{fontSize:scale(16),fontFamily:FontBold,color:props.Anywhere ? '#fff' : '#000'}}>{props.Company}</Text>
     </View>}
     {props.pass && <View style={{backgroundColor:"green"}}>
            {
                library(props.pass ? 'visibility' :'visibility-off',15,'green')

            }
     </View>
     }
    </View>
    
    }
   
    rightIconContainerStyle = {[
        {
            padding: 0
        }, props.rightIconContainerStyle]
    }
    { ...props
    }
    />