import {StyleSheet, View, Text} from 'react-native';

const Header = () => {
  return (
    <View style={style.header}>
      <Text style={style.text}>Upstox Holding</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    backgroundColor: '#7d017d',
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
export {Header};
