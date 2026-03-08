//SIGN-IN FUNCTION 
document.getElementById("Signin-btn").addEventListener("click", function () {
    // console.log("Signin successfully")
    //1- get the user input
    const userName = document.getElementById("input-Username");
    // console.log(userName);
    const User = userName.value;
    console.log(User);

    // 2- get the pass input
    const inputPass = document.getElementById("input-password");
    const password = inputPass.value;
    console.log(password);
    // 3-match pass & admin 
    if (User == "admin" && password === "1234") {
        alert("log in successfully");
        window.location.assign("/home.html");
    } else {
        alert("login Failed");
        return;
    }
});

loadIssue();