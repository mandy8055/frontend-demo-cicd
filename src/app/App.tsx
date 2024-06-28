import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import '../styles';
import router from './routes/Routes';
import store from './store';

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
