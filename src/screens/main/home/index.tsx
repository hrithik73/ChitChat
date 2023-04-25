import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { Button } from 'react-native-paper';

const Home = () => {
  const screens = [
    {
      name: 'Prompt',
    },
    {
      name: 'Image',
    },
    {
      name: 'Audio',
    },
  ];
  const navigation = useNavigation<any>();

  return (
    <View>
      <FlatList
        data={screens}
        renderItem={({ item }) => {
          return (
            <Button
              mode="contained-tonal"
              style={{ margin: 10 }}
              onPress={() => {
                navigation.navigate(item.name);
              }}>
              {item.name}
            </Button>
          );
        }}
      />
    </View>
  );
};
export default Home;
