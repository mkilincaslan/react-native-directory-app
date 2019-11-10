/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/

import React, {Component} from 'react';
import { View, StyleSheet, SafeAreaView, Text, Button } from 'react-native';
import FlatListExample from './src/Components/FlatListExample';
import PlatformExample from './src/Components/PlatformExample';
import Header from './src/Components/Header';
import CallWebService from './src/Components/CallWebService';


export default class App extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                
                {
                /* 
                    <PlatformExample /> 
                    If we prefer we can use this kinda system for different Platfroms
                */
                }
                {
                /*
                    or we can use this system for Platform difference...
                    <Header />
                */
                }
                <FlatListExample />
                {/* <CallWebService /> */}

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
