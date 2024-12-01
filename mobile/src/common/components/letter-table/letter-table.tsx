import { GuessAttemptLetters } from './guess-attempt-letters';
import { IAttempt, IGame } from '../../types';

interface Props {
  size: number;
  attemptsArray: (IAttempt | number)[];
  game: IGame;
  attemptWord?: string;
  focusWordInput?: () => void;
}

export const LetterTable = ({ size, attemptsArray, game, attemptWord, focusWordInput }: Props) => {
  return attemptsArray.map((attempt, index) => {
    const activeAttempt =
      (typeof attemptsArray[index] === 'number' && index === 0) ||
      (typeof attemptsArray[index - 1] === 'object' && typeof attemptsArray[index] === 'number');
    return (
      <GuessAttemptLetters
        key={JSON.stringify(attempt)}
        size={size}
        letterCount={game.length}
        attempt={attempt}
        activeAttempt={activeAttempt}
        attemptWord={attemptWord}
        keyword={game.word}
        focusWordInput={focusWordInput}
      />
    );
  });
};
