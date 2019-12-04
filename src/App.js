import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomeView from "./HomeView/HomeView";
import modelInstance from "./data/DinnerModel";
import SearchView from "./SearchView/SearchView";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <p className="App-title">{this.state.title}</p>
          </header>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={HomeView} />
          <Route
              path="/search"
              render={() => <SearchView model={modelInstance} />}
          />

        </div>
    );
  }
}

export default App;
