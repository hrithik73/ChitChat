import { API_KEY } from '@src/config/api';
import { queryClient } from '../../../App';
import { Text, View } from 'react-native';
import { useMutation } from 'react-query';
import RNFS from 'react-native-fs';
import { Button } from 'react-native-paper';
import axios from 'axios';

const Training = () => {
  const onPressHandler = async () => {
    const files = await RNFS.readFile(
      '/Users/indianic/dev/personal/ChitChat/src/data/training_prepared.jsonl',
      'base64',
    );
    console.log('file', files);

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${API_KEY}`);

    var formdata = new FormData();
    formdata.append('purpose', 'fine-tune');
    formdata.append('file', files);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('https://api.openai.com/v1/files', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  // const showData = () => {
  //   RNFS.readFile(
  //     '/Users/indianic/dev/personal/ChitChat/src/data/training.jsonl',
  //   ).then(res => {
  //     console.log(res);
  //   });
  // };

  return (
    <View>
      <Button onPress={() => onPressHandler()}>Send data</Button>
    </View>
  );
};

export default Training;
