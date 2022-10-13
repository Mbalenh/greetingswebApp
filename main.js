var hamburber = document.querySelector(".hamb");
var navlist = document.querySelector(".nav-list");
var links = document.querySelector(".nav-list li");

hamburber.addEventListener("click",function(){
    this.classList.toggle("click");
    navlist.classList.toggle("open");
});