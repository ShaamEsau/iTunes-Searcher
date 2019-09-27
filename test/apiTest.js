/* Calls the module as a variable */
const assert = require("chai").assert;
const fetch = require("node-fetch");


describe("Testing Fetch", function () {
	
	it("Data Has been fetch", async () => {
		/* Creates a variable that stores the data of an API */
		const iTunesData = await fetch("https://itunes.apple.com/search?term=lil+wayne&limit=1");
		/* Variable that stores converted data */
		const convertData = await iTunesData.json();
		/* Checks to see if a certain keys value matches the specified string */
		assert.equal(convertData.results[0].artistName, "Lil Wayne");
	})
})