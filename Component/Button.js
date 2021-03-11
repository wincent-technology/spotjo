import React, { Component } from 'react'
import { Button, Icon, Image } from 'react-native-elements'
import { themeColor, themeWhite } from '../Constant/index'
import { scale } from '../src/Util'
import styles from '../src/Style'

const CustomButton = props => (<Button title={props.title}
    icon={props.iconName ?
        <Image
        style ={styles.fliterIcon}
        source={props.iconName}
        resizeMethod={'resize'}
        resizeMode={'contain'}
        containerStyle = {[{
            left: 10,
            position: props.position ? props.position : "absolute"
        }, props.iconStyle]}
        /> : null
    } { ...props
    }
    containerStyle = {
    [{
        width: props.width ? props.width : 140,
    }, props.containerStyle]
    }
    buttonStyle = {
    [{
        backgroundColor: props.backgroundColor ? props.backgroundColor : themeColor,
        height: props.height ? props.height : 40,
        borderRadius: props.borderRadius ? props.borderRadius : 10,
        borderWidth: props.borderWidth ? borderWidth : 8,
        borderColor: props.borderColor ? props.borderColor : 'green',
    },
        props.buttonStyle
    ]
    }
    titleStyle = {
    [{
        fontSize: props.fontSize ? props.fontSize : scale(14),
        color: props.color ? props.color : themeColor
    }, props.titleStyle]

    }
    />)

export default CustomButton

// <Icon
//         style = {{
//             // padding: 6,
//             // left: 10
//         }}
//         name={props.iconName}
//         type = {props.iconType ? props.iconType : 'font-awesome'}
//         size={25}
//         containerStyle = {[{
//             left: 10,
//             position: props.position ? props.position : "absolute"
//         }, props.iconStyle]}
//         color={props.iconcolor ? props.iconcolor : 'white'}
//         />