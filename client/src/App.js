import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import GameCreation from './Components/GameCreation/GameCreation';
import GameDetail from './Components/GameDetail/GameDetail';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home} />
      <Route exact path='/creation' component={GameCreation} />
      <Route path='/detail' render={(match) => <GameDetail match={match} />} />
    </div>
  );
}

export default App;
