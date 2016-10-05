import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

let colors = {
    themeColor: '#4256a6',
    containerBgColor: '#F5FCFF',
    itemColor: '#85b1f2',
    fontCorlor: '',
}

export default {
    window: window,
    colors: colors
}
