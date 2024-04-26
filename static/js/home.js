// Debug 
console.log("Debug"); 

// Getting the dom elements 
loginBtn = document.getElementById("loginBtn"); 
signupBtn = document.getElementById("signupBtn"); 
email = document.getElementById("email"); 
password = document.getElementById("password");


// Add event listener for the signup button 
signupBtn.addEventListener("click", (event) => {
    // 
    location.href = "/signup"
})

// Adding event listenr for the signin button 
loginBtn.addEventListener("click", (event) => {
    // Prevent default submission
    event.preventDefault(); 

    // Getting all the data 
    const passwordData = password.value; 
    const emailData = email.value; 

    // Creating a json object 
    const data = JSON.stringify({
        'emailAddress': emailData, 
        'password': passwordData, 
    }); 

    // Using fetch request 
    fetch('/', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'}, 
        body: data
    }).then((response) => response.json())
    .then((responseData) => {
        // If responsedata is successful 
        if (responseData.status === "success") {
            // Set timeout 
            setTimeout(()=> {
                location.href = "/dashboard"; 
            }, 2000)
        }

        else {
            alert("Invalid Username or password")
        }
        
    })
})