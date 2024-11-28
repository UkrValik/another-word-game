import { Provider } from 'react-redux';

import { Main } from './src/navigation/main';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
