// Initialize User name form by clicking get started button
function openUserNameForm() {
    document.getElementById("userNameForm").style.display = "block";

}
// Close user name form by clicking cancel
function closeUserNameForm() {
    document.getElementById("userNameInp").value = "";
    document.getElementById("userNameForm").style.display = "none";
    
  }

//   Click next in user name form
var userName;

function openLeterForm() {
    var inputForm = document.getElementById("userNameInp");
    if (inputForm.value == "") {
        document.getElementById("noMessSpan").style.display = "block"; // show message when userName field is empty
    } else {
        userName = inputForm.value;
        document.getElementById("userNameForm").style.display = "none";
        document.getElementById("gameModeForm").style.display = "block";
    }      
    console.log(userName);
};

// remove message when user name was empty but user click on user name input field
$("#userNameInp").focus(function(){
    document.getElementById("noMessSpan").style.display = "none";
});

