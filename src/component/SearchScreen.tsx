import {StyleSheet, View, Text, TextInput, FlatList} from 'react-native';
import Header from './Header';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import RestaurantCard from './RestaurantCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {restaurantData} from '../constant/listingData';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue?.length > 2) {
      const searchVal = searchValue.toLowerCase();
      const newObj = restaurantData.filter(i =>
        i?.name.toLowerCase().includes(searchVal),
      );
      setSearchList(newObj);
    } else {
      setSearchList([]);
    }
  }, [searchValue]);

  return (
    <View style={style.container}>
      <Header
        leftIconName="chevron-left"
        onLeftIconPress={() => navigation.goBack()}
        title="Search"
      />
      <TextInput
        style={style.input}
        onChangeText={setSearchValue}
        value={searchValue}
        placeholder="Starbucks..."
      />
      {searchValue?.length > 2 ? (
        <FlatList
          data={searchList}
          renderItem={({item}) => (
            <RestaurantCard
              data={item}
              openDetails={() =>
                navigation.navigate('details', {restaurantId: item?._id})
              }
            />
          )}
          contentContainerStyle={{paddingHorizontal: 16}}
          ListFooterComponent={<View style={{height: 100}} />}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 80,
              }}>
              <Icon name="remove" size={40} color="#fff" />
              <Text style={style.text}>No restaurant found!</Text>
            </View>
          }
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 80,
          }}>
          <Icon name="search" size={40} color="#fff" />
          <Text style={style.text}>Search restaurants...</Text>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171616',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    paddingTop: 16,
  },
  input: {
    height: 40,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: '#fff',
    color: '#fff',
  },
});

export default SearchScreen;
