import AsyncStorage from '@react-native-community/async-storage'
export const Storage = {

    getItem: async function (key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
              // We have data!!
              //console.log('Get : ', value);
              //return value;
            }
          } catch (error) {
            // Error retrieving data
          }
          return await AsyncStorage.getItem(key)
    },
    setItem: async function (key, value) {
        try { 
            await AsyncStorage.setItem(key, value);
        }
        catch (err) {
            console.log(err)
        }
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};