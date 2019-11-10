import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default class PlatformExample extends Component{
    render(){
        const headerStyle = Platform.select({
            ios: styles.ios_header,
            android: styles.android_header
        });
        return (
            <View>
                <Text style={styles.headerStyle}>
                    Header
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ios_header: {
        color: 'red'
    },
    android_header: {
        color: 'blue'
    }
});