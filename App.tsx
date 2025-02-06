import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RestaurantListing from './src/component/RestaurantListing';
import RestaurantDetails from './src/component/RestaurantDetails';
import SearchScreen from './src/component/SearchScreen';
import Cart from './src/component/Cart';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="listing" component={RestaurantListing} />
          <Stack.Screen name="details" component={RestaurantDetails} />
          <Stack.Screen name="search" component={SearchScreen} />
          <Stack.Screen name="cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
