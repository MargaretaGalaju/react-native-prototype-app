import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const renderItem = ({
  item,
}: {
  item: {id: string; rating: number; title: string; price: string};
}) => {
  let itemIcon =
    item.rating >= 4.5
      ? {
          color: 'green',
          icon: 'smile-o',
        }
      : item.rating <= 4.3
      ? {
          icon: 'frown-o',
          color: 'red',
        }
      : {
          icon: 'meh-o',
          color: '#bfaa09',
        };

  return (
    <View style={styles.productContainer}>
      <View style={styles.leftProductContainer}>
        <View style={{alignItems: 'center', width: 40}}>
          <Icon name={itemIcon.icon} color={itemIcon.color} size={25}></Icon>
        </View>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={11}></Icon>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.priceText}>Price: ${item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f2f2',
    borderRadius: 10,
    margin: 5,
    flex: 0.5,
    padding: 10,
  },
  leftProductContainer: {
    flexDirection: 'column',
    width: 45,
    textAlign: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    overflow: 'hidden',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignContent: 'flex-start',
    flex: 1,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 11,
  },
  priceText: {
    fontSize: 13,
    color: 'green',
  },
});
