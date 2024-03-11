import { Route, Switch } from "wouter";
import Patient from "./Patient";
import Search from "./Search";
import Navigation from "./Navigation";

const App = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/">
          <Patient />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
