import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Header extends Component {
  render() {
    return (
        <View>
            <Text style={styles.ios_header}>
                Header
            </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    ios_header: {
        color: 'red'
    }
});