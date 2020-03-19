import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Content, Tab, Tabs, Header, Left, Right, Body, Item, Input, Label } from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

const Buy = ({ navigation }) => {
  return (
    <Container style={{ backgroundColor: '#F3F9FB' }}>
      <Content>
        <Body>
          <Text style={styles.heading}>Sell Items</Text>

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Product Name</Label>
            <Input
              style={styles.inputArea}
            />
          </Item>

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>Price</Label>
            <Input
              style={styles.inputArea}
              keyboardType='numeric'
            />
          </Item>

          <Item floatingLabel style={styles.inputBox}>
            <Label style={styles.label}>No. of Items</Label>
            <Input
              style={styles.inputArea}
              keyboardType='numeric'
            />
          </Item>

          <TouchableOpacity
            style={styles.addButton}>
            <Icon name="plus" color="#4796BD" size={25} style={styles.icon} />
            <Text style={styles.addButtonText}>Add Product</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sellButton}>
            <Text style={styles.sellButtonText}>Sell</Text>
          </TouchableOpacity>

        </Body>
      </Content>
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

    color: '#828282',
  },
  inputArea: {
    paddingLeft: 20,
  },
  sellButton: {
    backgroundColor: '#4796BD',
    margin: 15,
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    flexDirection: 'row',
  },
  sellButtonText: {
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