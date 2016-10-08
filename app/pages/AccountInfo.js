import NavBar from '../components/NavBar';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const mockData = {
  img: 'http://ssb-oss.oss-cn-hangzhou.aliyuncs.com/casino/logo/%E4%BA%AC%E6%89%91%E5%85%8B-130.png',

}

class AccountInfo extends Component {
  render() {

    return (
      <View style={styles.container}>
        <NavBar name='俱乐部' navigator={this.props.navigator}/>
        <View style={styles.spaceTop} />
        <View style={styles.infoItems}>
          <View style={[styles.infoItem,styles.headImageItem,styles.withBorderBottom]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                头像
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Image style={styles.headImage} source={{uri:mockData.img}}/>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
          <View style={[styles.infoItem,styles.withBorderBottom]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                昵称
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>
                洛克盼盼
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                真实姓名
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>
                未设置
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
        </View>
        <View style={styles.spaceBetween} />
        <View style={styles.infoItems}>
          <View style={[styles.infoItem,styles.withBorderBottom]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                手机号
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>
                15888888888
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
          <View style={[styles.infoItem,styles.withBorderBottom]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                绑定微信号
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>
                未设置
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
          <View style={[styles.infoItem,styles.withBorderBottom]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                身份证
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>
                未设置
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
          <View style={[styles.infoItem]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                护照号码
              </Text>
            </View>
            <View style={styles.itemValue}>
              <Text style={styles.valueText}>
                未设置
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
        </View>
        <View style={styles.spaceBetween} />
        <View style={styles.infoItems}>
          <View style={[styles.infoItem,styles.withBorderBottom]}>
            <View style={styles.itemLabel}>
              <Text style={styles.labelText}>
                俱乐部 会员卡号
              </Text>
            </View>
            <View style={styles.itemArrow}>
              <Icon color="#e0eaff" size={16} name="chevron-right"/>
            </View>
          </View>
          <View style={[styles.infoItem,styles.noticeItem]}>
            <View style={styles.notice}>
              <Text style={styles.noticeText}>
                报名参加需完善个人信息
              </Text>
              <Text style={styles.noticeText}>
                请真实录入，一经确定，无法修改
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Common.window.height - 64
  },
  spaceTop: {
    height: 10,
    backgroundColor: '#FFFFFF'
  },
  spaceBetween: {
    height: 8,
    backgroundColor: '#F2F2F2'
  },
  withBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0eaff'
  },
  infoItems: {
    paddingHorizontal: 20,
    flex: 1,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headImageItem: {
    flex: 1.4
  },
  headImage: {
    marginTop: -10,
    height: Common.window.height / 11,
    width: Common.window.height / 11,
    resizeMode: Image.resizeMode.contain
  },
  noticeItem: {
    flex: 3
  },
  itemLabel: {
    flex: 4
  },
  itemValue: {
    flex: 6,
    alignItems: 'flex-end',
    marginRight: 20
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242'
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bbbbbb'
  },
  notice: {
    flex: 1,
    paddingVertical: 10,
    marginBottom:10,
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noticeText: {
    margin: 10,
    fontSize: 14,
    fontWeight: '400'
  }
});

export default AccountInfo
