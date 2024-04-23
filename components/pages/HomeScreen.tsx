import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {Chip} from 'react-native-paper';
// import {renderItem} from './components/ProductItem';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showChips, setShowChips] = useState(false);
  const openProduct = item => {
    navigation.navigate('Product', {product: item});
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));

    fetch('https://dummyjson.com/products/categories')
      .then(response => response.json())
      .then(categoriesResult => {
        console.log('t');

        setCategories(
          categoriesResult.map((category: string) => ({
            title: category,
            selected: false,
          })),
        );
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const toggleChipsVisibility = () => {
    setShowChips(!showChips);
  };

  const onFilterSelect = () => {};

  const renderChip = (
    category: {title: string; selected: boolean},
    index: number,
  ) => (
    <Chip
      key={index}
      style={styles.chip}
      selected={category.selected}
      onPress={() => onFilterSelect(category.title)}>
      {category.title}
    </Chip>
  );

  return (
    <View style={styles.centered}>
      {showChips && (
        <View style={styles.chips}>{categories.map(renderChip)}</View>
      )}

      {!showChips && (
        <View style={styles.chips}>
          {categories.slice(0, 3).map(renderChip)}
        </View>
      )}

      <TouchableOpacity onPress={toggleChipsVisibility}>
        <Text style={styles.toggleButtonText}>
          {showChips ? 'Hide Chips' : 'Show Chips'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        numColumns={2}
        renderItem={({item, index, separators}) => {
          console.log(item);

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
            <TouchableOpacity onPress={() => openProduct(item)}>
              <View style={styles.productContainer}>
                <View style={styles.leftProductContainer}>
                  <View style={{alignItems: 'center', width: 40}}>
                    <Icon
                      name={itemIcon.icon}
                      color={itemIcon.color}
                      size={25}></Icon>
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
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
    // padding: 30,
  },
  chips: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggleButtonText: {
    textAlign: 'center',
    marginBottom: 5,
    color: '#007AFF',
  },
  chip: {
    marginRight: 5,
    marginBottom: 5,
  },
  productBackgroundContainer: {
    backgroundColor: '#dedcce',
    flex: 1,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlign: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f2f2',
    borderRadius: 10,
    margin: 5,
    flex: 1,
    padding: 10,
    minWidth: '47%',
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
