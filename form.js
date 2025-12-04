// REGISTER USER
function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const msg = document.getElementById("regError");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === email)) {
        msg.style.color = "red";
        msg.textContent = "Email already exists!";
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.textContent = "Registration successful! Redirecting to login...";

    setTimeout(() => {
        returnLogin();
    }, 1200);
}

// Navigate to login page from register page
function returnLogin() {
    window.location.href = "login.html"; // replace with your login page filename
}

// Navigate to register page from login page
function returnRegister() {
    window.location.href = "register.html"; // replace with your register page filename
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
        msg.textContent = "Wrong password!";
        return;
    }

    // Generate fake JWT token
    const token = generateFakeJWT();
    localStorage.setItem("auth_token", token);
    localStorage.setItem("current_user", email);

    msg.style.color = "green";
    msg.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
        window.location.href = "portfolio.html"; // replace with your profile page
    }, 900);
}

// Generate a simple JWT-like random token
function generateFakeJWT() {
    const randomPart = () =>
        btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))));
    return `${randomPart()}.${randomPart()}.${randomPart()}`;
}
