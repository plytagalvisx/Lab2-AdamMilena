import React, {Component} from "react";
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {Link} from "react-router-dom";
import modelInstance from "../../data/DinnerModel";
import "./OverviewDishes.css";

class OverviewDishes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: this.props.model.getFullMenu(),
            price: this.props.model.getTotalMenuPrice()
        };
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to setup model observer
    componentDidMount() {
        this.props.model.addObserver(this);
    }

    // this is called when component is removed from the DOM
    // good place to remove observer
    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    // in our update function we modify the state which will
    // cause the component to re-render
    update() {
        this.setState({
            dishes: this.props.model.getFullMenu(),
            price: this.props.model.getTotalMenuPrice()
        });
    }

    render() {
        console.log("HELLO: ", this.state.dishes);
        let price = this.state.price;
        let confirmedDishes;

        return (
            confirmedDishes = this.state.dishes.map(dish => (
                <li className="dish">
                    <img className="dish-image" alt="" src={dish.image}/>
                    <p className="dish-text">{dish.title}</p>
                </li>
            )),

            <div id="overviewmain" className="main">
                <div id="dishes-container">
                    <ul id="overview-dishes-items">{confirmedDishes}</ul>
                    <div id="vertline"></div>
                    <div id="price-container">
                        <div>Total: </div>
                        <div>{Math.round(price)} SEK</div>
                    </div>
                </div>
                <div className="horiline"></div>
                <Link to={"/printout"}>
                    <button id="toPrintBtn">Print full recipe</button>
                </Link>
            </div>

        );
    }
}

export default OverviewDishes;
