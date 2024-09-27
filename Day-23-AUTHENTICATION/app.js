import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOszdEc64TvZ3E_0DkqQLyykGC0KEAHaw",
    authDomain: "signup-login-16aa7.firebaseapp.com",
    databaseURL: "https://signup-login-16aa7-default-rtdb.firebaseio.com",
    projectId: "signup-login-16aa7",
    storageBucket: "signup-login-16aa7.appspot.com",
    messagingSenderId: "87290304115",
    appId: "1:87290304115:web:963f44f9a599f8335d7c06",
    measurementId: "G-5GN067QSQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Password toggle functionality
const toggles = document.getElementsByClassName('toggle-password');
Array.from(toggles).forEach(toggle => {
    toggle.addEventListener("click", () => {
        var input = document.querySelector(".pass");
        if (input.getAttribute("type") === "password") {
            input.setAttribute("type", "text");
            toggle.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M13.359 11.238l1.402 1.402a.75.75 0 0 1-1.06 1.06l-1.402-1.402a8.02 8.02 0 0 1-9.398 0l-1.402 1.402a.75.75 0 1 1-1.06-1.06l1.402-1.402a8.02 8.02 0 0 1 0-9.398L1.879 1.879a.75.75 0 0 1 1.06-1.06l1.402 1.402a8.02 8.02 0 0 1 9.398 0l1.402-1.402a.75.75 0 0 1 1.06 1.06l-1.402 1.402a8.02 8.02 0 0 1 0 9.398zM8 3a5.98 5.98 0 0 0-4.684 2.469l.803.803A4.978 4.978 0 0 1 8 5c1.657 0 3.156.805 4.107 2.087l.803-.803A5.978 5.978 0 0 0 8 3zm3 5a3 3 0 0 0-5.264-2.034L10.034 11.5A2.99 2.99 0 0 0 11 8zM8 11a3 3 0 0 1-2.107-.863l4.864-4.864A2.999 2.999 0 0 1 8 11z"/>
        </svg>`; // Your eye-slash icon HTML
        } else {
            input.setAttribute("type", "password");
            toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>`; // Your eye icon HTML
        }
    });
});

// Sign up
document.getElementById("s-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("s-email").value;
    const password = document.getElementById("s-pass").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            showToast("Account has been Created Successfully", "success");
            setTimeout(() => {
                window.location = './index.html';
            }, 3000);
        })
        .catch((error) => {
            showToast(error.message, "error");
        });
});

// Sign In
document.getElementById("l-btn")?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("l-email").value;
    const password = document.getElementById("l-pass").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            showToast("Account has been Logged in Successfully", "success");
            setTimeout(() => {
                window.location = './wellcome.html';
            }, 3000);
        })
        .catch((error) => {
            showToast(error.message, "error");
        });
});

// Google Sign-In
document.getElementById("l-g-btn")?.addEventListener("click", (e) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            showToast("Logged in with Google Successfully", "success");
            setTimeout(() => {
                window.location = './wellcome.html';
            }, 3000);
        })
        .catch((error) => {
            console.log(error);
            showToast(error.message, "error");
        });
});

// Function to display greeting
function displayGreeting() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("greeting").innerText = `Hello, ${user.email}!`;
        } else {
            window.location.href = "index.html"; // Change this to your login page URL
        }
    });
}

// Function to log out the user
function logoutUser() {
    auth.signOut().then(() => {
        window.location.href = "index.html"; // Change this to your login page URL
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
}

document.getElementById("logoutUser")?.addEventListener("click", logoutUser); // Pass the function as callback

// Toast message function
function showToast(message, type) {
    const toast = document.getElementById("toast");
    const toastClass = type === "success" ? "alert-success" : "bg-red-600";
    toast.innerHTML = `
        <div class="toast toast-top toast-end">
            <div class="alert ${toastClass} text-white">
                <span>${message}</span>
            </div>
        </div>`;
    setTimeout(() => {
        toast.innerHTML = ``;
    }, 3000);
}


document.getElementById("greeting")?displayGreeting():""