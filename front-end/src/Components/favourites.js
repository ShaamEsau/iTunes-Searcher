import React from 'react';
import '../App.css';

class Favourites extends React.Component {
	constructor(){
		super();
		this.state = {
			favsData : []
		}
	}

  /*Adds a life cycle that executes as the page is loaded*/
	componentDidMount = async () => {
    /* Creates a variable that retrieves data from the api */
		var favRawData = await fetch("/favs");
    /* Creates a variable that parses info as json */
		var favConv = await favRawData.json();
    /* Updates specified states values */
		this.setState({
			favsData : favConv
		})
	}

	/* Creates an arrow function */
  deleteFav = (i) => {
    /* Creates a variable that stores an object with states values */
    let itemSelector = {
      id: i.trackID
    }
    /* Retrieves the api */
    fetch("/favs", {
      /* Finds and executes the DELETE method for the data */
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      /* Converts data to JSON and saves it to the body-parser */
      body: JSON.stringify(itemSelector)
    })
      /* Reloads page */
      window.location.reload(true);
      /* Pop is displayed with the specified text */
      alert("Removed Item")
  }

	render(){
		return(
      /* Creates a table to contain data */
			<table>
            {/* Takes the states array and executed the elements contained within per index */}
				    {this.state.favsData.map(data => 
              <React.Fragment>
                {/* Creates a heading block */}
                <thead>
                {/* Creates a table row */}
                <tr>
                {/* Creates a heading cell that contains the states value */}
                <th>{data.artistOrAuthor}</th>
                <th>Name</th>
                </tr>
                </thead>
                {/* Creates a body block */}
                <tbody>
                <tr>
                {/* Creates a table data that contains the states image value in an image element */}
                <td><img src={data.artWork}/></td>
                <td>{data.trackOrTitle}</td>
                {/* Sets an audio control that holds the sample data if any be be played, paused or downloaded */}
                <td> <audio controls><source src={data.sample} type="audio/mpeg"/></audio></td>
                {/* Creates a button that when clicked extecutes the function with the data held by it */}
                <td><button onClick={() => {this.deleteFav(data)}}>❌</button></td>
                </tr>
                </tbody>
            </React.Fragment>
        )} 
			</table>
		)
	}
}
/* Allows the component to be imported and used by other file */
export default Favourites;