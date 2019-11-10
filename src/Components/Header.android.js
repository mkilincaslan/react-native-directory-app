import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Header extends Component {
  render() {
    return (
        <View>
            <Text style={styles.android_header}>
                Header
            </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    android_header: {
        color: 'blue'
    }
});