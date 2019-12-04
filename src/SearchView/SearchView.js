import React, {Component} from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Dishes from "../Components/Dishes/Dishes";
import "./SearchView.css";

class SearchView extends Component {
    render() {
        return (
            <div className="SelectDish">
                <Dishes/>
                {/* We pass the model as property to the Sidebar component */}
                <Sidebar model={this.props.model}/>
            </div>
        );
    }
}

export default SearchView;
