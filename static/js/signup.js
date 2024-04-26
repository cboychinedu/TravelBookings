// Debug 
console.log('working')

// Getting the dom elements 
loginBtn = document.getElementById("loginBtn"); 
signupBtn = document.getElementById("signupBtn");
fullname = document.getElementById("fullname"); 
email = document.getElementById("email"); 
password = document.getElementById("password");
alertDiv = document.getElementById("alertDiv"); 
alertDisplay = document.getElementById("alert");

// Adding event listener to the sigup button 
signupBtn.addEventListener("click", (event) => {
    // Prevent default submission
    event.preventDefault(); 

    // Getting all the data 
    const fullnameData = fullname.value; 
    const emailData = email.value; 
    const passwordData = password.value; 

    // Creating a json object 
    const data = JSON.stringify({
        "fullname": fullnameData, 
        "emailAddress": emailData, 
        "password": passwordData
    })

    // Using fetch request 
    fetch('/signup', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'}, 
        body: data
    }).then((response) => response.json())
    .then((responseData) => {
        // If response data status is successful 
        if (responseData.status === "success") {
            alertDiv.style.display = "flex"; 
            alertDisplay.innerText = responseData.message; 

        }
        else {
            alertDiv.style.display = "flex"; 
            alertDisplay.innerText = responseData.message; 
        }
        
    })
})

// Adding event listener for the login btn 
loginBtn.addEventListener("click", (event) => {
    location.href = "/"
})

