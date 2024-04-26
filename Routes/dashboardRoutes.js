// Importing the necessary modules 
const express = require('express'); 
const { rootPath } = require('../base'); 
const bcrypt = require('bcryptjs'); 
const { protectedRoute } = require('../auth/auth'); 
const path = require('path'); 

// Creating the router object 
const router = express.Router(); 

// Creating the session variable 
let sess; 

// Dashboard Home Page 
router.get('/', protectedRoute, async(req, res) => {
    // Setting the path to the dashboad html template file
    let fullPath = path.join(rootPath, 'static', 'templates', 'dashboard.ejs'); 

    // Rendering the homepage 
    return res.render(fullPath); 
})

// Exporting the dashboard router 
module.exports = router; 