import React from 'react';

import {StyleSheet} from 'react-native';
import {BottomSheet} from './BottomSheet';

import {StockData} from '../type';

interface FooterProps {
  userHoldings: StockData[];
}

const Footer = ({userHoldings}: FooterProps) => {
  const currentValues = userHoldings?.map(
    holding => holding.ltp * holding.quantity,
  );
  const investmentValues = userHoldings?.map(
    holding => holding.avgPrice * holding.quantity,
  );
  const todaysPNLs = userHoldings?.map(
    holding => (holding.close - holding.ltp) * holding.quantity,
  );

  const currentTotalValue = currentValues?.reduce(
    (acc, value) => acc + value,
    0,
  );
  const totalInvestmentValue = investmentValues?.reduce(
    (acc, value) => acc + value,
    0,
  );

  const totalPNL = currentTotalValue - totalInvestmentValue;
  const todaysTotalPNL = todaysPNLs?.reduce((acc, pnl) => acc + pnl, 0);

  return (
    <BottomSheet
      currentTotalValue={currentTotalValue}
      totalInvestmentValue={totalInvestmentValue}
      todaysTotalPNL={todaysTotalPNL}
      totalPNL={totalPNL}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'red',
    opacity: 0.6,
    width: 500,
  },
});

export {Footer};
