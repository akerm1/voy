// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNTDHR67L48F1nPReRs2dSoQ-PxgNKWYM",
  authDomain: "login2-d485e.firebaseapp.com",
  projectId: "login2-d485e",
  storageBucket: "login2-d485e",
  messagingSenderId: "602998933832",
  appId: "1:602998933832:web:a397944522901f3c12cb7d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  const emailSpan = document.getElementById('email');
  const userNameSpan = document.getElementById('userName');
  const changePasswordBtn = document.getElementById('changePasswordBtn');
  const signOutBtn = document.getElementById('signOutBtn');
  
  console.log('Elements:', emailSpan, userNameSpan, changePasswordBtn, signOutBtn);
  
  // Display user info
  auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user);
    if (user) {
      emailSpan.textContent = user.email || 'No email';
      userNameSpan.textContent = user.displayName || 'No username';
    } else {
      emailSpan.textContent = 'Not logged in';
      userNameSpan.textContent = 'Not logged in';
    }
  });

  // Handle Sign Out
  signOutBtn.addEventListener('click', () => {
    console.log('Sign Out button clicked');
    auth.signOut().then(() => {
      console.log('Sign out successful');
      alert('Successfully signed out');
      window.location.href = 'sign.html'; // Redirect to sign-in page or home page
    }).catch((error) => {
      console.error('Sign Out Error', error);
      alert('Error signing out');
    });
  });

  // Handle Change Password
  changePasswordBtn.addEventListener('click', () => {
    console.log('Change Password button clicked');
    const user = auth.currentUser;
    console.log('Current user:', user);

    if (user) {
      const newPassword = prompt('Enter new password:');
      console.log('New password entered:', newPassword);

      if (newPassword) {
        user.updatePassword(newPassword).then(() => {
          console.log('Password changed successfully');
          alert('Password changed successfully');
        }).catch((error) => {
          console.error('Error changing password', error);
          alert('Error changing password');
        });
      } else {
        console.log('No new password entered');
      }
    } else {
      alert('No user is logged in');
    }
  });
});

