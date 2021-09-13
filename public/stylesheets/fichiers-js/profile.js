let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btttn");
const td = document.querySelectorAll(".td1");
let button = document.querySelector("#bbbtn");


function menuToggle(){
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}
closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

  // button.addEventListener("click", ()=>{
  //  td.forEach(td => {
  // td.innerHTML = '<input/>' ;})
  // });
// function enable() {
//   document.getElementById("mdp").disabled = false;
// }
button.addEventListener("click", () => {
    document.getElementById("mdp").disabled = false;
});
button.addEventListener("click", () => {
  document.getElementById("adr").disabled = false;
});
button.addEventListener("click", () => {
  document.getElementById("numtel").disabled = false;
});



// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
} 

// choose image //
  //declearing html elements

const imgDiv = document.querySelector('.hover');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

//if user hover on img div 

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a foto to upload

file.addEventListener('change', function(){
    //this refers to file
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader is a predefined function of JS

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);

        
    }
});