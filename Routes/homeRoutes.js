// Importing the necessary modules 
const express = require('express'); 
const session = require('express-session'); 
const jwt = require('jsonwebtoken'); 
const path = require('path'); 
const bcrypt = require('bcryptjs'); 
const DatabaseConnections = require('../db/database'); 
const { rootPath } = require('../base'); 

// Creating the router object 
const router = express.Router(); 

// Creating an instance of the database connections 
const database = new DatabaseConnections(); 

// Creating the session variable 
let sess

// Setting the routes for the home page 
router.get('/', async (req, res) => {
    // Setting the path to the html template file 
    let fullPath = path.join(rootPath, 'static', 'templates', 'home.ejs'); 

    // Rendering the homepage 
    return res.render(fullPath)
}); 

// Creating a post login route 
router.post('/', async(req, res) => {
    // Searching the database to see if the user with 
    // the specified email address is registered on the database 
    try {
        // Getting the user email address 
        const emailAddress = req.body.emailAddress; 
        const password = req.body.password; 

        // Checking if the user's email address is registered on the database 
        database.getUsersData(emailAddress, async (data) => {
            // if the user's data length is greater than or equals 1 
            if (data.rows.length >= 1) {
                // Execute the block of code below for a user present 
                // on the database 
                // Get the user password 
                const hashedPassword = data.rows[0].password; 
                const userId = data.rows[0].ID; 

                // Checking if the hashed value is correct 
                const isMatch = bcrypt.compareSync(password, hashedPassword); 

                // Getting the jwt secret key 
                const jwtKey = process.env.jwtKey; 

                // Checking if the passwords are correct 
                if (isMatch) {
                    // Create a JWT Token 
                    // const token = jwt.sign({
                    //     emailAddress: emailAddress, 
                    //     isLoggedIn: true, 
                    //     id: userId
                    // }, jwtKey, {
                    //     expiresIn: '30 days'
                    // }); 

                    // console.log(token)
                    // return; 
                    sess = req.session;
                    sess.emailAddress = req.body.emailAddress;
                    sess.isAuth = isMatch; 

                    // Building the success message 
                    let successMessage = JSON.stringify({
                        "message": "Logged in successfully", 
                        "status": "success", 
                        "statusCode": 200, 
                    }); 

                    // Sending the success message 
                    return res.send(successMessage); 
                }

                // Else if the password didn't match 
                else {
                    // Creating the error message body 
                    let errorMessage = JSON.stringify({
                        "message": "Invalid email or password", 
                        "status": "error", 
                        "statusCode": 404, 
                    }); 

                    // Sending back the error message 
                    return res.send(errorMessage); 
                }
            }

            // Else 
            else if (data.rows.length === 0) {
                // Creating the error message 
                let errorMessage = JSON.stringify({
                    "message": "Invalid email or password", 
                    "status": "error", 
                    "statusCode": 404, 
                }); 

                // Sending back the error message 
                return res.send(errorMessage); 
            }
        })
    }

    // Error 
    catch (error) {
        // Creating the error message 
        let errorMessage = JSON.stringify({
            "message": error.toString().trim(), 
            "status": "error", 
            "statusCode": 500, 
        }); 

        // Sending back the error message 
        return res.send(errorMessage); 
    }
})

// Setting the routes for the signup page 
router.get('/signup', async (req, res) => {
    // Setting the full path to the html template file 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signup.ejs'); 

    // Rendering the signup page 
    return res.render(fullPath); 
})

// Creating the post signup route 
router.post('/signup', async(req, res) => {
    // Using try catch block to connect to the database 
    try {
        // Getting the user's email address 
        const emailAddress = req.body.emailAddress; 

        // Searching the database to see if the user's with the 
        // specified email address is registered on the database 
        database.getUsersData(emailAddress, async (data) => {
            // Checking if the rows contains data 
            if (data.rows.length >= 1) {
                // Create an error message signaling the user's is already 
                // registered on the database 
                let errorMessage = JSON.stringify({
                    "message": "The user with the email address is already registered", 
                    "status": "user-registered-error", 
                    "statusCode": "null", 
                }); 

                // Sending back the error message 
                return res.send(errorMessage); 
            }

            // Else if the data.rows is empty, execute the block of 
            // code below 
            else {
                // Encrypt the user's password, and create a salt hash 
                const salt = await bcrypt.genSalt(10); 
                const hashedPassword = bcrypt.hashSync(req.body.password, salt); 

                // Getting the user's data 
                const fullname = req.body.fullname; 
                const emailAddress = req.body.emailAddress; 
    
                // Saving the user's data 
                database.insertUsersData(fullname, emailAddress, hashedPassword); 

                // Generating the success message 
                let successMessage = JSON.stringify({
                    "message": "User newly registered", 
                    "status": "success", 
                    "statusCode": 200 
                }); 

                // Return the success message 
                return res.send(successMessage); 
            }
        })
    }
 
    // Catch 
    catch (error) {
        // Getting the error message 
        let errorMessage = JSON.stringify({
            "message": error.toString().trim(), 
            "status": "error", 
            "statusCode": 500, 
        })

        // Sending back the error message 
        return res.send(errorMessage); 
    }
})

// exporting the home router 
module.exports = router; 