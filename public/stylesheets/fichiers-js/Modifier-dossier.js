let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btttn");
const td = document.querySelectorAll(".td1");
let button = document.querySelector("#bbbtn");



let calculate = document.getElementById("calculer")
calculate.addEventListener("click", ()=>{
  let poids = document.getElementById("Poids").value;
let taille = document.getElementById("Taille").value;
let imc = poids/(taille/100*taille/100);
document.getElementById("IMC").value = imc.toFixed(2); 
});


function menuToggle(){
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active')
}
closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});

  //button.addEventListener("click", ()=>{
   // td.forEach(td => {
    //td.innerHTML = '<input>' ;})
  //});


// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
} 