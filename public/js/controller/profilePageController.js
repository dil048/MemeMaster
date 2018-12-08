import {
    changePassword, getUserInfo
} from "../firebase/firebaseActions.js"
import {
    authentication
} from "../firebase/credentials.js"

let changePwBtn = document.getElementById("changePwBtn");
let uploadBtn = document.getElementById("uploadBtn");
var modal = document.getElementById('myModal');
var signOutBtn = document.getElementById('signoutBtn');
var closeBtn = document.getElementById("closeBtn");
var confirmChangeBtn = document.getElementById("confirmChangeBtn");
let userInfo;

window.onload = () => {
    authentication.onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
            getUserInfo(user,setUserInfo);
        } else {
            console.log("user not signed in");
        }
    });

    //nameText[0].innerHTML = "Username: " + user.displayName;
};
function setUserInfo(user, name,email,profileImgUrl){
    let signinBtn = document.getElementById("signInBtn");
    console.log(profileImgUrl);
    signinBtn.textContent = name;
    //signinBtn.innerHTML = "<img src = " + profileImgUrl + ">";

    userInfo = {
        curruser : user, 
        username : name,
        useremail : email,
        userphotoUrl : profileImgUrl,
        //userid : user.uid,
    }
}
changePwBtn.onclick = () => {
    modal.style.display = "block";
}

confirmChangeBtn.onclick =() => {
    let password1 = document.getElementById("newPassword");
    let password2 = document.getElementById("confirmPassword");
    let originalPassword = document.getElementById("originalPassword");
    if (password1.value != password2.value) {
        alert("New Passwords does not match. Please enter again.")
    } else {
        changePassword(userInfo.curruser, originalPassword.value, password1.value);
    }
    password1.value = "";
    password2.value = "";
    originalPassword.value = "";
}

signOutBtn.onclick = () => {
    authentication.signOut().then(() => {
        console.log('Signed Out');
        alert('Sign Out successfull!');
        window.location.href = "./index.html"
    }).catch((error) => {
        console.error('Sign Out Error', error);
    });
}

closeBtn.onclick = () => {
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