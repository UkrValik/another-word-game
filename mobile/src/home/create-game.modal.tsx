import { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ICreateGameBody } from '../../api/game';
import * as colors from '../../assets/colors.json';
import { AppDispatch } from '../../store';
import { createGame } from '../../store/game.slice';
import { selectToken, seletctUser } from '../../store/user.slice';
import { Select } from '../common/components/select';
import { GameLevel } from '../common/types';

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
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.black + 'cc' }}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.container}>
              <View style={styles.contentWrapper}>
                <View style={{ marginLeft: '5%', marginBottom: '10%' }}>
                  <Text style={styles.label}>Game name</Text>
                  <View style={styles.nameInputWrapper}>
                    <TextInput value={gameName} onChangeText={(text) => setGameName(text)} style={styles.nameInput} />
                  </View>
                </View>
                <View style={{ marginBottom: '10%' }}>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Attempts quantity</Text>
                  </View>
                  <Select
                    options={[GameLevel.Easy, GameLevel.Normal, GameLevel.Hard]}
                    chosenOption={gameLevel}
                    setOption={(option) => setGameLevel(option)}
                  />
                </View>
                <View style={{ marginBottom: '10%' }}>
                  <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Word length</Text>
                  </View>
                  <Select
                    options={[4, 5, 6, 7, 8, 9, 10]}
                    chosenOption={wordLength}
                    setOption={(option) => setWordLength(option)}
                    selectOptionStyles={{ width: '12%' }}
                  />
                </View>
                <View style={styles.footerWrapper}>
                  <TouchableOpacity onPress={() => setVisible(false)} style={{ flex: 1 }}>
                    <View style={[styles.buttonWrapper, { borderBottomLeftRadius: 30 }]}>
                      <Text style={{ color: colors.blue, fontSize: 20 }}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onCreateGame} style={{ flex: 1 }}>
                    <View
                      style={[
                        styles.buttonWrapper,
                        { borderBottomRightRadius: 30, borderLeftColor: colors['grey-light'], borderLeftWidth: 1 },
                      ]}
                    >
                      <Text style={{ color: colors.blue, fontWeight: 'bold', fontSize: 20 }}>Create</Text>
                    </View>
                  </TouchableOpacity>
                  {/* <OpacityButton title={'Cancel'} onPress={() => setVisible(false)} outline />
                  <OpacityButton title={'Create'} onPress={onCreateGame} /> */}
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
    // flex: 1,
    backgroundColor: colors.white3,
    marginHorizontal: '5%',
    marginBottom: '40%',
    height: '40%',
    borderRadius: 30,
    justifyContent: 'flex-end',
  },
  footerWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors['grey-light'],
    borderTopWidth: 1,
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
  },
  contentWrapper: {
    marginTop: '5%',
  },
  labelWrapper: {
    marginLeft: '5%',
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
