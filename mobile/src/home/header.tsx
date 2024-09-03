import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CreateGameModal } from './create-game.modal';
import * as colors from '../../assets/colors.json';
import { OpacityButton } from '../common/components/opacity-button';

export const HomeHeader = () => {
  const [createGameModalVisisble, setCreateGameModalVisible] = useState(false);

  const onPress = () => {
    setCreateGameModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <OpacityButton onPress={onPress} title={'New Game'} />
      <CreateGameModal visible={createGameModalVisisble} setVisible={setCreateGameModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderBottomWidth: 2,
    height: '6%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
