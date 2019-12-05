import React, {Component} from "react";
import Subheading from "../Components/Subheading/Subheading";
import OverviewDishes from "../Components/OverviewDishes/OverviewDishes";
import "./OverviewView.css";

class OverviewView extends Component {
    render() {
        return (
            <div >
                {/* We pass the model as property to the Sidebar component */}
                <Subheading model={this.props.model}/>

                <OverviewDishes model={this.props.model}/>
            </div>
        );
    }
}

export default OverviewView;
