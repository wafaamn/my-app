let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btttn");

function menuToggle(){
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}
function formToggle(){
    const toggleform = document.querySelector('.form');
    toggleform.classList.toggle('active');
   
  }
  function formTogglee(){
    const toggleformm = document.querySelector('.formm');
    toggleformm.classList.toggle('activee');
   }
closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
} 