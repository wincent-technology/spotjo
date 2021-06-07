import React, {
    Component
} from 'react';

import {
    TouchableOpacity,
    Image,
    Text,
    View,
    StyleSheet,
    InteractionManager,
    Platform,
    Dimensions,
    Animated,
} from 'react-native';

import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from './responsive-ratio';
var initialValue = 0;
var finalValue = 0;
var content = 0;
const styles = StyleSheet.create({
    Dropcontainer: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    Dropicons: {
        width: hp(3),
        height: hp(3),
        position: 'absolute',
        right: 16,
        top: hp(2)
    },
    Dropunderline: {
        width: '100%',
        height: 1,
        position: 'absolute',
        top: 0,
    },
    Dropcontent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',

    },
    DropcontentChild: {
        padding: 5,

    },
    DropcontentView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    DropcontentTxt: {
        color: 'black',
        marginLeft: 8,
        fontSize: 12,
    },
    DropcontentFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 48,
        paddingHorizontal: 12,
    },
});

class DropDownItem extends Component {
    static animated;
    static defaultProps = {
        contentVisible: false,
        backgroundColor: 'transparent',
        titleBackground: 'transparent',
        contentBackground: 'transparent',
        underlineColor: '#d3d3d3',
        visibleImage: false,
        invisibleImage: false,
        flag: true
    };

    static propTypes = {
        contentVisible: PropTypes.bool,
        backgroundColor: PropTypes.string,
        titleBackground: PropTypes.string,
        contentBackground: PropTypes.string,
        underlineColor: PropTypes.string,
        visibleImage: PropTypes.any,
        invisibleImage: PropTypes.any,
        flag: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            contentVisible: props.contentVisible,
            headerheight: 0,
            contentHeight: 0,
        };
    }

    render() {
        
        return (
            <Animated.View style={[
                styles.Dropcontainer,
                {
                    height: this.animated,
                    backgroundColor: this.props.backgroundColor,
                },
                this.props.style,
            ]}>
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.onPress}
            >
          <View
            onLayout={ this.onAnimLayout }
            >
            { this.props.header }
            <Image source={
            this.state.contentVisible
                ? this.props.visibleImage
                : this.props.invisibleImage
            } style={styles.Dropicons}
            resizeMode={'contain'}/>
          </View>
        </TouchableOpacity>
        <View
            style={[this.props.HeaderStyle,styles.Dropcontent]}
            onLayout={this.onLayout}
            >
          <View
            style={[
                styles.DropcontentChild,
            ]}
            >
            { this.props.children }
          </View>
        </View>
      </Animated.View>
        );
    }

    runAnimation = () => {
        // console.log('this.state', this.state)
        initialValue = this.state.contentVisible ?
            this.state.headerHeight + this.state.contentHeight : this.state.headerHeight;
        finalValue = this.state.contentVisible ?
            this.state.headerHeight : this.state.contentHeight + this.state.headerHeight;
        this.animated.setValue(initialValue);
        // console.log('sfsfsfsfsfintial', initialValue, finalValue)
        this.setState({
            contentVisible: !this.state.contentVisible,
        });

        Animated.spring(
            this.animated, {
                toValue: finalValue,
                // useNativeDriver: true,
                isInteraction: false,
            },
        ).start();
    }

    onAnimLayout = (evt) => {
        const headerHeight = evt.nativeEvent.layout.height;
        if (!this.state.isMounted && !this.props.contentVisible) {
            this.animated = new Animated.Value(headerHeight);
            this.setState({
                isMounted: true,
                headerHeight,
            });
            return;
        } else if (!this.state.isMounted) {
            InteractionManager.runAfterInteractions(() => {
                this.animated = new Animated.Value(headerHeight + this.state.contentHeight);
            });
        }
        this.setState({
            headerHeight,
            isMounted: true
        });
    }

    onLayout = (evt) => {
        // console.log('sdfsf>>>>>>>', evt.nativeEvent.layout.height, this.state.contentHeight);
        const contentHeight = evt.nativeEvent.layout.height;
        if (content == 0)
            content = contentHeight

        if (contentHeight != 0) {
            this.setState({
                contentHeight
            });
        } else {
            this.setState({
                contentHeight: content + content
            });
        }
    }

    onPress = () => {
        const {
            flag
        } = this.props
        if (flag)
            this.runAnimation();
    }
}

export default DropDownItem;