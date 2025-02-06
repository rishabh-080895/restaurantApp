import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  Pressable,
} from 'react-native';

const OfferRestaurantCard = ({data, openDetails = () => {}}) => {
  const {width} = useWindowDimensions();
  return (
    <Pressable onPress={openDetails}>
      <View
        style={{
          width: 200,
          height: 160,
          marginRight: 16,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={data?.image}
          style={{
            width: 200,
            height: 160,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <View style={[style.card, {width: 200}]}>
            <Text style={style.text}>{data?.spotlight}</Text>
            <Text style={style.subText2} numberOfLines={1}>
              {data?.name}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(26, 23, 23, 0.8)',
    padding: 8,
    borderRadius: 12,
    height: 160,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: {
    color: '#ebbe44',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 1,
  },
  subText: {
    color: '#ffffff',
    fontSize: 12,
    paddingTop: 4,
  },
  subText2: {
    color: '#ffffff',
    fontSize: 10,
    paddingVertical: 6,
    letterSpacing: 1,
  },
  perHead: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 24,
    width: 90,
    backgroundColor: '#c2d119',
    borderBottomRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  perHeadText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
    paddingLeft: 4,
  },
  popular: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#fff',
    width: 60,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
  },
});

export default OfferRestaurantCard;
