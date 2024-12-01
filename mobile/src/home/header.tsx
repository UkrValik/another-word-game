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
      <OpacityButton
        onPress={onPress}
        title={'New game'}
        titleWrapperStyles={styles.newGameButtonContainer}
        titleStyles={styles.newGameButtonTitle}
      />
      <CreateGameModal visible={createGameModalVisisble} setVisible={setCreateGameModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGameButtonContainer: {
    backgroundColor: colors.blue,
    alignItems: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '15%',
    marginVertical: '10%',
  },
  newGameButtonTitle: {
    color: colors.white3,
    fontSize: 20,
    fontWeight: 'light',
  },
});
