import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Create from "./components/Create";
import Post from "./components/Post";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/post/:id">
          <Post />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/*">
          <h1>Not sure where you're trying to go...</h1>
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
