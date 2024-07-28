const fs = require('fs');

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

// Get the file path from command-line arguments
// we use [2] because the file path is the third item in the argument
// node step1.js one.txt
const path = process.argv[2];

if (path) {
    cat(path);
} else {
    console.error('Please provide a file path as an argument.');
}