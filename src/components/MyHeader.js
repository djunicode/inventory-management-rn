import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

function HHHeader({title, navigation}) {
  const openMenu = () => {
    navigation.toggledrawer();
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          openMenu();
        }}>
        <Icon name="menu" color="white" size={35} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}
export default HHHeader;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4796BD',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
});
