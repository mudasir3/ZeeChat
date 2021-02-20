import AsyncStorage from '@react-native-async-storage/async-storage';

export const _saveToAsync = async (key, value, response) => {
    try {
       await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
  }


export const _getDataAsync = async (key, response) => {
  //console.log('_getDataAsync : ');

    try {
      const value = await AsyncStorage.getItem(key)
     // console.log('_getDataAsync : value ' + value);

      if(value !== null) {
        response(value)
      }else{
        response('Null')
      }
    } catch(e) {
      //console.log('_getDataAsync : err ' + value);

      // error reading value
    }
  }


export const _removeUserDataAsync = async (key) => {
  try {
    return await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }
}
  