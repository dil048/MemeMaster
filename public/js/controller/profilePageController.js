import {
    changePassword, getUserInfo
} from "../firebase/firebaseActions.js"
import {
    authentication
} from "../firebase/credentials.js"

let changePwBtn = document.getElementById("changePwBtn");

let uploadBtn = document.getElementById("uploadBtn");
var modal = document.getElementById('myModal');
//console.log(modal);
// Get the <span> element that closes the modal
var closeBtn = document.getElementById("closeBtn");
var confirmChangeBtn = document.getElementById("confirmChangeBtn");

authentication.onAuthStateChanged(function(user) {
    if (user) {
        console.log(user);
    } else {
        // No user is signed in.
    }
});
//var user = authentication.currentUser;
var name, email, photoUrl, uid, emailVerified;
// if (user) {
//     console.log("signed in");
//     userInfo = getUserInfo(user);
// } else {
//     console.log("user not signed in");
// }

window.onload = () => {
    let nameText = document.getElementById("usernameTag");
    //nameText[0].innerHTML = "Username: " + user.displayName;
};

changePwBtn.onclick = () => {
    modal.style.display = "block";
}

confirmChangeBtn.onclick = function() {
    let password1 = document.getElementById("newPassword");
    let password2 = document.getElementById("confirmPassword");
    if (password1.value != password2.value) {
        alert("New Passwords does not match. Please enter again.")
        password1.value = "";
        password2.vallue = "";
        document.getElementById("originalPassword").value = "";
    } else {
        changePassword(user, password1.value);
        alert("Change password successfully!");
    }
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

uploadBtn.onclick = () => {

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}