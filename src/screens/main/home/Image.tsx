import api from '@src/config/api';
import useTheme from '@src/hooks/useTheme';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useMutation } from 'react-query';

import { queryClient } from '../../../../App';

const ImageGenerater = () => {
  const {
    data: imageData,
    isLoading,
    error,
    mutate,
  } = useMutation(
    (data: any) => {
      return api.post('/images/generations', data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('completion');
      },
    },
  );
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const theme = useTheme();
  const styles = makeStyles(theme.colors);

  console.log('imagedata-->', imageData?.data.data[0].url);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Image Prompt"
        value={imagePrompt}
        onChangeText={val => setImagePrompt(val)}
      />

      <Button
        loading={isLoading}
        onPress={() => {
          let bodyData = {
            prompt: imagePrompt,
          };
          mutate(bodyData);
        }}>
        Get Image
      </Button>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri: imageData?.data.data[0].url,
          }}
          style={{
            height: 500,
            width: 500,
          }}
        />
      </View>
    </View>
  );
};
const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
    },
    imgContainer: {
      borderWidth: 0.2,
      flex: 1,
      borderRadius: 10,
    },

    menu: {
      flex: 1,
      margin: 10,
    },
    row: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: 0.2,
      borderRadius: 10,
      borderColor: colors.text,
    },
  });

export default ImageGenerater;
