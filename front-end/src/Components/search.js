/* Calls the React library to be used */
import React from 'react';
/* Calls stylesheet to edit and style the elements rendered */
import '../App.css';

/* Creates a class component */
class Search extends React.Component {

    /* Initializes data */
    constructor() {
        /* Inherits parent data */
        super();
        /* Sets the default states value */
        this.state = {
            itunesData: [],
            authorName: "",
            trackOrBook: "",
        }
    }

    /*Adds a life cycle that executes as the page is loaded*/
    componentDidMount = async () => {
        this.setState({
            itunesData: []
        })
        /* Creates a variable that retrieves data from the api */
        var rawData = await fetch("/api")
        /* Creates a variable that parses info as json */
        var dataConv = await rawData.json()
        /* Updates specified states values */
        this.setState({
            itunesData: dataConv.results
        })
    }

    /* Creates arrow function */
    searchBtn = () => {
        /* Creates a variable that stores states info as an object */
        let searchInput = {
            /* Splits the text into an array and joins them again with a + inbetween each word */
            artistName: this.state.authorName.split(" ").join("+"),
            songOrBook: this.state.trackOrBook

        }
        /* Fetches data from api */
        fetch("/api", {
            /* Looks for the post method and executes request */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            /* Stores data in the body and parses data as json string */
            body: JSON.stringify(searchInput)
        })
        /* Reloads page */
        window.location.reload();

    }

    /* Creates arrow function */
    addFav = (i) => {
        /* Creates a variable that stores states info as an object */
        let favOption = {
            trackID: i.trackId,
            artistOrAuthor: i.artistName,
            artWork: i.artworkUrl60,
            trackOrTitle: i.trackName,
            sample: i.previewUrl
        }
        /* Fetches data from favs */
        fetch("/favs", {
            /* Looks for the post method and executes request */
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            /* Stores data in the body and parses data as json string */
            body: JSON.stringify(favOption)
        })
        /* Pop is displayed with the specified text */
        alert("Added to favourites")
    }


    render() {

        return (
            /* Creates a div box */
            <div className="App">
            {/* Creates a text box that allows user input. As a user types it updates the specified */}
            <input type="text" 
            onChange={e =>this.setState({authorName : e.target.value})}
            />
            {/* Creates a button that executes a function when it's clicked */}
            <button onClick={this.searchBtn}>Submit</button>
            {/* Inserts a line space */}
            <br/>
            {/* Creates a holder for text */}
            <label>Song</label>
            {/* Creates a radio button that executes a function when it's clicked that updates the specified state */}
            <input type="radio" name="category" value="musicTrack" onClick={e => this.setState({trackOrBook : e.target.value})}/>
            <label>Book</label>
            <input type="radio" name="category" value="ebook" onClick={e => this.setState({trackOrBook : e.target.value})}/>
            <label>Audio Book</label>
            <input type="radio" name="category" value="audiobook" onClick={e => this.setState({trackOrBook : e.target.value})}/>
            {/* Creates a table to contain data */}
            <table>
                {/* Takes the states array and executed the elements contained within per index */}
                {this.state.itunesData.map(data => 
                    <React.Fragment>
                        {/* Creates a heading block */}
                        <thead key={data.trackId}>
                        {/* Creates a table row */}
                        <tr>
                        {/* Creates a heading cell that contains the states value */}
                        <th>{data.artistName}</th>
                        <th>Name</th>
                        </tr>
                        </thead>
                        {/* Creates a body block */}
                        <tbody>
                        <tr>
                        {/* Creates a table data that contains the states image value in an image element */}
                        <td><img src={data.artworkUrl60}/></td>
                        <td>{data.trackName}</td>
                        <td> <audio controls><source src={data.previewUrl} type="audio/mpeg"/></audio> </td>
                        <td><button onClick={() => {this.addFav(data)}}>🌟</button></td>
                        </tr>
                        </tbody>
                    </React.Fragment>
                )} 
        </table>     
    </div>
        );
    }
}
/* Allows the component to be imported and used by other file */
export default Search;