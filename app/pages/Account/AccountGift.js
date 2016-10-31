import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from '../../components/swiper.dist';
import Text from '../../components/Text';


import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';

const mockData = {
  img: 'http://ssb-oss.oss-cn-hangzhou.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE/ipo-1.jpg',

  img1: require('../../imgs/gift_1.png'),
  img2: require('../../imgs/gift_2.png'),
}


class AccountInfo extends Component {


  render() {

    return (
      <View style={styles.container}>
        <NavBar name='点券兑换' navigator={this.props.navigator}/>
        {/*<View style={styles.top}>
          <Image style={styles.image} source={{uri: mockData.img}}/>
        </View>*/}
        <Swiper  height={imageHeight} horizontal={true} autoplay={false}>
          <View  style={styles.slide}>
            <Image style={styles.image} source={mockData.img1} />
          </View>
          <View  style={styles.slide}>
            <Image style={styles.image} source={mockData.img2} />
          </View>
        </Swiper>
        <View style={styles.border} />

        <ScrollView style={styles.bottom}>
          <View style={styles.stamps}>
            <Text style={styles.stampsLabel}>一、赛事点卷介绍</Text>
          </View>
          <View style={styles.intro}>
            <Text style={styles.introText}>
            赛事点劵是赛事宝推出的积分系统，您不仅可以通过注册、邀请好友、报名比赛等多种方式快速获得赛事点劵，还可以随心所欲的使用点劵来兑换超值的扑克礼包和高端的扑克奖品等。
            </Text>
          </View>
          <View style={styles.stamps}>
            <Text style={styles.stampsLabel}>二、赛事点卷作用</Text>
          </View>
          <View style={styles.intro}>
            <Text style={styles.introText}>
              赛事点劵可以在积分商城中兑换高端扑克礼品、导师培训、扑克周边、赛事参赛卷等各种礼品，还可参与抽奖，参与活动等。
            </Text>
          </View>
          <View style={styles.stamps}>
            <Text style={styles.stampsLabel}>三、如何获取</Text>
          </View>
          <View style={styles.intro}>
            <Text style={styles.introText}>
              1、app注册
            </Text>
            <Text style={styles.introText}>
              2、邀请好友注册
            </Text>
            <Text style={styles.introText}>
              3、通过app报名参加赛事
            </Text>
          </View>
          <View style={styles.endView}>
            <Text style={styles.endViewText}>
              敬请期待
            </Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const listPadding = 20;
const imageWidth = Common.window.width-listPadding * 2;
const imageHeight = 179/328 * (Common.window.width-listPadding * 2 );
const containerHeight = Common.window.height - 64;
// const imageHeight = (containerHeight * 2 / 3) + 30;
// const imageWidth = Common.window.width - 30;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Common.colors.containerBgColor,
    height: containerHeight = containerHeight,
  },
  top: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: -10,
    height: imageHeight,
    width: imageWidth,
    resizeMode: Image.resizeMode.contain
  },
  border: {
    height: 1,
    backgroundColor: '#ededed'
  },
  bottom: {
    // flex: 3,
    flex: 1,
    marginHorizontal: 20,
  },
  stamps: {
    // marginTop: containerHeight / 11,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stampsLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#424242'
  },
  stampsText: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#f24b51'
  },
  intro: {
    marginTop: 20,
    justifyContent: 'space-around'
  },
  introText: {
    // fontWeight: '600',
    color: '#787878',
    // marginTop: ,
  },
  exchange: {
    marginTop: containerHeight / 22,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  exchangeBtn: {
    width: Common.window.width / 4.5,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff7043'
  },
  exchangeBtnText: {
    fontSize: 16,
    color: 'white',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    height: imageHeight,
    width: Common.window.width,
    resizeMode: Image.resizeMode.cover
  },
  endView: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  endViewText: {
    color: '#555555',
    fontSize: 15,
    fontWeight: 'bold',
  }
});

export default AccountInfo
