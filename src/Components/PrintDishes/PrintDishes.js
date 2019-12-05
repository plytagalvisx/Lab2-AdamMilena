import React, {Component} from "react";
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {Link} from "react-router-dom";
import modelInstance from "../../data/DinnerModel";
import "./PrintDishes.css";

class PrintDishes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: this.props.model.getFullMenu()
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
        });
    }

    render() {
        let printDishes;

        return (
            printDishes = this.state.dishes.map(dish => (
                <div className="print-cluster">
                    <img className="print-image" alt="" src={dish.image}/>
                    <div className="dish-title">{dish.title}</div>
                    <div>
                        <div>Preparation</div>
                        <br/>
                        <div className="dish-instructions">{dish.instructions}</div>
                    </div>
                </div>
            )),

            <div id="print-container">{printDishes}</div>
        );
    }
}

export default PrintDishes;

