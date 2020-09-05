import { Dimensions, StyleSheet, StatusBar } from 'react-native'

var Style = StyleSheet.create({
    radioForm: {},

    radioWrap: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    radio: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,


        alignSelf: 'center',

        borderColor: '#2196f3',
        borderRadius: 30,
    },

    radioLabel: {
        paddingLeft: 10,
        lineHeight: 20,
    },

    radioNormal: {
        borderRadius: 10,
    },

    radioActive: {
        width: 20,
        height: 20,
        backgroundColor: '#2196f3',
    },

    labelWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },

    labelVerticalWrap: {
        flexDirection: 'column',
        paddingLeft: 10,
    },

    labelVertical: {
        paddingLeft: 0,
    },

    formHorizontal: {
        flexDirection: 'row',
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    starsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starsInsideWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showRatingView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    ratingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5
    },
    ratingText: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
        color: '#34495e'
    },
    readonlyLabel: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
        color: '#34495a'
    },
    currentRatingText: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null
    },
    maxRatingText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : null,
        color: '#34495e'
    }
});

module.exports = Style;