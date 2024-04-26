// Importing the necessary modules 
const fs = require('fs'); 
const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const morgan = require('morgan'); 
const session = require('express-session'); 
const bodyparser = require('body-parser'); 

const app = express(); 

// Setting some necessary middlewares, and creating one 
// week session interval 
const oneWeekSession = 1000 * 60 * 60 * 7*24; 
app.use(session({
    secret: "7c4ee38b7664666af67f45949b1334a&$76e32fe7e88b740", 
    saveUninitialized: true, 
    resave: false, 
    store: null, 
    unset: 'destroy', 
    cookie: { maxAge: oneWeekSession }, 
})); 

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'], 
    credentials: true, 
    optionsSuccessStatus: 200, 
    allowedHeaders: [
        'Content-Type', 'Authorizaton', 
        'Access-Control-Allow-Methods', 
        'access-control-allow-orign', 
        'Access-Control-Allow-Origin', 
        'Access-Control-Allow-Headers', 
        'x-auth-token',
    ]
})); 
app.use(express.json())
app.use(bodyparser.json())
app.use(express.static('static'));
app.use(express.static('./static/javascript'));
app.use(express.static('./static/templates'));
app.use(express.static('./static/css'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Setting the views 
app.set('view engine', 'ejs'); 
app.set('views', './views'); 

// Using the env variables 
const PORT = process.env.PORT || 5000; 
const HOST = process.env.HOST || 'localhost'; 

// Importing the required routes 
const home = require('./Routes/homeRoutes'); 
const dashboard = require('./Routes/dashboardRoutes');

// Setting the routes configuration 
app.use('/', home); 
app.use('/dashboard', dashboard); 

// running the server 
app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST + ":" + PORT}`)
})