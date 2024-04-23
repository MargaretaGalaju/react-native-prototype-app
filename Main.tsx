import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from './components/pages/HomeScreen';
import {BaseLayout} from './components/pages/components/BaseLayout';
import {AddProduct} from './components/pages/AddProduct';
import Product from './components/pages/components/Product';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Home = ({navigation}) => (
  <BaseLayout>
    <HomeScreen navigation={navigation} />
  </BaseLayout>
);

const Add = ({navigation}) => (
  <BaseLayout>
    <AddProduct navigation={navigation} />
  </BaseLayout>
);

const Updates = () => (
  <BaseLayout>
    <Text>Updates</Text>
  </BaseLayout>
);

const Profile = () => (
  <BaseLayout>
    <Text>Profile</Text>
  </BaseLayout>
);

const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2a0079',
  },
};

const Home1 = ({navigation}) => {
  return (
    <PaperProvider>
      <View style={styles.appContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: '#dedcce',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: -5},
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 5,
            },
            headerStyle: {
              backgroundColor: '#dedcce',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Add Product"
            component={Add}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="plus" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Updates"
            component={Updates}
            options={{
              tabBarLabel: 'Updates',
              tabBarIcon: ({color, size}) => (
                <Icon name="bell" color={color} size={size} />
              ),
              tabBarBadge: 3,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({color, size}) => (
                <Icon name="user" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home1"
          component={Home1}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
