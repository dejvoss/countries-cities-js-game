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

};

// remove message when user name was empty but user click on user name input field
$("#userNameInp").focus(function(){
    document.getElementById("noMessSpan").style.display = "none";
});

// game settings category buttons - select, unselect all
var inputCheck = document.getElementById("setCatCheckboxes").getElementsByTagName("input");
document.getElementById("selectAllCat").addEventListener("click", function(){
    for (i=0; i < inputCheck.length; i++) {
        inputCheck[i].checked = true;
    }
});

document.getElementById("unSelectAllCat").addEventListener("click", function(){
    for (i=0; i < inputCheck.length; i++) {
        inputCheck[i].checked = false;
    }
});

// save button in game settings
    //declare global variable for difficult level and setted categories
var difLevel;
var selCategor =[];
// click save settings button
document.getElementById("saveSettBtn").addEventListener("click", function(){
    difLevel = document.getElementById("difLevel").value;
    var tempSelCategor =[];             //declare local empty variable for categoriers
    for (i=0; i< inputCheck.length; i++){   //check if category is choosen and add to the local category variable
        if (inputCheck[i].checked === true){    
            tempSelCategor.push(inputCheck[i].value);
        }
    }
    selCategor = tempSelCategor; // assing local category variable to the global one 
});