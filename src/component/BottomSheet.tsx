import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

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
  return (
    <View style={styles.slideContainer}>
      <View style={styles.header}>
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#D9534F',
  },
  body: {
    paddingVertical: 16,
  },
});

export {BottomSheet};
