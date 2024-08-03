const fs = require('fs');
const axios = require('axios');

// takes in a file to read text from and console it
function cat(file) {
    // readFile and handle error and data
    fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
            // console error
            console.error(`Error reading ${file}\n\t${error}`)
        } else {
            // log data
            console.log(data)
        }
    })
}

// takes in a url to extract data from and console it
function webCat(url){
    // get url data using axios
    axios.get(url)
    .then(response => {
        // console the data
        console.log(response.data);
    })
    .catch(error => {
        // console error
        console.error(`Error fetching ${url}\n\t${error}`)
    });
}

// Get the file path from command-line arguments
// we use [2] because the file path is the third item in the argument
// node step1.js one.txt
const path = process.argv[2];

// check if the path is a text file
if (path.endsWith(".txt")) {
    cat(path);
} 
// check if the path is a url
else if (path.startsWith("http")) {
    webCat(path)
}
// else, console error
else {
    console.error("Please provide a file path or URL.");
}