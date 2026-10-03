const body=document.body;
const themeBtn=document.getElementById("themeBtn");
const saved=localStorage.getItem("bd-theme");
if(saved==="light") body.classList.add("light");
themeBtn.addEventListener("click",()=>{
  body.classList.toggle("light");
  localStorage.setItem("bd-theme",body.classList.contains("light")?"light":"dark");
});
document.getElementById("year").textContent=new Date().getFullYear();

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
