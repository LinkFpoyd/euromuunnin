import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, Button, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [currencyKeys, setCurrencyKeys] = useState({});
  const [money, setMoney] = useState(0.0);


  useEffect(() => getKeys(), []);

  const getKeys = () => {
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=c9a62d88a123b98324a77f4cffd50150`)
    .then(response => response.json())
    .then(data => setCurrencyKeys(data.rates))
    .catch (error => {
      Alert.alert('Error', error.toString());
    });
  }

  const exchangeMoney = () => {
    const a = Object.values(currencyKeys);
    const b = (amount * a[currency]).toFixed(2);
    setMoney(b);
  }



  return (
    <View style={styles.container}>
      <Text>VALUUTANVAIHTOLASKIN</Text>
      <Text>Anna vaihdettava summa euroissa:</Text>
      <TextInput style={styles.input} type="Number" onChangeText={text => setAmount(text)}
        value={amount}
        placeholder='Vaihdettava rahamäärä'/>
      <Button title="Vaihda" onPress={exchangeMoney} />
      <View style={styles.picker}>
      <Text style={styles.text}>Valuutta johon vaihdetaan:</Text>
        <Picker
          style={{width: 100}} 
          mode='dialog'
          selectedValue={currency}
          onValueChange={(item) =>
            setCurrency(item)
          }>
          {Object.keys(currencyKeys).map((item, index) => {
          return (<Picker.Item label={item} value={index} key={index}/>) 
          })}
        </Picker>
      </View>
      <Text>Arvo valitussa valuutassa: {money}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: 17,
  },
  picker: {
    flexDirection: 'row'
  }
});
