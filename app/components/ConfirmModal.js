import Common from '../common/constants';
import dismissKeyboard from '../common/mixins/dismiss-keyboard'

import ModalBox from 'react-native-modalbox';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class ConfirmModal extends Component {
  constructor(props) {
      super(props);
  }

  open() {
      dismissKeyboard()
      this.refs.modal.open()
  }
  close() {
      this.refs.modal.close()
  }

  render() {

    return (
      <ModalBox
        ref={'modal'}
        style={[styles.modal, {width: this.props.width || (Common.window.width-60), height: this.props.height || 200}]}
        backdropOpacity={0.3}
        backdropPressToClose={false}
        position={'center'}
        isOpen={false}>
        <View style={styles.modalContent}>
          <Text style={styles.h2}>{ this.props.title || '提示' }</Text>
          <View style={styles.message}><Text style={styles.messageText}>{ this.props.message }</Text></View>
        </View>
        <View style={styles.modalOption}>
          <TouchableOpacity style={styles.modalCancel} onPress={()=> this.refs.modal.close() }>
            <Text style={styles.modalCancelText}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalConfirm} onPress={()=> this.props.onConfirm() }>
            <Text style={styles.modalConfirmText}>确定</Text>
          </TouchableOpacity>
        </View>
      </ModalBox>
    )
  }
}

const styles = StyleSheet.create({
    modal: {
        borderRadius: 10,
    },
    modalContent: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    h2: {
        marginTop: 15,
        fontSize: 20,
        color: '#555',
        textAlign: 'center',
    },
    modalOption: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    modalCancel: {
        flex: 1,
        padding: 15,
    },
    modalCancelText: {
        fontSize: 16,
        textAlign: 'center',
    },
    modalConfirm: {
        flex: 1,
        padding: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
    },
    modalConfirmText: {
        fontSize: 16,
        textAlign: 'center',
    },
    message: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageText: {
        color: '#555',
        fontSize: 16,
    },
});
