import React from 'react';
import { StyleSheet, View } from 'react-native';

export const BaseLayout = ({ children }) => {
  return (
    <View style={styles.productBackgroundContainer}>
      <View style={styles.container}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});
