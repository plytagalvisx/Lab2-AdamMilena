import React, {Component} from "react";
// Alternative to passing the model as the component property,
// we can import the model instance directly
import {Link} from "react-router-dom";
import modelInstance from "../../data/DinnerModel";
import "./Dish.css";

class Dish extends Component {
    constructor(props) {
        super(props);
        let hash = window.location.href.split("/")[4];

        // We create the state to store the various statuses
        // e.g. API data loading or error
        // this.state har samma content som staten i redux store.
        this.state = {
            status: "LOADING",
            numberOfGuests: this.props.model.getNumberOfGuests(),
            dishDetails: '',
            dishId: hash      // Dish ID hämtas via hash/href
        };
        this.addToMenuButton = this.addToMenuButton.bind(this);
    }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount() {
        this.props.model.addObserver(this);
        // when data is retrieved we update the state
        // this will cause the component to re-render
        let dish = this.state.dishId;
        modelInstance
            .getDish(dish)
            .then(dish => {
                this.setState({
                    status: "LOADED",
                    dishDetails: dish
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
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

    addToMenuButton() {
        this.props.model.addDishToMenu(this.state.dishDetails);
    }

    render() {
        let guests = this.state.numberOfGuests;
        let dish = this.state.dishDetails;
        let dishIngredientsDetails;     // dishIngredientsDetails display'ar ingredient delen.
        let dishDisplay = null;

        // depending on the state we either generate
        // useful message to the user or show the selected
        // dish.
        switch (this.state.status) {
            case "LOADING":
                dishDisplay = <em>Loading...</em>;
                break;
            case "LOADED":
                dishDisplay = (
                    dishIngredientsDetails = dish.extendedIngredients.map(ingredient => (
                        <div key={ingredient.name} className="details-ingredient-dish">
                            <div
                                className="amount">{ingredient.measures.metric.amount * guests + " " + ingredient.measures.metric.unitShort}</div>
                            <div className="ingredient">{ingredient.name}</div>
                        </div>
                    )),

                        <div key={dish.id} id="details-container">
                            <div id="details-ingredients">
                                <div id="details-ingredient-header" className="ingredient">Ingredients
                                    for: {guests} people
                                </div>
                                <div className="details-line"></div>
                                <div id="details-ingredient-list">{dishIngredientsDetails}</div>
                                <div className="details-line"></div>
                                <div id="details-ingredient-footer">
                                    <div>SEK {Math.round(dish.pricePerServing * guests)}</div>
                                </div>
                                <Link to="/search">
                                    <button id="addToMenuBtn" className="startBtn" onClick={this.addToMenuButton}>Add to
                                        menu</button>
                                </Link>
                            </div>
                            <div id="details-left-container">
                                <div className="details-heading">{dish.title}</div>
                                <img alt="" className="details-image" src={dish.image}/>
                                <div id="details-image-text">{dish.winePairing.pairingText}</div>
                                <Link to="/search">
                                    <button id="backToSearchBtn" className="backBtn">Back to search</button>
                                </Link>
                            </div>
                            <div id="details-preparation">
                                <div className="details-heading">Preparation</div>
                                <div className="details-text">{dish.instructions}</div>
                            </div>
                        </div>
                );
                break;
            default:
                dishDisplay = (
                    <div>
                        <p><b>Failed to load data, please try again</b></p>
                    </div>
                );
                break;
        }

        return (
            <div>
                <div>{dishDisplay}</div>
            </div>
        );
    }
}

export default Dish;

