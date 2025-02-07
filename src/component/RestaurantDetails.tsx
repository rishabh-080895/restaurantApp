import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Pressable,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {menuItems, restaurantData} from '../constant/listingData';
import MenuItem from './MenuItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {isValueNullOrEmpty} from '../../helper';

const RestaurantDetails = ({route}) => {
  const restaurantId = route?.params?.restaurantId;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [cart, setCart] = useState({});
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getRestaurantDetails = restaurantData?.find(
      i => i?._id === restaurantId,
    );
    setDetails(getRestaurantDetails);
  }, []);

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

  const addItemFunction = async item => {
    const itemId = item?._id;
    let cartObj = {};
    if (isValueNullOrEmpty(cart?.restaurantId)) {
      const finalItem = {...item, quantity: 1};
      cartObj = {
        restaurantId,
        items: [finalItem],
      };
      AsyncStorage.setItem('CART', JSON.stringify(cartObj), () => {
        setCart(cartObj);
      });
    } else {
      cartObj = {...cart};
      if (cartObj?.restaurantId === restaurantId) {
        const checkItemExist = cartObj?.items?.find(i => i?._id === itemId);
        if (checkItemExist) {
          const filteredItems = cartObj?.items?.filter(i => i?._id !== itemId);
          const existingItem = {...checkItemExist};
          existingItem.quantity += 1;

          cartObj.items = [...filteredItems];
          cartObj.items.push(existingItem);

          AsyncStorage.setItem('CART', JSON.stringify(cartObj), () => {
            setCart(cartObj);
          });
        } else {
          const CurItem = {...item, quantity: 1};
          cartObj.items.push(CurItem);
          AsyncStorage.setItem('CART', JSON.stringify(cartObj), () => {
            setCart(cartObj);
          });
        }
      } else {
        Alert.alert(
          'Are you sure',
          'You want to clear current cart and add new restaurant items?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Add',
              onPress: () => {
                AsyncStorage.removeItem('CART');
                setTimeout(() => {
                  const finalItem = {...item, quantity: 1};
                  cartObj = {
                    restaurantId,
                    items: [finalItem],
                  };
                  AsyncStorage.setItem('CART', JSON.stringify(cartObj), () => {
                    setCart(cartObj);
                  });
                }, 500);
              },
            },
          ],
        );
      }
    }
  };

  const onRemoveItem = async item => {
    const itemId = item?._id;
    let cartObj = {};
    cartObj = {...cart};
    if (cartObj?.restaurantId === restaurantId) {
      const checkItemExist = cartObj?.items?.find(i => i?._id === itemId);
      if (checkItemExist) {
        const filteredItems = cartObj?.items?.filter(i => i?._id !== itemId);
        const existingItem = {...checkItemExist};
        existingItem.quantity -= 1;

        cartObj.items = [...filteredItems];
        if (existingItem?.quantity > 0) {
          cartObj.items.push(existingItem);
        }

        AsyncStorage.setItem('CART', JSON.stringify(cartObj), () => {
          setCart(cartObj);
        });
      }
    }
  };

  const checkAddedQuantity = menuId => {
    let res = 0;
    const restaurantId = details?._id;
    let cartObj = {...cart};
    if (cartObj?.restaurantId === restaurantId) {
      const curObj = cartObj?.items?.find(i => i?._id === menuId);
      if (curObj?.quantity) {
        res = curObj?.quantity;
      }
    }
    return res;
  };

  return (
    <View style={style.header}>
      <Pressable
        style={{position: 'absolute', top: 0, zIndex: 99, left: 0}}
        onPress={() => navigation.goBack()}>
        <View style={style.backContainer}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </View>
      </Pressable>
      {cart && cart?.restaurantId === details?._id && cart?.items?.length ? (
        <Pressable
          style={{position: 'absolute', top: 0, zIndex: 98, right: 0}}
          onPress={() =>
            navigation.navigate('cart', {restaurantId: details?._id})
          }>
          <View style={style.cartContainer}>
            <Icon name="shopping-cart" size={20} color="#fff" />
            <View
              style={{
                height: 16,
                width: 16,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orange',
                position: 'absolute',
                right: 0,
                top: 0,
              }}>
              <Text style={style.carttext}>{cart?.items?.length}</Text>
            </View>
          </View>
        </Pressable>
      ) : null}
      <ScrollView>
        <ImageBackground
          source={details?.image}
          style={{
            width: width,
            height: 300,
            overflow: 'hidden',
          }}>
          <View style={style.ratingBox}>
            <View style={style.eachBox}>
              <Text
                style={[style.subText, {color: '#fff', fontWeight: 'bold'}]}>
                {details?.rating}
              </Text>
              <Icon
                name="star"
                size={12}
                color="#fff"
                style={{paddingLeft: 2, top: 2}}
              />
            </View>
            <View style={style.bottomBox}>
              <Text style={[style.subText2, {fontWeight: '500', fontSize: 12}]}>
                {details?.reviews}
              </Text>
              <Text style={style.subText2}>Reviews</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={style.content}>
          <Text style={style.text}>{details?.name}</Text>
          <Text style={style.subText}>{details?.description}</Text>
        </View>
        <View style={[style.content, {paddingBottom: 60}]}>
          <Text style={style.textMenu}>Menu</Text>
          {menuItems.map(item => (
            <MenuItem
              item={item}
              onAddItem={() => addItemFunction(item)}
              onRemoveItem={() => onRemoveItem(item)}
              quantity={checkAddedQuantity(item?._id)}
              key={`menu_items${item?._id}`}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#171616',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  textMenu: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 2,
  },
  backContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subText: {
    color: '#ffffff',
    fontSize: 12,
    paddingTop: 4,
    lineHeight: 20,
    letterSpacing: 1,
  },
  carttext: {
    color: '#000',
    fontSize: 12,
  },
  ratingBox: {
    width: 60,
    height: 68,
    backgroundColor: '#0c4703',
    borderRadius: 12,
    position: 'absolute',
    bottom: 16,
    right: 16,
    overflow: 'hidden',
  },
  eachBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subText2: {
    color: '#ffffff',
    fontSize: 10,
  },
  bottomBox: {
    backgroundColor: '#000',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RestaurantDetails;
