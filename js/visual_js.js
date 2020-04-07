// Initialize User name form by clicking get started button
function openUserNameForm() {
    document.getElementById("userNameForm").style.display = "block";

}
// Close user name form by clicking cancel
function closeUserNameForm() {
    document.getElementById("userNameInp").value = "";
    document.getElementById("userNameForm").style.display = "none";
    document.getElementById("gameSettings").style.display = "none"; 
    
  }

//   Click next in user name form
var userName; //declare global variable user name

function openSettings() {
    var inputForm = document.getElementById("userNameInp");
    if (inputForm.value == "") {
        document.getElementById("noMessSpan").style.display = "block"; // show message when userName field is empty
    } else {
        userName = inputForm.value;
        document.getElementById("userNameForm").style.display = "none"; // close username form
        document.getElementById("gameSettings").style.display = "block";   // open game settings form
    }      
    console.log(userName);
};

// remove message when user name was empty but user click on user name input field
$("#userNameInp").focus(function(){
    document.getElementById("noMessSpan").style.display = "none";
});

// game settings category buttons - select, unselect all
document.getElementById("selectAllCat").addEventListener("click", function(){
    var inputCheck = document.getElementById("setCatCheckboxes").getElementsByTagName("input");
    for (i=0; i < inputCheck.length; i++) {
        inputCheck[i].checked = true;
    }
})


document.getElementById("unSelectAllCat").addEventListener("click", function(){
    var inputCheck = document.getElementById("setCatCheckboxes").getElementsByTagName("input");
    for (i=0; i < inputCheck.length; i++) {
        inputCheck[i].checked = false;
    }
})