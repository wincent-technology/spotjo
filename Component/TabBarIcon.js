/** @format */

import React, { PureComponent } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import {
  withNavigationFocus,
  NavigationEvents
} from 'react-navigation';

class TabBarIcon extends React.Component {

  render() {
    const {
      icon,
      tintColor,
    } = this.props;
    console.log('icon',this.props);
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
        {icon == 89 && numberWrap(global.msgUnreadTotal || 0)}
        {/* {icon == 84 && numberWrap(global.msgUnreadTotal || 0)} */}
      </View>
    );
  }
}


// 84

const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
  numberWrap: {
    // ...Styles.Common.ColumnCenter,
    position: "absolute",
    top: -10,
    right: -10,
    height: 18,
    minWidth: 18,
    backgroundColor: 'tomato',
    borderRadius: 9,alignItems:"center",justifyContent:"center"
  },
  number: {
    color: "white",
    fontSize: 12,
    // marginLeft: 3,
    // marginRight: 3,
  },
});

export default TabBarIcon