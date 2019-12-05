import React, {Component} from "react";
import {Route} from "react-router-dom";
import HomeView from "./HomeView/HomeView";
import modelInstance from "./data/DinnerModel";
import SearchView from "./SearchView/SearchView";
import "./App.css";
import DetailsView from "./DetailsView/DetailsView";
import OverviewView from "./OverviewView/OverviewView";
import PrintoutView from "./PrintoutView/PrintoutView";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Dinner Planner",
        };
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p className="App-title">{this.state.title}</p>
                </header>

                {/* We rended diffrent component based on the path */}
                <Route exact path="/" component={HomeView}/>
                <Route
                    path="/search"
                    render={() => <SearchView model={modelInstance}/>}
                />

                <Route
                    path="/details"
                    render={() => <DetailsView model={modelInstance}/>}
                />

                <Route
                    path="/overview"
                    render={() => <OverviewView model={modelInstance}/>}
                />

                <Route
                    path="/printout"
                    render={() => <PrintoutView model={modelInstance}/>}
                />

            </div>
        );
    }
}

export default App;
