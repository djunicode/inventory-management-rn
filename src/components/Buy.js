import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Tab, Tabs, Header, Left, Right, Body, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';

const Buy = ({ navigation }) => {

  const [product, setProduct] = useState([{ name: '', price: 0, amount: 0 }]);

  return (
    <Container style={{ backgroundColor: '#F3F9FB' }}>

      <ScrollView>
        <Body>
          <Text style={styles.heading}>Buy Items</Text>

          {product.map((item, index) => {
            let copy = [...product]
            return (
              <View key={index} style={{ width: Dimensions.get('window').width }}>
                {/* for the separating line */}
                <View style={{ borderColor: '#0004', borderWidth: 1, width: '50%', alignSelf: 'center', borderRadius: 2, marginBottom: -10, marginTop: 5 }} />

                <Text style={styles.product_titles}>Product {product.length == 1 ? '' : index + 1}</Text>
                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Product Name</Label>
                  <Input
                    style={styles.inputArea}
                    onChangeText={(value) => copy[index].name = value}
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>Price</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType='numeric'
                    onChangeText={(value) => copy[index].price = value}
                  />
                </Item>

                <Item floatingLabel style={styles.inputBox}>
                  <Label style={styles.label}>No. of Items</Label>
                  <Input
                    style={styles.inputArea}
                    keyboardType='numeric'
                    onChangeText={(value) => copy[index].amount = value}
                  />
                </Item>
              </View>
            )
          })}

          <TouchableOpacity
            onPress={() => {
              let copy = [...product];
              copy.push({ name: '', price: 0, amount: 0 })
              setProduct(copy)
            }}
            style={styles.addButton}>
            <Icon name="plus" color="#4796BD" size={25} style={styles.icon} />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { 
              console.log(product)
             }}
            style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy</Text>
          </TouchableOpacity>

        </Body>
      </ScrollView>
    </Container>
  );
}


export default Buy;


const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    color: '#122E40',
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'center',
    marginLeft: '5%'
  },
  product_titles: {
    fontSize: 24,
    color: '#122E40',
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%'
  },

  inputBox: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginRight: 28,
    marginLeft: 28,
    textAlign: 'left',
    marginVertical: 10,
    height: 55,
  },

  label: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: '#828282',
  },
  inputArea: {
    paddingLeft: 20,
  },
  buyButton: {
    backgroundColor: '#4796BD',
    margin: 15,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    flexDirection: 'row',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  addButton: {
    borderColor: '#4796BD',
    borderWidth: 2,
    margin: 20,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between'

  },
  addButtonText: {
    color: '#4796BD',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  icon: {
    marginLeft: 4,
    marginRight: 10
  }
});