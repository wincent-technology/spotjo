import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { themeColor, FontBold } from '../Constant/index'

class SnackBar extends Component {
    constructor() {
        super();

        this.animatedValue = new Animated.Value(50);
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
        this.state = {
            SnackBarInsideMsgHolder: ''
        };
    }

    ShowSnackBarFunction(SnackBarInsideMsgHolder = "Default SnackBar Message...", duration = 3000) {
        if (this.ShowSnackBar === false) {
            this.setState({
                SnackBarInsideMsgHolder: SnackBarInsideMsgHolder
            });

            this.ShowSnackBar = true;

            Animated.timing(
                this.animatedValue, {
                    toValue: 0,
                    duration: 400
                }
            ).start(this.hide(duration));
        }
    }

    hide = (duration) => {
        this.timerID = setTimeout(() => {
            if (this.HideSnackBar === true) {
                this.HideSnackBar = false;

                Animated.timing(
                    this.animatedValue, {
                        toValue: 50,
                        duration: 400
                    }
                ).start(() => {
                    this.HideSnackBar = true;
                    this.ShowSnackBar = false;
                    clearTimeout(this.timerID);
                })
            }
        }, 3000);
    }

    SnackBarCloseFunction = () => {
        if (this.HideSnackBar === true) {
            this.HideSnackBar = false;
            clearTimeout(this.timerID);

            Animated.timing(
                this.animatedValue, {
                    toValue: 50,
                    duration: 400
                }
            ).start(() => {
                this.ShowSnackBar = false;
                this.HideSnackBar = true;
            });
        }
    }

    render() {
        return (

            <Animated.View style = {[{
                transform: [{
                    translateY: this.animatedValue
                }]
            }, styles.SnackBarContainter]}>

            <Text numberOfLines = { 2 } style = { styles.SnackBarMessage }>{ this.state.SnackBarInsideMsgHolder }</Text>

            <Text style = { styles.SnackBarUndoText} onPress = { this.SnackBarCloseFunction } > CLOSE </Text>

         </Animated.View>

        );
    }
}

export default SnackBar;


const styles = StyleSheet.create({

    SnackBarContainter: {
        position: 'absolute',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        left: 0,
        bottom: 0,
        right: 0,
        height: 50,
        paddingLeft: 10,
        paddingRight: 55
    },

    SnackBarMessage: {
        color: themeColor,
        fontSize: 18,
        fontFamily: FontBold
    },

    SnackBarUndoText: {
        color: themeColor,
        fontSize: 18,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        padding: 5

    }
});