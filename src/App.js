
import './App.css';

import Header from "./components/header";
import MainMap from "./components/map";

function App() {
    return (
      <div className="App">
        <Header
        />
        <div className="layout">
          <MainMap  />
        </div>
      </div>
    );
}

export default App;
