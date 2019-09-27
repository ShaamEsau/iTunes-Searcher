import React from 'react';
import '../App.css';

class Favourites extends React.Component {
	constructor(){
		super();
		this.state = {
			favsData : []
		}
	}

	componentDidMount = async () => {
		var favRawData = await fetch("/favs");
		var favConv = await favRawData.json();

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
  }

	render(){
		return(

			<table>
				   {this.state.favsData.map(data => 
            <React.Fragment>
                <thead>
                <tr>
                <th>{data.artistOrAuthor}</th>
                <th>Name</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                <td><img src={data.artWork}/></td>
                <td>{data.trackOrTitle}</td>
                <td> <audio controls><source src={data.sample} type="audio/mpeg"/></audio> </td>
                <td><button onClick={() => {this.deleteFav(data)}}>❌</button></td>
                </tr>
                </tbody>
            </React.Fragment>
        )} 
			</table>


		)
	}
}

export default Favourites;