/** @format */

import React, { PureComponent } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';
import { heightPercentageToDP as hp} from "./responsive-ratio";

class TabBarIcon extends React.Component {

  render() {
    const {
      icon,
      tintColor,
    } = this.props;
    // console.log('icon',this.props);
    const numberWrap = (number = 0) => (
      number != 0 && <View style={styles.numberWrap}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );

    return (
      <View style={{ justifyContent: "center",alignItems:"center" }}>
        <Image
          ref={(comp) => (this._image = comp)}
          source={icon}
          style={[styles.icon, { tintColor }]}
        />
        {icon == 90 && numberWrap(global.msgUnreadTotal || 0)}
        {/* {icon == 84 && numberWrap(global.msgUnreadTotal || 0)} */}
      </View>
    );
  }
}


// 84

const styles = StyleSheet.create({
  icon: {
    width: hp(3.7),
    height: hp(3.7),
    resizeMode: "contain",
  },
  numberWrap: {
    // ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: hp(-1.5),
    right: hp(-1.5),
    height: hp(2.5),
    minWidth: hp(2.5),
    backgroundColor: 'tomato',
    borderRadius: hp(1.3),alignItems:"center",justifyContent:"center"
  },
  number: {
    color: "white",
    fontSize: hp(2),
    // marginLeft: 3,
    // marginRight: 3,
  },
});

export default TabBarIcon