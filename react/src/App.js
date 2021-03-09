import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Routers from './components/Routers'
function App() {
  return (

    <div className="App">
      <Router>
<Routers />
      </Router>
    </div>
  );
}

export default App;
