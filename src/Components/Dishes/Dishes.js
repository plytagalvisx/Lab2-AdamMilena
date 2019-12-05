import React, {Component} from "react";
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {Link} from "react-router-dom";
import modelInstance from "../../data/DinnerModel";
import "./Dishes.css";

class Dishes extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        this.state = {
            status: "LOADING",
            type: '',
            query: ''
        };
        this.updateQuery = this.updateQuery.bind(this);
        this.updateType = this.updateType.bind(this);
        this.pressSearchButton = this.pressSearchButton.bind(this);
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    // and to setup model observer.
    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        let type = this.state.type;
        let query = this.state.query;
        modelInstance
            .getAllDishes(type, query)
            .then(dishes => {
                this.setState({
                    status: "LOADED",
                    dishes: dishes.results
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
    }

    updateQuery(event) {
        this.setState({query: event.target.value});
    }

    updateType(event) {
        this.setState({type: event.target.value});
    }

    pressSearchButton(event) {
        this.setState({status: "LOADING"}, this.componentDidMount);
    }

    render() {
        let dishesList = null;

        // depending on the state we either generate
        // useful message to the user or show the list
        // of returned dishes
        switch (this.state.status) {
            case "LOADING":
                dishesList = <em>Loading...</em>;
                break;
            case "LOADED":
                dishesList = this.state.dishes.map(dish => (
                    <Link key={dish.id} to={"/details/" + dish.id}>
                        <div id="dishes-items" /*className="flex-between-search2"*/>
                            <div className="dish">
                                <img className="dish-image" alt="" src={"https://spoonacular.com/recipeImages/" + dish.image}/>
                                <p className="dish-text">{dish.title}</p>
                            </div>
                        </div>
                    </Link>
                ));
                break;
            default:
                dishesList = <b>Failed to load data, please try again</b>;
                break;
        }

        return (
            <div className="container-search">
                <div className="grid-search">
                    <div id="searchView" className="flex-between-search1">
                        <h5 id="updateTitle">FIND A DISH</h5>
                        <input id="inputDishTitle" type="text" placeholder="Enter key words" value={this.state.query} onChange={this.updateQuery}/>
                        <label className="space">
                            <select id="selectTypeDish" value={this.state.type} onChange={this.updateType}>
                                <option>All</option>
                                <option>Main Course</option>
                                <option>Side Dish</option>
                                <option>Dessert</option>
                                <option>Appetizer</option>
                            </select>
                        </label>
                        <button id="search-dish-button" onClick={this.pressSearchButton}>Search</button>
                    </div>

                    <div className="Dishes">
                        <ul className="displayDishes">{dishesList}</ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dishes;