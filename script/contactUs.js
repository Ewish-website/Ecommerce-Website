// function toggle(){
//     var blur=document.getElementById("blur");
//     blur.classList.toggle("active");

//     var popup=document.getElementById("popup");
//     popup.classList.toggle("active");

// }

//const popupsend =document.getElementById("popup-send");

// function validForm(){
//     var FullName = document.getElementById("fname");
//     var email = document.getElementById("email");
//     var msg = document.getElementById("msg");
//     var errorNodes = document.querySelectorAll(".error");

//     if(FullName.value == ""){
//         FullName.nextElementSibling.style.display ="block";
//         FullName.style.border ="1px solid red";
//         return false;
//     }else{
//         FullName.nextElementSibling.style.display ="none";
//         FullName.style.border ="1px solid transparent";
//     }


// }

let popup = document.getElementById("popup");
let screen = document.getElementById("blur");


function openPopup(event){
    event.preventDefault();
    console.log('cliked')
    popup.classList.add("open-popup");
    screen.classList.add("active");
}
function closePopup(){
    popup.classList.remove("open-popup");
    screen.classList.remove("active");
}
