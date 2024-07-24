import "./Failed.css";
import React from "react";
import { Link } from "react-router-dom";

function Failed() {
    return (
        <div className="failed-container">
            <h1>Checkout Failed</h1>
            <p>We're sorry, but your checkout process has failed.</p>
            <p>Please try again later or contact customer support.</p>
            <Link to="/"> back to home </Link>
        </div>
    );
}

export default Failed;