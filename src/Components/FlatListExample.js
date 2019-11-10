/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import 
    { 
        Platform, 
        StyleSheet, 
        Text, 
        View, 
        SafeAreaView, 
        FlatList, 
        Image, 
        TouchableOpacity, 
        TextInput, 
        ActivityIndicator
    } 
from 'react-native';

// import data from '../../data'; // local data
import axios from 'axios';

const isIos = Platform.OS === "ios";

export default class FlatListExample extends Component {
    state = {
        text: '',
        page: 1,
        allContacts: [], // for search filter
        contacts: [],
        // contacts: data /* If we use local data for app */
        loading: true,
        refreshing: false
    };

    constructor(props){
        super(props);
        this.duringMomentum = false; // At the first it should be false
    };

    componentDidMount() {
        this.getContacts();
    }
    
    getContacts = async () => {
        this.setState({
            loading: true
        });

        const { data: { results: contacts } } = await axios.get(`https://www.randomuser.me/api/?results=10&page=${this.state.page}`);
        const users = [...this.state.allContacts, ...contacts];

        if (this.state.refreshing) {
            users.reverse();
        }

        this.setState({
            contacts: users,
            allContacts: users,
            loading: false,
            refreshing: false
        })
    };

    _loadMore = () => {
        if (!this.duringMomentum){
            this.setState({
                page: this.state.page + 1
            }, () => {
                this.getContacts();
            });
            
            this.duringMomentum = false; // In IOS it's true
        }
    };

    _onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        }, () => {
            this.getContacts();
        });
    };

    _renderContacts = ({ item, index }) => {
        return(
            <TouchableOpacity style={[styles.contactContainer, { backgroundColor: item.id % 2 === 0 ? '#ebeaea' : '' }]}>
                {/* <Image
                    style={styles.avatar}
                    source={item.gender == "Male" ? {uri: 'http://cdn.onlinewebfonts.com/svg/img_507349.png'} : {uri: 'https://cdn2.iconfinder.com/data/icons/business-set-3-5/256/Business_Woman-01-512.png'}}
                /> */ /* This component for local data */}
                <Image 
                    style={styles.avatar}
                    source={{ uri: item.picture.thumbnail }}
                />
                <View style={styles.information}>
                    {/* <Text style={styles.name_surname}> { item.first_name + ' ' + item.last_name } </Text> */ /* This component for local data */}
                    <Text style={styles.name_surname}> { item.name.first } { item.name.last } </Text>
                    <Text> { item.location.state } </Text>
                </View>
            </TouchableOpacity>
        )
    };

    _searchFilter = text => {
        // This codes for local data search filter
        // const newData = data.filter(item => {
        //     const listItem = `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`;

        //     return listItem.indexOf(text.toLowerCase()) > -1;
        // });

        const newData = this.state.allContacts.filter(item => {
            const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}`;

            return listItem.indexOf(text.toLowerCase()) > -1;
        });

        this.setState({
            contacts: newData
        });

    };

    _renderHeader = () => {
        const { text } = this.state;
        return (
            <View style={styles.searchContainer}>
                <TextInput
                    onFocus={() => this.duringMomentum = true}
                    onBlur={() => this.duringMomentum = false}
                    onChangeText={text => {
                        this.setState({
                            text
                        });

                        this._searchFilter(text);
                    }}
                    values={text}
                    placeholder='Search...'
                    style={styles.searchInput}
                />
            </View>
        )
    };

    _renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={{
                paddingVertical: 20
            }}>
                <ActivityIndicator size='large' />
            </View>
        )
    };

    render() {
        return (
            <FlatList
                ListFooterComponent={this._renderFooter}
                ListHeaderComponent={this._renderHeader()}
                renderItem={this._renderContacts}
                // keyExtractor={item => item.id.toString()}
                keyExtractor={item => item.login.uuid}
                data={this.state.contacts}

                onEndReached={this._loadMore}
                onEndReachedThreshold={isIos ? 0 : .1} // It means when onEndReached function should work, it's about scroll
                // onMomentumScrollBegin={() => { this.duringMomentum = false }} // This codes does not work in android that's why we are going to use another way for control scroll

                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
            />
        );
    }
}

const styles = StyleSheet.create({
    name_surname: {
        fontSize: 18
    },
    contactContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 10
    },
    searchContainer: {
        padding: 10
    },
    searchInput: {
        fontSize: 16,
        backgroundColor: '#f9f9f9',
        padding: 10
    }
});
