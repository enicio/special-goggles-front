import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Registers from "./pages/resgisters/registers";
import Dashboard from "./pages/dashboard.js/dashboard";
import EditAsset from "./components/editAsset/editAsset";
import RealTimeCard from "./components/realTimeCard/realTimeCard";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={ Dashboard }/>
        <Route path="/registers" component={ Registers }/>
        <Route path="/assets/edit/:id" component={ EditAsset }/>
        <Route path="/temp" component={ RealTimeCard }/>
      </Switch>
    </Router>
  );
}

export default App;
