import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const BottomSheet = ({
  currentTotalValue,
  totalInvestmentValue,
  todaysTotalPNL,
  totalPNL,
}: {
  currentTotalValue: number;
  totalInvestmentValue: number;
  todaysTotalPNL: number;
  totalPNL: number;
}) => {
  const [hide, setHide] = useState(false);
  return (
    <View style={styles.slideContainer}>
      {hide && (
        <>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => setHide(!hide)}>
            <Icon
              name="caretdown"
              size={20}
              color="#7d017d"
              style={{marginBottom: 5}}
            />
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.topHeader}>
              <Text style={styles.title}>Current Value: </Text>
              <Text style={styles.value}>₹{currentTotalValue.toFixed(2)}</Text>
            </View>
            <View style={styles.topHeader}>
              <Text style={styles.title}>Total Investment: </Text>
              <Text style={styles.value}>
                ₹{totalInvestmentValue.toFixed(2)}
              </Text>
            </View>
            <View style={styles.topHeader}>
              <Text style={styles.title}>Today's Profit & Loss:</Text>
              <Text style={styles.value}>₹{todaysTotalPNL.toFixed(2)}</Text>
            </View>
          </View>
        </>
      )}

      {!hide && (
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => setHide(!hide)}>
          <Icon
            name="caretup"
            size={20}
            color="#7d017d"
            style={{marginBottom: 5}}
          />
        </TouchableOpacity>
      )}

      <View style={[styles.header, {borderTopWidth: hide ? 1 : 0}]}>
        <Text style={styles.title}>Profit & Loss:</Text>
        <Text style={styles.value}>₹{totalPNL.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 16,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,

    borderTopColor: '#E0E0E0',
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  body: {
    paddingVertical: 16,
  },
});

export {BottomSheet};
