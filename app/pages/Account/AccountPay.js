import NavBar from '../../components/NavBar';
import Common from '../../common/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast';

import * as ActionCreator from '../../actions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


class AccountPay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payNum: 1,
      payUnitPrice: 0,
      isDailyMatch: false,
      titleOne: '',
      titleTwo: '',
      match_id: 0,

    }
  }

  componentWillMount() {

    const { casino, matchItem, isDailyMatch, hotMatch }= this.props;

    console.log(matchItem);


    this.setState({
      payUnitPrice: matchItem.unit_price,
      isDailyMatch: isDailyMatch,
      match_id: matchItem.bigMatch_id || matchItem.dailyMatch_id,
    });

    // console.log(matchItem.isDailyMatch);
    if (isDailyMatch) {
      this.setState({
        titleOne: casino.casino,
        titleTwo: matchItem.dailyMatchSerie.name,
      })
    }
    else {
      this.setState({
        titleOne: hotMatch.name,
        titleTwo: matchItem.name,
      })
    }


  }

  _onPressNumCtrl(isAdd) {
    if (isAdd) {
      this.setState({
        payNum: this.state.payNum + 1,
      });
    }
    else {
      if (this.state.payNum > 1) {
        this.setState({
          payNum: this.state.payNum - 1,
        });
      }

    }
  }
  _renderTitle() {
    const { casino, matchItem}= this.props;

    return (
      <View style={styles.titleArea}>
      <View style={styles.infoRow}>
        <Text style={styles.casinoText}>
          {this.state.titleOne}
        </Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.matchNameText}>
          {this.state.titleTwo}
        </Text>
      </View>

      </View>);
  }

  _renderPayCtrlArea() {

  }

  _renderPayCtrlRow() {
    return (
      <View>
      <View style={styles.payNumCtrlRow}>
        <View style={styles.payNumBlock_left} >
          <TouchableOpacity style={styles.payNumTouch}
            onPress={() => this._onPressNumCtrl(false)}>
            <Text style={styles.payNumSymboText}>
              -
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.payNum}>
          <Text style={styles.payNumSymboText}>
            {this.state.payNum}
          </Text>
        </View>
        <View style={styles.payNumBlock_right} >
          <TouchableOpacity style={styles.payNumTouch}
            onPress={() => this._onPressNumCtrl(true)}>
            <Text style={styles.payNumSymboText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.payNumRow}>
        <Text style={styles.moneyText} >
          ￥{parseInt(this.state.payNum) * parseFloat(this.state.payUnitPrice)}
        </Text>
      </View>



      </View>

    );
  }

  _renderPayType() {
    return (
      <View style={styles.payStyleArea}>
        <View style={styles.payStyleRow}>

          <Text style={styles.payStyleText}>
            付款方式
          </Text>

        </View>
        <View style={styles.payStyle}>
        <Image style={styles.payImage} source={require('../../imgs/pay_wx.png')}/>

        </View>
      </View>
    );

  }

  _fetchSuccess() {

  }

  _fetchFailed(msg) {
    this.refs.toast.show(msg);
  }


  _onPayBtn() {
    console.log('payNum ' + this.state.payNum);
    console.log('payUnitPrice ' + this.state.payUnitPrice);
    console.log('isDailyMatch ' + this.state.isDailyMatch);
    console.log('match_id ' + this.state.match_id);

    this.props.actions.fetchUserAddOrder(this.state.isDailyMatch, this.state.match_id, this.state.payNum, ()=>this._fetchSuccess(), (msg)=>this._fetchFailed(msg));



  }

  _renderPayBtn() {
    return (
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.payBtn} onPress={()=>this._onPayBtn()}>
         <Text style={styles.payBtnText}>
            购票
         </Text>
        </TouchableOpacity>
      </View>

    );

  }

  render() {



    // console.log(casino);
    return (
      <View style={styles.container}>
      <NavBar name='参加赛事' navigator={this.props.navigator}  />

       <Image style={styles.infoArea}  source={require('../../imgs/account_payBk.png')}>
        {this._renderTitle()}
        <View style={styles.payCtrlArea}>
          <View style={styles.paySubArea}>
            {this._renderPayCtrlRow()}
          </View>
          <View style={styles.paySubArea}>
            {this._renderPayType()}
          </View>
        </View>
       </Image>
       {this._renderPayBtn()}
       <Toast ref="toast" position='center'/>
      </View>

    );
  }
}


const marginSize = 20;
const circleDiameter = (Common.window.width - marginSize * 2 ) * 2 - 2 ;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Common.colors.containerBgColor,
  },
  // infoBackGround: {
  //   bottom: 50,
  //   left: marginSize - (circleDiameter / 2 / 2)   - marginSize ,
  //   backgroundColor: '#e0eaff',
  //   width: circleDiameter,
  //   height: circleDiameter,
  //   borderRadius: circleDiameter / 2 ,
  //   position: 'absolute',
  //   zIndex: -1,
  // },
  infoArea: {
    // marginTop: 20,
    flex: 5,
    // borderWidth: 2,
    // borderColor: '#e0eaff',
    resizeMode: Image.resizeMode.contain,
    // borderRadius: 8,
    width: Common.window.width,
    height: 1,
    paddingTop: 40,
    paddingBottom: 68,
  },
  btnArea: {
    flex: 1,
    marginHorizontal: marginSize,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  payBtn: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ff875c',
    width: Common.window.width - marginSize*2,


  },
  payBtnText: {
    color: '#f7f5f7',
    fontSize: 15,
    fontWeight: 'bold',
  },
  infoDetailArea1: {
    flex: 4,
    // borderWidth: 1,
  },
  payStyleArea: {
    // borderTopWidth: 2,
    borderColor: '#e0eaff',
    marginHorizontal: 30,
    flex: 1.3,
  },

  infoRow: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,

  },
  infoImageRow: {
    flex: 2.5,
    alignItems: 'center',
  },
  titleImage: {

    height: 80,
    width: 80,
    resizeMode: Image.resizeMode.contain,

  },
  casinoText: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchNameText: {
    color: '#424242',
    fontSize: 15,
    fontWeight: 'bold',
  },
  commonText: {
    color: '#787878',
    fontSize: 15,
  },
  infoSubArea: {
    flex:1,
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  payNumCtrlRow: {
    flex: 4,
    // margin: 10,

    alignItems: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
  },
  payNumRow: {
    // flex: 1,
    // borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  payNum: {
    marginTop: 10,
    flex: 0.4,
    // width: 10,
    height: 60,
    // backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e0eaff',
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNumBlock_left: {
    flex: 1,
    alignItems: 'flex-end',
  },
  payNumBlock_right: {
    flex: 1,
  },
  payNumSymboText: {
    fontSize: 34,
    color: '#101010',
  },
  moneyText: {
    fontSize: 19,
    color: '#f24b51',
    fontWeight: 'bold',
  },
  payStyleRow: {
    marginTop: 10,
    alignItems: 'center',
  },
  payStyleText: {
    color: '#787878',
    fontSize: 15,
  },
  payStyle: {
    flex: 1,
    // borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  payImage: {
    height: 60,
    width: 60,
  },
  payNumTouch: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleArea: {
    flex: 1,
    // borderWidth: 1,
  },
  payCtrlArea: {
    flex: 1.9,
    // borderWidth: 1,
    borderColor: 'red',

  },
  paySubArea: {
    flex:1,
    // borderWidth: 1,
  }

})
const mapStateToProps = (state) => ({
  UserLogin: state.User.UserLogin,
  Pay: state.Account.Pay,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPay)
