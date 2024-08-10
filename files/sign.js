const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNTDHR67L48F1nPReRs2dSoQ-PxgNKWYM",
  authDomain: "login2-d485e.firebaseapp.com",
  projectId: "login2-d485e",
  storageBucket: "login2-d485e.appspot.com",
  messagingSenderId: "602998933832",
  appId: "1:602998933832:web:a397944522901f3c12cb7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign up form submission
const signUpForm = document.getElementById('signUpForm');
const signUpStatus = document.getElementById('signUpStatus'); // Reference to the status element
const signInForm = document.getElementById('signInForm'); // Reference to the sign-in form

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed up as:', user.email);
            signUpStatus.textContent = 'Sign up successful'; // Display success message
            signUpStatus.style.color = 'green'; // Optionally, set style for success
            // Clear form fields or do further actions upon success
            // Redirect to sign-in part or focus on sign-in form
            container.classList.remove("right-panel-active"); // Assuming container is your main container div
            // Alternatively, you can focus on the sign-in form:
            signInForm.scrollIntoView({ behavior: "smooth" });
        })
        .catch((error) => {
            console.error(error.message);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    signUpStatus.textContent = 'Email is already in use';
                    break;
                case 'auth/invalid-email':
                    signUpStatus.textContent = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    signUpStatus.textContent = 'Password is too weak';
                    break;
                default:
                    signUpStatus.textContent = 'Error: ' + error.message;
            }
            signUpStatus.style.color = 'red'; // Optionally, set style for error
            // Handle sign-up errors
        });
});

// Sign in form submission
// Sign in form submission
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const signInStatus = document.getElementById('signInStatus'); // Reference to the status element

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Signed in as:', user.email);
            signInStatus.textContent = 'Sign in successful'; // Display success message
            signInStatus.style.color = 'green'; // Optionally, set style for success
            // Redirect to the desired page after successful sign-in
            window.location.href = 'http://127.0.0.1:5500/index.html';
        })
        .catch((error) => {
            console.error(error.message);
            signInStatus.textContent = 'Sign in failed: ' + error.message; // Display error message
            signInStatus.style.color = 'red'; // Optionally, set style for error
            // Handle sign-in errors
        });
});
