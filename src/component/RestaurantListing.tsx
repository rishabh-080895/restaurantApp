import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {restaurantData} from '../constant/listingData';
import RestaurantCard from './RestaurantCard';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import OfferRestaurantCard from './OfferRestaurantCard';

const RestaurantListing = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const BannerSection = () => {
    const offersRestaurants = restaurantData?.filter(i => i?.popular);
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
              openDetails={() => navigation.navigate('details', {item})}
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
        data={restaurantData}
        renderItem={({item}) => (
          <View style={{left: 16}}>
            <RestaurantCard
              data={item}
              openDetails={() => navigation.navigate('details', {item})}
            />
          </View>
        )}
        ListFooterComponent={<View style={{height: 100}} />}
        ListHeaderComponent={<BannerSection />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <Text>No Restaurant available right now!</Text>
          </View>
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 15,
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
});
export default RestaurantListing;
