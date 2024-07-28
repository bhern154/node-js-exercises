const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.error(`Error reading ${path}`)
            console.error(`\t${error}`)
        } else {
            console.log(data)
        }
    })
}

function webCat(path){
    axios.get(path)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(`Error fetching  ${path}`)
        console.error(`\t${error}`)
    });
} 

// Get the file path from command-line arguments
// we use [2] because the file path is the third item in the argument
// node step1.js one.txt
const path = process.argv[2];

if (path) {
    if (path.endsWith(".txt")){
        cat(path);
    }
    if (path.startsWith("http")){
        webCat(path)
    }
} else {
    console.error("Please provide a file path or URL.");
}