import NavBar from '../components/NavBar';
import Common from '../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from '../components/swiper.dist';


import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

const mockData = {
  img: 'http://ssb-oss.oss-cn-hangzhou.aliyuncs.com/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE/ipo-1.jpg',

  img1: require('../imgs/gift_1.png'),
  img2: require('../imgs/gift_2.png'),
}


class AccountInfo extends Component {


  render() {

    return (
      <View style={styles.container}>
        <NavBar name='礼品兑换' navigator={this.props.navigator}/>
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
        <View style={styles.bottom}>
          <View style={styles.stamps}>
            <Text style={styles.stampsLabel}>赛事点券</Text>
            <Text style={styles.stampsText}>1820</Text>
          </View>
          <View style={styles.intro}>
            <Text style={styles.introText}>
            每消费1RMB可累积1赛事点，点劵可兑积分，享积分商城各种免费商品
            </Text>
            <Text style={styles.introText}>
            更多商城礼品，请订阅赛事宝公众号saishibao
            </Text>
          </View>
          <View style={styles.exchange}>
            <TouchableOpacity style={styles.exchangeBtn}>
              <Text style={styles.exchangeBtnText}>
              兑换
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 3,
    marginHorizontal: 20,
  },
  stamps: {
    marginTop: containerHeight / 11,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stampsLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#424242'
  },
  stampsText: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#f24b51'
  },
  intro: {
    marginTop: containerHeight / 22,
    justifyContent: 'space-around'
  },
  introText: {
    fontWeight: '600',
    color: '#bbbbbb',
    marginTop: 15,
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
});

export default AccountInfo
