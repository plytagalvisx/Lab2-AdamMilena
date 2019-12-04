import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./HomeView.css";

class HomeView extends Component {
    render() {
        return (
            <div className="Welcome">
                <p className="welcome-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel laoreet orci. Nullam ut iaculis diam. Aliquam
                    magna nulla, congue ut elementum hendrerit, dignissim at mauris. Quisque ac felis sed nibh elementum euismod a sit amet
                    arcu. Maecenas a efficitur leo.</p>

                <Link className="startBtn" to="/search">
                    Start planning
                </Link>
            </div>
        );
    }
}

export default HomeView;
