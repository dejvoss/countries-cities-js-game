// Initialize User name form by clicking get started button
function openUserNameForm() {
    document.getElementById("userNameForm").style.display = "block";

}
// Close user name form by clicking cancel
function closeUserNameForm() {
    document.getElementById("userNameForm").style.display = "none";
  }

//   Click next in user name form
var userName;

function openLeterForm() {
    var inputForm = document.getElementById("userNameInp");
    if (inputForm.value == "") {
        document.getElementById("noMessSpan").style.display = "block";
    } else {
        userName = inputForm.value;
    }      
    console.log(userName);
};

$("#userNameInp").focus(function(){
    document.getElementById("noMessSpan").style.display = "none";
});

