/* Calls the React and Router library to be used */
import React from 'react';
import { HashRouter, Route, NavLink, Switch } from "react-router-dom";
/* Calls stylesheet to edit and style the elements rendered */
import './App.css';
/* Calls image to be used on this page */
import iTunes from "./Images/itunes.jpg";
/* Calls the component to be used on this page */
import Search from "./Components/search.js";
import Favourite from "./Components/favourites.js";

/* Creates a class components */
class App extends React.Component {

    /* Converts data to a readable web format */
    render() {
        /* Data to be called to the web page */
        return (
            /* Creates a div box */
            <div className="App">
            <img id="Logo" src={iTunes}/>
            <br/>
        {/* Placeholder for the component links */}
        <HashRouter>
        <div>
    {/* Creates an unordered list */}
    <ul>
{/* Sets the link and path to the component to be displayed when link is clicked on */}
<li>
<NavLink activeClassName = "active" to= "/Search"> Search </NavLink>
</li>
<li>
<NavLink activeClassName = "active" to = "/Favourite"> Favourites </NavLink>
</li>
</ul>
<Switch>
<Route exact path = {"/Search"} component = {Search} />
<Route path = {"/Favourite"} component = {Favourite} />
</Switch>
</div>
</HashRouter>
</div>
        );
    }
}
/* Allows the component to be imported and used by other file */
export default App;