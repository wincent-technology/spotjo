/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, AppState } from 'react-native';
import Routes from './Constant/Navigation'


export default class App extends Component {

    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        this.state = {
            // isLoaded: false
        };

    }
    ComponentDidMount() {}

    render() {
        return (<View style={{
                flex: 1,
            }}><Routes />
        </View>)

    }
}
;