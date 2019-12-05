import React, {Component} from "react";
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {Link} from "react-router-dom";
import modelInstance from "../../data/DinnerModel";
import "./Subheading.css";

class Subheading extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests()
        };
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
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
            numberOfGuests: this.props.model.getNumberOfGuests()
        });
    }

    render() {
        let guests = this.state.numberOfGuests;
        let isOneGuest = (guests == 1);
        return (
            <div className="subheading">
                <div id="overview-persons">
                    <p>My dinner: </p>
                    <p id="numGuests">{guests}</p>
                    <p id="people">{isOneGuest ? 'person' : 'people'}</p>
                </div>
                <Link to={"/search"}>
                    <button id="backBtn" className="backBtn">Go back and exit dinner</button>
                </Link>
            </div>

        );
    }
}

export default Subheading;

