import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Switch, Button, Text, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const AddProduct = ({navigation}) => {
  const theme = useTheme();

  const [productData, setProductData] = useState({
    title: '',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    availableInStock: false,
    description: '',
    price: '10',
    images: [],
    showStartDatePicker: false,
    showEndDatePicker: false,
  });

  const handleChange = (name: string, value: any) => {
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // const handleImageUpload = (image = '') => {
  //   setProductData({
  //     ...productData,
  //     images: [...productData?.images, image],
  //   });
  // };

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to backend
    console.log(productData);
    navigation.navigate('Product', {product: productData});
  };

  const showStartDatePicker = () => {
    setProductData({...productData, showStartDatePicker: true});
  };

  const showEndDatePicker = () => {
    setProductData({...productData, showEndDatePicker: true});
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setProductData({
          ...productData,
          images: [...productData.images, imageUri] as unknown as never[],
        });
      }
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setProductData({
          ...productData,
          images: [...productData.images, imageUri] as unknown as never[],
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={productData.title}
        left={<TextInput.Icon icon="pencil" color={'#2a0079'} />}
        onChangeText={text => handleChange('title', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={productData.location}
        left={<TextInput.Icon icon="map-marker" color={'#2a0079'} />}
        onChangeText={text => handleChange('location', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={productData.price}
        left={<TextInput.Icon icon="cash" color={'#2a0079'} />}
        onChangeText={text => handleChange('price', text)}
      />

      <View
        style={[
          styles.inputContainer,
          {backgroundColor: theme.colors.surfaceVariant},
        ]}>
        <Icon
          style={styles.dateIcon}
          name="calendar"
          color={'#2a0079'}
          size={20}
        />
        <Text style={styles.dateLabel}>
          {productData.startDate
            ? productData.startDate.toDateString()
            : 'Start Date'}
        </Text>
        {productData.showStartDatePicker && (
          <DateTimePicker
            testID="startDatePicker"
            value={productData.startDate || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setProductData({
                ...productData,
                startDate: date ? date : productData.startDate,
                showStartDatePicker: false,
              });
            }}
          />
        )}
        <Button onPress={showStartDatePicker}>Select Start Date</Button>
      </View>

      <View
        style={[
          styles.inputContainer,
          styles.switchContainer,
          {backgroundColor: theme.colors.surfaceVariant},
        ]}>
        <Icon
          style={styles.dateIcon}
          name="calendar"
          color={'#2a0079'}
          size={20}
        />
        <Text style={styles.dateLabel}>
          {productData.endDate
            ? productData.endDate.toDateString()
            : 'End Date'}
        </Text>
        {productData.showEndDatePicker && (
          <DateTimePicker
            testID="endDatePicker"
            value={productData.endDate || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
              setProductData({
                ...productData,
                endDate: date ? date : productData.endDate,
                showEndDatePicker: false,
              });
            }}
          />
        )}
        <Button onPress={showEndDatePicker}>Select End Date</Button>
      </View>

      <View
        style={[
          styles.inputContainer,
          styles.switchContainer,
          {backgroundColor: theme.colors.surfaceVariant},
        ]}>
        <Icon
          style={styles.dateIcon}
          name="calendar"
          color={'#2a0079'}
          size={20}
        />
        <Text style={styles.flex1}>Available in Stock</Text>
        <Switch
          value={productData.availableInStock}
          onValueChange={value => handleChange('availableInStock', value)}
        />
      </View>

      <TextInput
        style={styles.multilineInput}
        placeholder="Description"
        multiline
        numberOfLines={4}
        value={productData.description}
        onChangeText={text => handleChange('description', text)}
      />

      <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
        <Button style={styles.flex1} mode="outlined" onPress={openImagePicker}>
          Choose
        </Button>
        <View style={{width: 10}}></View>
        <Button
          style={styles.flex1}
          mode="outlined"
          onPress={handleCameraLaunch}>
          Open Camera
        </Button>
      </View>

      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  // Date
  flex1: {
    flex: 1,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingLeft: 18,
    borderBottomColor: '#8e8c8c',
    padding: 5,
  },
  dateIcon: {
    marginRight: 20,
  },
  dateLabel: {
    flex: 1,
    fontSize: 16,
    color: '#404040',
  },

  // Page
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  multilineInput: {
    height: 80,
    marginBottom: 10,
  },
});

export default AddProduct;
