import {StyleSheet, View, Text, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({
  leftIconName = '',
  onLeftIconPress = () => {},
  onRightIconPress = () => {},
  rightIconName = '',
  title = 'Most Expensive Restaurants',
}) => {
  return (
    <View style={style.header}>
      {leftIconName ? (
        <Pressable onPress={onLeftIconPress}>
          <Icon name={leftIconName} size={20} color="#fff" />
        </Pressable>
      ) : (
        <View />
      )}
      <Text style={style.text} numberOfLines={1}>
        {title}
      </Text>
      {rightIconName ? (
        <Pressable onPress={onRightIconPress}>
          <Icon name={rightIconName} size={20} color="#fff" />
        </Pressable>
      ) : (
        <View />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    backgroundColor: 'rgba(23, 22, 22, 0.8)',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
export default Header;
