import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {restaurantData} from '../constant/listingData';
import RestaurantCard from './RestaurantCard';
import Header from './Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import OfferRestaurantCard from './OfferRestaurantCard';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const RestaurantListing = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [restaurantResponse, setRestaurantResponse] = useState([]);
  const [cart, setCart] = useState({});

  const getCart = async () => {
    try {
      const value = await AsyncStorage.getItem('CART');
      if (value !== null) {
        setCart(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCart();
    }, []),
  );

  useEffect(() => {
    const getRestaurantData = [...restaurantData];
    setRestaurantResponse(getRestaurantData);
  }, []);

  const BannerSection = () => {
    const offersRestaurants = restaurantResponse?.filter(i => i?.popular);
    return (
      <View>
        <Text style={style.spotlight}>Best offers for you</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 16, paddingLeft: 16}}>
          {offersRestaurants?.map(item => (
            <OfferRestaurantCard
              key={`offer_restaurants${item?.name}`}
              data={item}
              openDetails={() =>
                navigation.navigate('details', {restaurantId: item?._id})
              }
            />
          ))}
        </ScrollView>
        <View style={[style.divider, {width: width - 32}]} />
        <Text style={style.spotlight}>Restaurants in Spotlight</Text>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#171616'}}>
      <Header
        rightIconName="search"
        onRightIconPress={() => navigation.navigate('search')}
        title="Restaurants"
      />
      <FlatList
        data={restaurantResponse}
        renderItem={({item}) => (
          <View style={{left: 16}}>
            <RestaurantCard
              data={item}
              openDetails={() =>
                navigation.navigate('details', {restaurantId: item?._id})
              }
            />
          </View>
        )}
        ListFooterComponent={<View style={{height: 160}} />}
        ListHeaderComponent={<BannerSection />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <Text>No Restaurant available right now!</Text>
          </View>
        }
      />
      {cart?.items?.length > 0 ? (
        <View style={[style.cartBottomBar, {width: width - 32}]}>
          <Text style={style.cartText}>
            {cart?.items?.length} {cart?.items?.length > 1 ? 'items' : 'item'}{' '}
            added
          </Text>
          <Pressable
            style={style.cartBtn}
            onPress={() => navigation.navigate('cart', {source: 'home'})}>
            <Text style={style.btnText}>View Cart</Text>
            <Icon
              name="chevron-right"
              size={20}
              color="#c2d119"
              style={{top: 2}}
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotlight: {
    fontSize: 16,
    paddingTop: 20,
    color: '#fff',
    letterSpacing: 2,
    marginHorizontal: 16,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#dadada',
    marginTop: 8,
    marginHorizontal: 16,
  },
  cartBottomBar: {
    height: 60,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
    position: 'absolute',
    left: 16,
    bottom: 80,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  btnText: {
    color: '#c2d119',
    fontSize: 16,
    fontWeight: '500',
    paddingRight: 6,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default RestaurantListing;
