/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

import axios from 'axios';

export default class FlatListExample extends Component {
    state = {
        name: '',
        surname: '',
        loading: true
    };

    componentDidMount() {
        // When every component loaded
        this._getRandomUser();
    }

    _getRandomUser = async () => {
        this.setState({
            loading: true
        });

        const { data: { results } } = await axios.get('https://www.randomuser.me/api/');
        const { name: { first, last } } = results[0];

        this.setState({
            name: first,
            surname: last,
            loading: false
        });

        /* If we do not use async-await proccess we can write like that */
        // axios
        //     .get('https://www.randomuser.me/api/')
        //     .then(user => user.data.results[0])
        //     .then(user => {
        //         this.setState({
        //             name: user.name.first,
        //             surname: user.name.last,
        //             loading: false
        //         });
        //     });
    };

    render() {
        const {name, surname, loading} = this.state;
        return (
            <SafeAreaView style={styles.container}>

                <View>
                    {
                        loading ? <Text style={{ textAlign: 'center' }}> Loading... </Text> : <Text style={{ textAlign: 'center' }}> { name } { surname } </Text>
                        // loading && <Text style={{ textAlign: 'center' }}> Loading... </Text> /* Second Way */
                    }
                    {/* <Text style={{ textAlign: 'center' }}> { name } { surname } </Text> */}
                    <Button 
                        title={'Get Random User'}
                        onPress={this._getRandomUser}
                    />
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
