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

  button.addEventListener("click", ()=>{
   td.forEach(td => {
  td.innerHTML = '<input>' ;})
  });


// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
} 