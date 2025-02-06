import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const AddButton = ({
  onAddItem = () => {},
  onRemoveItem = () => {},
  quantity = 0,
}) => {
  if (quantity === 0) {
    return (
      <TouchableOpacity style={style.addBtn} onPress={onAddItem}>
        <Text style={style.btnText}>{'ADD'}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={style.zeroBtn}>
      <TouchableOpacity style={style.subsBtn} onPress={onRemoveItem}>
        <Text style={style.btnText1}>{'-'}</Text>
      </TouchableOpacity>
      <Text style={style.btnText2}>{quantity}</Text>
      <TouchableOpacity style={style.subsBtn} onPress={onAddItem}>
        <Text style={style.btnText1}>{'+'}</Text>
      </TouchableOpacity>
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
  },
  zeroBtn: {
    height: 30,
    width: 90,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addBtn: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  btnText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  btnText1: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    top: -2,
    left: -2,
  },
  btnText2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    left: -2,
    top: 4,
  },
  subsBtn: {
    height: '100%',
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddButton;
