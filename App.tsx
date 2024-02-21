import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import {Api} from './src/api/api';
import {BASE_URL} from './src/constant';
import {StockData, PortfolioResponse} from './src/type';
import {Header, StockCard, Footer} from './src/component';

function App(): React.JSX.Element {
  const [portfolioData, setPortfolioData] = useState<StockData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchStockPortfolioData = async () => {
    setIsRefreshing(true);
    try {
      const response: PortfolioResponse = await Api(BASE_URL);
      setPortfolioData(response.userHolding);
    } catch (error) {
      console.error('Error fetching stock portfolio data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStockPortfolioData();
  }, []);

  if (isLoading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header />
      <FlatList
        style={{flex: 1}}
        data={portfolioData}
        keyExtractor={(item, index) => `${item.symbol}-${index}`}
        renderItem={({item}) => <StockCard item={item} />}
        refreshing={isRefreshing}
        onRefresh={fetchStockPortfolioData}
      />
      {portfolioData && <Footer userHoldings={portfolioData} />}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maincontainer: {
    flex: 1,
  },
});

export default App;
