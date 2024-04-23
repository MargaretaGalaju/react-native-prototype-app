import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Button} from 'react-native-paper';

const Product = ({navigation, route}) => {
  const {title, description, images, price} = route.params.product;

  return (
    <View style={styles.container}>
      <Image source={{uri: images[0]}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
      </View>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Product;
