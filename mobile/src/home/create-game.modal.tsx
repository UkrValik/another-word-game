import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import * as colors from '../../assets/colors.json';
import { GameLevel } from '../../store/game.slice';
import { OpacityButton } from '../common/components/opacity-button';
import { Select } from '../common/components/select';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const CreateGameModal = (props: Props) => {
  const { visible, setVisible } = props;

  const [gameLevel, setGameLevel] = useState<string | number>(GameLevel.Normal);
  const [wordLength, setWordLength] = useState<string | number>(6);

  return (
    <Modal visible={visible} animationType={'fade'} transparent>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={{ backgroundColor: colors.black + 'cc' }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.headerWrapper}>
                <OpacityButton
                  title={'Cancel'}
                  onPress={() => setVisible(false)}
                  outline
                />
                <OpacityButton title={'Create'} />
              </View>
              <View style={styles.contentWrapper}>
                <View style={styles.labelWrapper}>
                  <Text style={styles.label}>
                    How many attempts do you want?
                  </Text>
                </View>
                <Select
                  options={[GameLevel.Easy, GameLevel.Normal, GameLevel.Hard]}
                  chosenOption={gameLevel}
                  setOption={(option) => setGameLevel(option)}
                />
                <View>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>
                      How long the word should be?
                    </Text>
                  </View>
                  <Select
                    options={[4, 5, 6, 7, 8, 9, 10]}
                    chosenOption={wordLength}
                    setOption={(option) => setWordLength(option)}
                    selectOptionStyles={{ width: '12%' }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: '5%',
    paddingTop: '5%',
    marginTop: '140%',
    height: '40%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentWrapper: {
    marginTop: '5%',
  },
  labelWrapper: {
    marginTop: '4%',
  },
  label: {
    fontWeight: '400',
    fontSize: 20,
    color: colors.black,
  },
});
