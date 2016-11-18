import NavBar from '../../components/NavBar';
import ConfirmModal from '../../components/ConfirmModal';
import Common from '../../common/constants';

import Toast, {DURATION} from 'react-native-easy-toast';
import Text from '../../components/Text';


import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TextInput
} from 'react-native'

class AccountInfoSet extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: ''
    }
    this.valueLength = {
      rickName: 8,
      realName: 8,
      idCard: 18,
      passportID: 9
    }
    this.keyboardType = {
      rickName: 'default',
      realName: 'default',
      idCard: 'default',
      passportID: 'default'
    }
  }

  _savaSuccess(){
    this.refs.modal.close()
    this.refs.toast.show('保存成功');
    this.timer = setTimeout(()=>{
      this.props.navigator.pop()
      clearTimeout(this.timer)
    }, 1000);
  }

  _savaFailed(msg){
    this.refs.modal.close()
    this.refs.toast.show(msg);
  }

  _savaInfo(){
    this.props.setAccountInfo(this.props.attr, this.state.value, ()=>this._savaSuccess(), (msg)=>this._savaFailed(msg))
  }

  _renderInput() {
    const maxLength = this.valueLength[this.props.attr]
    const keyboardType = this.keyboardType[this.props.attr]

    return (
      <View style={styles.textView}>
        <TextInput style={styles.textInput}
          autoFocus={true}
          clearButtonMode='while-editing'
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={ (value) => this.setState({value}) }
          value={this.state.value}
        />
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        <NavBar
          name={this.props.name}
          navigator={this.props.navigator}
          rightButton={this.state.value ? {text:'保存',onPress:()=>this.refs.modal.open()} : null} />
        {this._renderInput()}
        <ConfirmModal
          ref={'modal'}
          message={this.props.name + '一经设置，将无法再次修改！'}
          onConfirm={()=>this._savaInfo()}/>
        <Toast ref="toast" position='bottom'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3'
  },
  textView: {
    backgroundColor: 'white',
    height: 40,
    marginTop: 20
  },
  textInput: {
    marginHorizontal: 15,
    height:40
  },
})

export default AccountInfoSet
