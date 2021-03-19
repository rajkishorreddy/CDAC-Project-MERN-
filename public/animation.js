const animatedSection = document.querySelector(".animated-area");
console.log(animatedSection);
const creteAnimatin = () => {
  const design = document.createElement("span");
  design.style.left = Math.random() * window.innerWidth + "px";
  animatedSection.append(design);
  setTimeout(() => {
    design.remove();
  }, 2000);
};
setInterval(creteAnimatin, 100);
