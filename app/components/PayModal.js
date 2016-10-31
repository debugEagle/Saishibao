import Common from '../common/constants';

import AccountOrder from '../pages/Account/AccountOrder'
import TabBarView from '../containers/TabBarView'

import ModalBox from 'react-native-modalbox';
import Text from './Text';

import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

export default class PayModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        btn:false
      }
  }

  open() {
      this.refs.modal.open()
  }
  close() {
      this.refs.modal.close()
  }

  _goAccountOrder() {
    this.props.navigator.immediatelyResetRouteStack([
      {
        component: TabBarView,
        passProps: {
          page: 3
        }
      },
      {
        component: AccountOrder
      }
    ]);
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
          <View style={styles.message}>
            <Text style={styles.messageText}>支付未成功，前往我的订单</Text>
          </View>
        </View>
        <View style={styles.modalOption}>
          <TouchableOpacity
            disabled={this.state.btn}
            style={styles.modalConfirm}
            onPress={()=> {
              this.setState({btn:true})
              this.props.fetchAccountOrder({start: true,offset: 0,limit: 10},()=>this._goAccountOrder()) }
            }>
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
