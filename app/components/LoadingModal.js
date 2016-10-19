import Common from '../common/constants';

import ModalBox from 'react-native-modalbox';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator
} from 'react-native';

export default class ConfirmModal extends Component {
  constructor(props) {
      super(props);
  }

  open() {
      this.refs.modal.open()
  }
  close() {
      this.refs.modal.close()
  }

  render() {

    return (
      <ModalBox
        ref={'modal'}
        style={styles.modal}
        swipeToClose={false}
        backdropOpacity={0}
        backdropPressToClose={false}
        animationDuration={0}
        position={'center'}
        isOpen={false}>
        <View style={styles.loading}>
          <ActivityIndicator color="white"/>
          <Text style={styles.loadingTitle}>加载中……</Text>
        </View>
      </ModalBox>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
    width: 100,
    height: 80,
    zIndex: 999,
  },
  loading: {
    backgroundColor: 'gray',
    height: 80,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  loadingTitle: {
    marginTop: 10,
    fontSize: 14,
    color: 'white'
  }
});
