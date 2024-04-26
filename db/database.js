// Importing the necessary modules 
const sqlite3 = require('sqlite3').verbose(); 

// Connecting to the database 
let db = new sqlite3.Database('./db/database.db'); 

// Creating a class for connecting into the sqlite3 database 
class DatabaseConnections {
    // Creating a method for creating the database table 
    createTable() {
        // Creating a table 
        db.exec(`
            CREATE TABLE users (
                ID INTEGER PRIMARY KEY AUTOINCREMENT, 
                fullname VARCHAR(50), 
                email VARCHAR(50),
                password VARCHAR(50) 

            ); 
        `)
    }

    // Creating a method for saving the user's data into the database
    insertUsersData(fullname, email, passwordHash) {
        // Converting the fullname and email address into lower case alphabets
        fullname = fullname.toLowerCase(); 
        email = email.toLowerCase(); 

        // Inserting user's data 
        db.run(
            `INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)`, 
            [fullname, email, passwordHash], 
            function (error) {
                // Displaying the error message 
                console.error(error.message); 
            },

            // On success 
            console.log(`Row inserted `)
        )
    }

    // Creating a method for getting user's data from the database 
    getUsersData(email, callback) {
        db.serialize(() => {
            // 
            db.all(`SELECT * FROM users WHERE email = ?`, [email], (error, row) => {
                if (error) {
                    const responseObject = {
                        status: "error",
                        message: "error connecting to the database",
                    };

                    // 
                    callback(responseObject); 
                }

                // 
                else {
                    const responseObject = {
                        status: 'success', 
                        rows: row
                    }; 

                    // Passing the response object to the callback 
                    callback(responseObject); 
                }
            })

        }); 
    }
}

// Exporting the database class 
module.exports = DatabaseConnections; 

// const database = new DatabaseConnections() 
// database.createTable(); 
// database.insertUsersData("Mark Brown", "markbrown@gmail.com", '12345'); 

// database.getUsersData("markbrown@gmail.com", (rows) => {
//     console.log(rows); 
// })