import React, {Component} from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Dish from "../Components/Dish/Dish";
import "./DetailsView.css";

class DetailsView extends Component {
    render() {
        return (
            <div className="selectedDish">
                <Dish model={this.props.model}/>
                {/* We pass the model as property to the Sidebar component */}
                <Sidebar model={this.props.model}/>
            </div>
        );
    }
}

export default DetailsView;
