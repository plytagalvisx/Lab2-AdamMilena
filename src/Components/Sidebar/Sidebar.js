import React, {Component} from "react";
import "./Sidebar.css";
import {Link} from "react-router-dom";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        // we put on state the properties we want to use and modify in the component
        this.state = {
            numberOfGuests: this.props.model.getNumberOfGuests(),
            dishes: this.props.model.getFullMenu(),
            price: this.props.model.getTotalMenuPrice(),
        };
        this.removeDishFromMenuButton = this.removeDishFromMenuButton.bind(this);
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
            numberOfGuests: this.props.model.getNumberOfGuests(),
            dishes: this.props.model.getFullMenu(),
            price: this.props.model.getTotalMenuPrice(),
        });
    }

    // our handler for the input's on change event
    onNumberOfGuestsChanged = e => {
        this.props.model.setNumberOfGuests(e.target.value);
    };

    removeDishFromMenuButton(dishId) {
        this.props.model.removeDishFromMenu(dishId);
        console.log("The dish has been removed");
    }

    render() {
        let dishesContainer = null;
        let guests = this.state.numberOfGuests;
        let price = this.state.price;

        return (
            dishesContainer = this.state.dishes.map(dish => (
                <div className="flex-between-dishes">
                    <div>{dish.title}</div>
                    <div>{Math.round(dish.pricePerServing * guests)}</div>
                    <Link to="/search">
                        <button id="removeDishBtn" className="removeDishBtn" onClick={() => this.removeDishFromMenuButton(dish.id)}>
                            <p className="removeBtn">&#x1f5d1;</p>
                        </button>
                    </Link>
                </div>
            )),

                <div className="Sidebar">
                    <div id="sidebar-top">
                        <div>My Dinner</div>
                        <div className="SEK-text">SEK {price}</div>
                        <button id="collapse-sidebar-btn" className="hamburger"/>
                    </div>
                    <div className="collapsible">
                        <div id="sidebar-people">People:</div>
                        <input id="sidebar-num-people" type="number" value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
                        <div id="flex-between">
                            <div>Dish Name</div>
                            <div>Cost</div>
                        </div>
                        <div id="sidebar-dishes">{dishesContainer}</div>
                        <div id="sidebar-cost">
                            <div>SEK {Math.round(price)}</div>
                        </div>

                        <div id="sidebar-confirm"></div>
                        <Link to="/overview">
                            <button id="sidebarBtn" className="startBtn">Confirm Dinner</button>
                        </Link>
                    </div>
                </div>
        );
    }
}

export default Sidebar;
