import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

let colors = {
    themeColor: '#4256a6',
    containerBgColor: 'white',
    itemColor: '#85b1f2',

}

//保存的token
const token = 'token';
const userToken = 'userToken';

let defaultTab = 'hot';


export default {
    window: window,
    colors: colors,
    token,
    defaultTab,
    userToken,
}
