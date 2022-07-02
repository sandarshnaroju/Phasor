// import MMKVStorage from 'react-native-mmkv-storage';
// const storage = new MMKVStorage.Loader()
//   .withInstanceID('simpleTube')
//   .initialize();

// export const storeSubscriptions = async updatedSubsArray => {
//   //return await storage.setStringAsync('subscriptions', updatedSubsArray);
//   return [];
// };
// export const readSubscription = async () => {
//   //return await storage.getStringAsync('subscriptions');
//   return [];
// };
import AsyncStorage from '@react-native-async-storage/async-storage';
export const storeSubscriptions = async updatedSubsArray => {
  try {
    await AsyncStorage.setItem('subscriptions', updatedSubsArray);
    return Promise.resolve(true);
  } catch (e) {
    // saving error
    return Promise.reject(e);
  }
};
export const readSubscription = async () => {
  try {
    const value = await AsyncStorage.getItem('subscriptions');
    if (value !== null) {
      return Promise.resolve(value);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const storeIsNight = async isNight => {
  try {
    await AsyncStorage.setItem('isNight', isNight);
    return Promise.resolve(true);
  } catch (e) {
    // saving error
    return Promise.reject(e);
  }
};
export const getIsNight = async () => {
  try {
    const value = await AsyncStorage.getItem('isNight');
    if (value !== null) {
      return Promise.resolve(value);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
export const storeVidSource = async source => {
  try {
    await AsyncStorage.setItem('serversource', source);
    return Promise.resolve(true);
  } catch (e) {
    // saving error
    return Promise.reject(e);
  }
};
export const getVidSource = async () => {
  try {
    const value = await AsyncStorage.getItem('serversource');
    if (value !== null) {
      return Promise.resolve(value);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const storeVidResolution = async resolution => {
  try {
    await AsyncStorage.setItem('vidResolution', resolution);
    return Promise.resolve(true);
  } catch (e) {
    // saving error
    return Promise.reject(e);
  }
};

export const getVidResolution = async () => {
  try {
    const value = await AsyncStorage.getItem('vidResolution');
    if (value !== null) {
      return Promise.resolve(value);
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
