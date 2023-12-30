import './App.css';
import TopLevelPage from "./components/TopLevelPage/TopLevelPage"
import { UserProvider } from "./UserContext"

function App() {
  return (
    <UserProvider>
      <div className="App">
        <TopLevelPage />
      </div>
    </UserProvider>
  );
}

export default App;