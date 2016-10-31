import Text from './Text';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';

import Common from '../common/constants';

class Loading extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle}>加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: (Common.window.height-80)/2,
        left: (Common.window.width-100)/2,
        zIndex: 5
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
})

export default Loading;
