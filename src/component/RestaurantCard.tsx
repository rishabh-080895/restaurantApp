import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RestaurantCard = ({data, openDetails = () => {}}) => {
  const {width} = useWindowDimensions();
  return (
    <Pressable onPress={openDetails}>
      <View
        style={{
          width: width - 32,
          height: 280,
          marginTop: 16,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={data?.image}
          style={{
            width: width - 32,
            height: 280,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
          <View style={[style.card, {width: width - 48}]}>
            <Text style={style.text}>{data?.name}</Text>
            <Text style={style.subText2} numberOfLines={1}>
              {data?.description}
            </Text>
            <View style={style.popular}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="map-marker"
                  size={12}
                  color="#fff"
                  style={{paddingRight: 4, top: 2}}
                />
                <Text style={style.subText}>{data?.location}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={[style.subText, {color: 'green', fontWeight: 'bold'}]}>
                  {data?.rating}
                </Text>
                <Icon
                  name="star"
                  size={12}
                  color="green"
                  style={{paddingLeft: 4, top: 2}}
                />
              </View>
            </View>
            {data?.popular && (
              <View style={style.popularBadge}>
                <Text style={style.perHeadText}>Popular</Text>
              </View>
            )}
          </View>
          <View style={style.perHead}>
            <Icon name="user" size={12} color="#000" />
            <Text style={style.perHeadText}>{data?.defaultPerHead}</Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 8,
    marginHorizontal: 8,
    backgroundColor: 'rgba(26, 23, 23, 0.8)',
    padding: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500',
  },
  subText: {
    color: '#ffffff',
    fontSize: 12,
    paddingTop: 4,
  },
  subText2: {
    color: '#ffffff',
    fontSize: 10,
    paddingVertical: 4,
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
    width: 64,
    paddingVertical: 2,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
  },
});

export default RestaurantCard;
