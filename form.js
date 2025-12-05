// REGISTER USER
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const msg = document.getElementById("regError");

    let users = JSON.parse(localStorage.getItem("users")) || []; // is it okay to delete the empty array []??

    if (users.some(ubong => ubong.email === email)) {
        msg.style.color = "red";
        msg.textContent = "Email already exists!";
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.textContent = "Registration successfull!";

    setTimeout(() => {
        returnLogin();
    }, 1000);
}

// switching to login page from register page
function returnLogin() {
    window.location.href = "login.html"; 
}

// Switching to register page from login page
function returnRegister() {
    window.location.href = "register.html"; 
}

// LOGIN USER
function login(event) {
    event.preventDefault();

    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    const msg = document.getElementById("message");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(ubong => ubong.email === email);

    if (!user) {
        msg.style.color = "red";
        msg.textContent = "User not found!";
        return;
    }

    if (user.password !== password) {
        msg.style.color = "red";
        msg.textContent = "Incorrect password!";
        return;
    }

    // Generating JWT token
    const token = generateFakeJWT();
    localStorage.setItem("auth_token", token);
    localStorage.setItem("current_user", email);

    msg.style.color = "green";
    msg.textContent = "Login successful!;

    setTimeout(() => {
        window.location.href = "portfolio.html"; 
    }, 900);
};
