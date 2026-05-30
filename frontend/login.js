document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(
        username === "admin" &&
        password === "admin123"
    ){

        localStorage.setItem(
        "role",
        "admin"
        );

        alert("Admin Login Successful");

        window.location.href =
        "index.html";

    }

    else if(
        username === "user" &&
        password === "user123"
    ){

        localStorage.setItem(
        "role",
        "user"
        );

        alert("User Login Successful");

        window.location.href =
        "index.html";

    }

    else{

        alert(
        "Invalid Username or Password"
        );

    }

});