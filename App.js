import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const App = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo({ user: null }); // Remember to remove the user from your app's state as well
      console.log("signoput",userInfo )
    } catch (error) {
      console.error(error);
    }
  };
  const [userInfo, setUserInfo] = useState();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log('signin12', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error)
        
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error)
        // console.log('signin3', userInfo);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        // console.log('signin2', userInfo);
        console.log(error)
      } else {
        // some other error happened
        console.log('signin1', error);
      }
    }
  };
  return (
    <View style={{height: 500, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{padding: 20, borderWidth: 1}}
        onPress={() => {
          signIn();
        }}>
        Signin
      </Text>
      <Text style={{padding: 20, borderWidth: 1}} onPress={() => {
          signOut();
        }}>
        Signout
      </Text>
    </View>
  );
};

export default App;
