import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Toast from 'react-native-easy-toast';
import LoadingModal from '../../components/LoadingModal';
import HTTPUtil from '../../common/utils/HTTPUtil';

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';

class AccountContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }

  submit() {
    if (this.state.title === '') {
      this.titleInput.focus()
      return this.refs.toast.show('请输入标题', 1500)
    }
    if (this.state.content.length < 20) {
      this.contentInput.focus()
      return this.refs.toast.show('请补充问题说明，不低于二十字', 1500)
    }
    const url = 'https://api.91buyin.com/back'
    const data = {
      title: this.state.title,
      content: this.state.content
    }

    console.log('aaa');
    this.refs.modal.open()
    AsyncStorage.getItem(Common.userToken).then((userToken)=>{
      HTTPUtil.post(url, data, userToken).then((json) => {
        try {
          if (json.code === '0') {
            this.refs.modal.close()
            this.refs.toast.show('提交成功', 1500)
          } else {
            this.refs.modal.close()
            this.refs.toast.show(json.msg, 1500)
          }
        } catch (e) {
          this.refs.modal.close()
          this.refs.toast.show('提交失败', 1500)
          console.log(e.name)
        }
      },(connect_error)=>{
        this.refs.modal.close()
        this.refs.toast.show('网络错误', 1500)
        console.log(connect_error.msg);
      });
    })

  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar name='问题反馈' navigator={this.props.navigator}/>
        <View style={[styles.InputView, { height: 40 }]}>
          <TextInput style={styles.titleInput}
            ref={(titleInput)=>{this.titleInput=titleInput;}}
            autoFocus={true}
            clearButtonMode='while-editing'
            maxLength={50}
            onChangeText={ (title) => this.setState({title}) }
            placeholder="请输入标题，不超过五十个字"
          />
        </View>
        <View style={[styles.InputView, { height: 180 }]}>
          <TextInput style={styles.contentInput}
            ref={(contentInput)=>{this.contentInput=contentInput;}}
            clearButtonMode='while-editing'
            multiline={true}
            maxLength={400}
            placeholder="请输入正文，不少于四十个字"
            onChangeText={ (content) => this.setState({content}) }
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submit()}>
          <Text style={styles.buttonText}>提交</Text>
        </TouchableOpacity>
        <LoadingModal ref={'modal'}/>
        <Toast ref="toast" position='center'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#eeeeee',
  },
  InputView: {
    backgroundColor: 'white',
    height: 40,
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#cccccc'
  },
  titleInput: {
    marginHorizontal: 10,
    height:40
  },
  contentInput: {
    marginHorizontal: 10,
    height:180,
    fontSize: 16,
  },
  button: {
    height: 40,
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Common.colors.themeColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default AccountContact
