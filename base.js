// Importing the necessary modules 
const path = require('path'); 
const winston = require('winston'); 

// Getting the base path "rootPath" 
let rootPath = path.join(__dirname); 

// Exporting  
module.exports.rootPath = rootPath; 