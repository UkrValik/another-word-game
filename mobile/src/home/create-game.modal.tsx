import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as colors from '../../assets/colors.json';
import { AppDispatch } from '../../store';
import { GameLevel, ICreateGameBody, createGame } from '../../store/game.slice';
import { selectToken, seletctUser } from '../../store/user.slice';
import { OpacityButton } from '../common/components/opacity-button';
import { Select } from '../common/components/select';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const CreateGameModal = (props: Props) => {
  const { visible, setVisible } = props;

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(seletctUser);
  const token = useSelector(selectToken);

  const time = new Date().toISOString().split('T')[1].substring(0, 5);
  const date = new Date().toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const [gameLevel, setGameLevel] = useState<string | number>(GameLevel.Normal);
  const [wordLength, setWordLength] = useState<string | number>(6);
  const [gameName, setGameName] = useState(time + ' ' + date);

  const onCreateGame = () => {
    const game: ICreateGameBody = {
      name: gameName,
      playerId: user._id,
      length: wordLength as number,
      gameLevel: gameLevel as GameLevel,
      createdBy: 'game',
      started: new Date().toISOString(),
    };
    dispatch(createGame({ game, token }));
    setVisible(false);
    setGameLevel(GameLevel.Normal);
    setWordLength(6);
  };

  return (
    <Modal visible={visible} animationType={'fade'} transparent>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={{ backgroundColor: colors.black + 'cc' }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.headerWrapper}>
                <OpacityButton title={'Cancel'} onPress={() => setVisible(false)} outline />
                <OpacityButton title={'Create'} onPress={onCreateGame} />
              </View>
              <View style={styles.contentWrapper}>
                <View style={styles.nameInputWrapper}>
                  <TextInput value={gameName} onChangeText={(text) => setGameName(text)} style={styles.nameInput} />
                </View>
                <View style={styles.labelWrapper}>
                  <Text style={styles.label}>How many attempts do you want?</Text>
                </View>
                <Select
                  options={[GameLevel.Easy, GameLevel.Normal, GameLevel.Hard]}
                  chosenOption={gameLevel}
                  setOption={(option) => setGameLevel(option)}
                />
                <View>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>How long the word should be?</Text>
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
  nameInputWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.black,
  },
  nameInput: {
    padding: 5,
  },
});
