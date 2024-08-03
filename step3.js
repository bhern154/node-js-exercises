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

// writes data to a given output file
function writeToFile(outputFile, data){
    // write to file and handle the error and data
    fs.writeFile(outputFile, data, 'utf8', (error) => {
        if (error) {
            // console error
            console.error(`Couldn't write to ${outputFile}\n\t${error}`);
        } else {
            // console a 'success' message
            console.log(`no output, but ${outputFile} contains contents of ${data}`);
        }
    });
}

// takes in an INPUT file to read text from and an OUTPUT file to write the text to
function catWrite(outputFile, inputFile) {
    // readFile and handle error and data
    fs.readFile(inputFile, 'utf8', (error, data) => {
        if (error) {
            // console error
            console.error(`Error reading ${inputFile}\n\t${error}`)
        } else {
            // provide output file and data to writeToFile 
            writeToFile(outputFile, data) // (outputFile, data)
        }
    })
}

// takes in an INPUT url to extract data from and an OUTPUT file to write the data to
function webCatWrite(outputFile, url){
    // get url data using axios
    axios.get(url)
    .then(response => {
        // provide output file and url data to writeToFile 
        writeToFile(outputFile, response.data) // (outputFile, data)
    })
    .catch(error => {
        // console error
        console.error(`Error fetching ${url}\n\t${error}`)
    });
}

// ARGUMENTS

// $node [js filename] [--out] [output-filename.txt] [readfile-or-url]
// or
// $node [js filename] [readfile-or-url]

// [js filename] -> this is the name of this file -> step3.js
// [--out] -> this is an optional argument. Given --out we should print to a directory rather than to the command line
// [output-filename.txt] -> if --out was selected, then this will be the output directory file
// [readfile-or-url] -> This is the url to call or the file to read from

const arg = process.argv[2]; // this is either [--out] or [readfile-or-url]

// if arg is --out and [readfile-or-url] is a file , call catWrite to write to a file
if (arg == "--out" && process.argv[4].endsWith(".txt")){
    catWrite(process.argv[3], process.argv[4]); // (outputFile, inputFile)
} 
// if arg is --out and [readfile-or-url] is a url , call webCatWrite to write to a file
else if (arg == "--out" && process.argv[4].startsWith("http")) {
    webCatWrite(process.argv[3], process.argv[4]); // (outputFile, url)
}
// if arg is a file, then call cat to console the file contents
else if (arg.endsWith(".txt")) {
    cat(arg); // (file)
} 
// if arg is an http, then call webCat to console the file contents
else if (arg.startsWith("http")) {
    webCat(arg) // (url)
} 
// handle error
else {
    console.error("Please provide a file path or URL. Or specify --out if you want to write to a file");
}
