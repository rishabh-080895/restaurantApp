import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import Header from './Header';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuItem from './MenuItem';
import {isValueNullOrEmpty} from '../../helper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cart = ({route}) => {
  const restaurantId = route?.params?.restaurantId;
  const navigation = useNavigation();
  const [cart, setCart] = useState({});
  const {width} = useWindowDimensions();
  const [showSuccess, setShowSuccess] = useState(false);

  const getCart = async () => {
    try {
      const value = await AsyncStorage.getItem('CART');
      if (value !== null) {
        const parsedCart = JSON.parse(value);
        setCart(parsedCart);
        if (parsedCart?.items?.length) {
          calculateTotal();
        }
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

  const calculateTotal = () => {
    let initialValue = 0;
    const items = cart?.items;
    if (items?.length === 0) return 0;
    for (let i = 0; i < items?.length; i++) {
      const price = items?.[i]?.price;
      initialValue = initialValue + price * items?.[i]?.quantity;
    }
    return initialValue;
  };

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

  const proceedToPay = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      AsyncStorage.removeItem('CART');
      navigation.reset({
        index: 0,
        routes: [{name: 'listing'}],
      });
    }, 3000);
  };

  if (showSuccess) {
    return (
      <View
        style={[
          style.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Icon name="check" size={120} color="#fff" />
        <Text style={[style.text, {letterSpacing: 2}]}>
          Order Placed Successfully!
        </Text>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <Header
        leftIconName="chevron-left"
        onLeftIconPress={() => navigation.goBack()}
        title="Cart"
      />
      <FlatList
        data={cart?.items}
        renderItem={({item}) => (
          <MenuItem
            item={item}
            onAddItem={() => addItemFunction(item)}
            onRemoveItem={() => onRemoveItem(item)}
            key={`menu_item_cart${item?._id}`}
            isCart={true}
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
            <Icon name="shopping-cart" size={60} color="#fff" />
            <Text style={style.text}>Empty Cart!</Text>
            <TouchableOpacity
              style={style.addBtn}
              onPress={() => navigation.goBack()}>
              <Text style={style.btnText}>Explore More</Text>
            </TouchableOpacity>
          </View>
        }
      />
      {calculateTotal() > 0 ? (
        <View style={[style.orderBar, {width: width}]}>
          <View>
            <Text style={style.totalText}>Total Amount</Text>
            <Text style={style.amountText}>${calculateTotal()}</Text>
          </View>
          <View>
            <TouchableOpacity style={style.payBtn} onPress={proceedToPay}>
              <Text style={style.btnText2}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171616',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  btnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  btnText2: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  addBtn: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 30,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  payBtn: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    backgroundColor: '#fff',
  },
  orderBar: {
    height: 60,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    color: '#fff',
    fontSize: 12,
  },
  amountText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default Cart;
