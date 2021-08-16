import Main from './pages/main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ScreenOne from './components/screen01';
import ScreenTwo from './components/screen02';
import ScreenThree from './components/screen03';

function App() {
  return (
    <Router>
      <Main />
      <Switch>
        <Route path="/assets" component={ ScreenOne }/>
        <Route path="/unidades" component={ ScreenTwo }/>
        <Route path="/company" component={ ScreenThree }/>
      </Switch>
    </Router>
  );
}

export default App;
