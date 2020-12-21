import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import { Home } from "./components/Home"
import {Login} from './components/Login';
function App() {
  return (
      <RecoilRoot>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
          </Switch>
          </Router>
        </RecoilRoot>
  );
}


export default App;
