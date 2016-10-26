import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from '../../components/swiper.dist';


import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';



class AccountContact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <NavBar name='关于我们' navigator={this.props.navigator}/>

        <View style={styles.titleArea}>
          {/*<Image style={styles.titleImage} source={require('../../imgs/contact_title.png')}/>
          <Image style={styles.logoImage} source={require('../../imgs/contact_logo.png')}/>*/}
          <Image style={styles.titleImage} source={require('../../imgs/title_logo.png')}/>



        </View>

        <View style={styles.centerArea}>
          <View style={styles.centerRow}>
            <Image style={styles.centerRowImage} source={require('../../imgs/contact_tel.png')}/>
            <Text style={styles.centerRowText}>
              服务热线：010-84532456
            </Text>
          </View>
          <View style={styles.centerRow}>
            <Image style={styles.centerRowImage} source={require('../../imgs/contact_email.png')}/>
            <Text style={styles.centerRowText}>
              商务合作：business@91buyin.com
            </Text>
          </View>
          <View style={styles.centerRow}>
            <Image style={styles.centerRowImage} source={require('../../imgs/contact_wx.png')}/>
            <Text style={styles.centerRowText}>
              微信服务号：saishibao
            </Text>
          </View>

        </View>

        <View style={styles.bottomArea}>
          <View style={styles.bottomRow}>
            <Text>
              Copyright©2015-2016-103
            </Text>

          </View>
          <View style={styles.bottomRow}>
            <Text>
              北京竞技之旅科技有限公司版权所有
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: Common.colors.containerBgColor,
  },
  titleArea: {
    flex: 3,
    alignItems: 'center',

  },
  centerArea: {
    flex: 2,
    // alignItems: 'center',
  },
  centerRow:{
    flexDirection: 'row',
    marginLeft: 30,
    flex: 1,
    alignItems: 'center',
  },
  bottomArea: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  bottomRow: {
    marginTop: 10,
  },
  titleImage: {
    height: 150,
    width: 300,
    resizeMode: Image.resizeMode.contain,

  },
  logoImage: {
    marginTop: -30,
    height: 100,
    width: 150,
    resizeMode: Image.resizeMode.contain,

  },
  centerRowImage: {
    height: 40,
    width: 40,
    resizeMode: Image.resizeMode.contain,

  },
  centerRowText: {
    marginLeft: 20,
    fontSize :15,
    color: '#444444',
  },
  bottomRowText: {
    fontSize :13,
    color: '#424242',

  }

})


export default AccountContact
