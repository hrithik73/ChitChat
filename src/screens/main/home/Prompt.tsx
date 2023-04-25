import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SelectDropdown from 'react-native-select-dropdown';

import Input from '@src/components/Input';
import useTheme from '@src/hooks/useTheme';

import { queryClient } from '../../../../App';
import api from '@src/config/api';
import { BodyData } from '@src/types';
import { Button } from 'react-native-paper';

const PromptScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme.colors);
  const [isFocus, setIsFocus] = useState(false);

  const [selectedModel, setSelectedModel] =
    useState<string>('text-davinci-003');

  const { control, handleSubmit } = useForm();

  const completions = useMutation(
    (data: BodyData) => {
      return api.post('/completions', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('completion');
      },
    },
  );

  const models = useQuery('models', () => {
    return api.get('/models');
  });

  // console.log('Models', models.data?.data);
  console.log('Message------>', completions.data?.data.choices[0].text);
  // console.log('data', completions.data?.data.choices[0].text);

  const onSubmitHandler = async (data: any) => {
    console.log(data.promt);
    let bodyData = {
      model: selectedModel,
      prompt: data.promt,
      max_tokens: 50,
      temperature: parseFloat(data.temp),
      // model: 'gpt-3.5-turbo',
      // messages: [{ role: 'user', content: 'Hello world' }],
    };

    // console.log(typeof parseFloat(data.temp));
    console.log({ bodyData });
    completions.mutate(bodyData);
  };
  // console.log('Model--->', models.data?.data);

  return (
    <View style={styles.container}>
      <Input
        mode="outlined"
        name="promt"
        multiline
        placeholder="Prompts"
        control={control}
      />
      <Input
        mode="outlined"
        name="temp"
        keyboardType="number-pad"
        placeholder="Temperature"
        control={control}
      />
      <SelectDropdown
        data={models.data?.data?.data}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          setSelectedModel(selectedItem.id);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.id;
        }}
        rowTextForSelection={(item, index) => {
          return item.id;
        }}
        buttonStyle={styles.dropdown4BtnStyle}
        buttonTextStyle={styles.dropdown4BtnTxtStyle}
        renderDropdownIcon={isOpened => {
          return (
            <AntDesign
              name={isOpened ? 'up' : 'down'}
              color={'#444'}
              size={18}
            />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={styles.dropdown4DropdownStyle}
        rowStyle={styles.dropdown4RowStyle}
        rowTextStyle={styles.dropdown4RowTxtStyle}
      />

      <Button
        loading={completions.isLoading}
        onPress={handleSubmit(onSubmitHandler)}>
        Submit
      </Button>
      <ScrollView style={{ padding: 20 }}>
        {/* <Text>{completions.data?.data?.choices[0].message.content}</Text> */}
        <Text>{completions.data?.data.choices[0].text}</Text>
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    heading: {
      color: colors.text,
      fontSize: 22,
      fontWeight: 'bold',
    },
    subheading: {
      color: colors.text,
      fontSize: 16,
      marginVertical: 15,
    },
    linkText: {
      color: 'blue',
    },
    linkContainer: {},

    dropdownsRow: {
      flexDirection: 'row',
      width: '100%',
      paddingHorizontal: '5%',
    },

    dropdown: {
      height: 50,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    dropdown4BtnStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown4BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown4DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown4RowStyle: {
      backgroundColor: '#EFEFEF',
      borderBottomColor: '#C5C5C5',
    },
    dropdown4RowTxtStyle: { color: '#444', textAlign: 'left' },
  });
export default PromptScreen;
