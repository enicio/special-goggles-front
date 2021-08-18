import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ScreenOne from './components/screen01';
import ScreenTwo from './components/assetsRegister/assetsRegister';
import ScreenThree from './components/screen03';
import NavBar from './components/NavBar/NavBar';
import Registers from "./pages/resgisters/registers";
import Dashboard from "./pages/dashboard.js/dashboard";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/assets" component={ Dashboard }/>
        <Route path="/unidades" component={ ScreenThree }/>
        <Route path="/registers" component={ Registers }/>
      </Switch>
    </Router>
  );
}

export default App;
