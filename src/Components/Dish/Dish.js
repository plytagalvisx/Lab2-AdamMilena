import React, {Component} from "react";
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {Link} from "react-router-dom";
import modelInstance from "../../data/DinnerModel";
import "./Dish.css";

class Dish extends Component {
    constructor(props) {
        super(props);
        // We create the state to store the various statuses
        // e.g. API data loading or error
        this.state = {
        };
    }

    render() {
        return (
            <div className="Dishes">
                <ul>This is details view.</ul>
            </div>
        );
    }
}

export default Dish;