import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {menuFilterEnums} from '../../helper';
import AddButton from './AddButton';

const MenuItem = ({
  item,
  onAddItem = () => {},
  isCart = false,
  onRemoveItem = () => {},
  quantity = 0,
}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[style.itemBox, {width: width - 32}]}>
      <View style={{paddingTop: 4}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 2,
              borderWidth: 0.5,
              borderColor: item?.type === menuFilterEnums.veg ? 'green' : 'red',
              justifyContent: 'center',
              alignItems: 'center',
              top: 2,
              marginRight: 6,
            }}>
            <View
              style={{
                height: 6,
                width: 6,
                borderRadius: 6,
                backgroundColor:
                  item?.type === menuFilterEnums.veg ? 'green' : 'red',
              }}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={style.textMenu}>{item?.name}</Text>
          </View>
        </View>
        <Text style={style.textMenu1}>${item?.price}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="star"
            size={12}
            color="green"
            style={{paddingRight: 4, top: 2}}
          />
          <Text style={style.subText}>
            {item?.rating}
            <Text style={style.subText}>{` (${item?.orders})`}</Text>
          </Text>
        </View>
        <AddButton
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
          quantity={quantity > 0 ? quantity : item?.quantity}
        />
      </View>
      <View style={{paddingTop: 8}}>
        <Image
          source={item?.image}
          style={{
            width: 104,
            height: 104,
            borderRadius: 8,
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  itemBox: {
    height: 120,
    marginTop: 16,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textMenu: {
    color: '#ffffff',
    fontSize: 16,
    paddingTop: 4,
    lineHeight: 20,
    letterSpacing: 1,
  },
  textMenu1: {
    color: '#ffffff',
    fontSize: 14,
    paddingTop: 4,
    lineHeight: 20,
    letterSpacing: 1,
  },
  subText: {
    color: 'green',
    fontSize: 12,
    paddingTop: 4,
    fontWeight: '500',
  },
  textMenu2: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MenuItem;
