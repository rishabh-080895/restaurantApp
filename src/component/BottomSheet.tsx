import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {IFooter} from '../type';

const InfoRow = ({title, value}: {title: string; value: number}) => (
  <View style={styles.topHeader}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.value}>₹{value.toFixed(2)}</Text>
  </View>
);

const BottomSheet: FC<IFooter> = ({
  currentTotalValue,
  totalInvestmentValue,
  todaysTotalPNL,
  totalPNL,
}) => {
  const [hide, setHide] = useState(false);

  const toggleHide = () => setHide(prevHide => !prevHide);

  return (
    <View style={styles.slideContainer}>
      {hide ? (
        <>
          <TouchableOpacity style={styles.iconContainer} onPress={toggleHide}>
            <Icon name="caretdown" size={20} color="#7d017d" />
          </TouchableOpacity>
          <View style={styles.body}>
            <InfoRow title="Current Value:" value={currentTotalValue} />
            <InfoRow title="Total Investment:" value={totalInvestmentValue} />
            <InfoRow title="Today's Profit & Loss:" value={todaysTotalPNL} />
          </View>
        </>
      ) : (
        <TouchableOpacity style={styles.iconContainer} onPress={toggleHide}>
          <Icon name="caretup" size={20} color="#7d017d" />
        </TouchableOpacity>
      )}
      <View style={[styles.header, {borderTopWidth: hide ? 1 : 0}]}>
        <InfoRow title="Profit & Loss:" value={totalPNL} />
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
    marginVertical: 8,
    flex: 1,
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
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 5,
  },
});

export {BottomSheet};
