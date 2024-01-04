import './App.css';
import TopLevelPage from "./components/TopLevelPage/TopLevelPage"
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      {/* <UserProvider> */}
        <div className="App">
          <TopLevelPage />
        </div>
      {/* </UserProvider> */}
    </Provider>
  );
}

export default App;