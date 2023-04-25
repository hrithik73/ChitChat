import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { screenName } from '@src/constants/screen';
import { AuthStackType, RootStackType } from '@src/types/navigation';

import Login from '@src/screens/auth/Login';
import SingUp from '@src/screens/auth/SignUp';

import Training from '@src/screens/main/Taining';

import Setting from '@src/screens/main/Setting';
import Chat from '@src/screens/main/Chat';
import Image from '@src/screens/main/home/Image';
import Audio from '@src/screens/main/home/Audio';
import Home from '@src/screens/main/home';
import PromptScreen from '@src/screens/main/home/Prompt';

const Auth = createNativeStackNavigator<AuthStackType>();
const Tab = createBottomTabNavigator<RootStackType>();

const AuthNavigator = () => {
  return (
    <Auth.Navigator>
      <Auth.Screen
        name={screenName.login.name}
        component={Login}
        options={{ headerShown: false }}
      />
      <Auth.Screen
        name={screenName.signUp.name}
        component={SingUp}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Image" component={Image} />
      <HomeStack.Screen name="Audio" component={Audio} />
      <HomeStack.Screen name="Prompt" component={PromptScreen} />
    </HomeStack.Navigator>
  );
};

const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={screenName.home.name}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ ...props }) => <AntDesign name="home" {...props} />,
        }}
      />
      <Tab.Screen
        name={'Chat'}
        component={Chat}
        options={{
          headerTitle: 'Chat',
          tabBarIcon: ({ ...props }) => <AntDesign name="wechat" {...props} />,
        }}
      />
      <Tab.Screen
        name={'Training'}
        component={Training}
        options={{
          headerTitle: 'Training',
          tabBarIcon: ({ ...props }) => <AntDesign name="user" {...props} />,
        }}
      />
      <Tab.Screen
        name={screenName.setting.name}
        component={Setting}
        options={{
          tabBarIcon: ({ ...props }) => <AntDesign name="setting" {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return <>{isLoggedIn ? <HomeNavigator /> : <AuthNavigator />}</>;
};
export default MainNavigator;
