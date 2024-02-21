import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {StockData} from '../type';

interface StockCardProps {
  item: StockData;
}

const StockCard: React.FC<StockCardProps> = ({item}) => {
  const currentValue = item.ltp * item.quantity;
  const investmentValue = item.avgPrice * item.quantity;
  const pnl = currentValue - investmentValue;
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.symbol}>{item.symbol}</Text>
        <Text style={styles.quantity}>{item.quantity}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.ltp}>LTP: ₹{item.ltp.toFixed(2)}</Text>
        <Text style={styles.pnl}>P/L: ₹{pnl.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  left: {flex: 1, alignItems: 'flex-start'},
  right: {flex: 1, alignItems: 'flex-end'},
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: '300',
  },
  details: {
    alignItems: 'flex-end',
  },
  ltp: {
    fontSize: 16,
    marginBottom: 4,
  },
  pnl: {
    fontSize: 16,
    marginTop: 10,
  },
});

export {StockCard};
