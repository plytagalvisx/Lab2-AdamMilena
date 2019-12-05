import React, {Component} from "react";
import Subheading from "../Components/Subheading/Subheading";
import PrintDishes from "../Components/PrintDishes/PrintDishes";
import "./PrintoutView.css";

class PrintoutView extends Component {
    render() {
        return (
            <div >
                {/* We pass the model as property to the Sidebar component */}
                <Subheading model={this.props.model}/>

                <PrintDishes model={this.props.model}/>
            </div>
        );
    }
}

export default PrintoutView;
