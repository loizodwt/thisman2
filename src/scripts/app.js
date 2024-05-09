

"use strict";


document.addEventListener('DOMContentLoaded', function() {
 
  const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  let newWidth, newHeight;

  // Vérifie si l'appareil est un mobile
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) {
      // Pour les mobiles, définissez la largeur sur 100px et la hauteur sur 500px
      newWidth = 400;
      newHeight = 500;
  } else {
      // Pour les autres appareils, définissez la largeur sur 400px et la hauteur sur 300px
      newWidth = 500;
      newHeight = 400;
  }

  canvas.width = newWidth;
  canvas.height = newHeight;
}






function centerCanvasOnMobile() {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (isMobile) {
      const canvas = document.getElementById('canvas');
      const windowWidth = window.innerWidth;
      const canvasWidth = canvas.width;
      const marginLeft = (windowWidth - canvasWidth) / 2;
      canvas.style.marginLeft = marginLeft + 'px';
  }
}

// Appel de la fonction pour centrer le canvas au chargement de la page
window.addEventListener('load', centerCanvasOnMobile);











window.addEventListener("resize", resizeCanvas);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#000000';

// Coordonnées de la souris
const mouse = { x: 0, y: 0 };

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener("touchmove", function (e) {
    const touches = e.changedTouches;
    mouse.x = touches[0].pageX - this.offsetLeft;
    mouse.y = touches[0].pageY - this.offsetTop;
}, false);

canvas.addEventListener('mousedown', function (e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener("touchstart", function (e) {
    ctx.beginPath();
    const touches = e.changedTouches;
    mouse.x = touches[0].pageX - this.offsetLeft;
    mouse.y = touches[0].pageY - this.offsetTop;
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener("touchmove", onPaint, false);
}, false);

canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener("touchend", function () {
    canvas.removeEventListener("touchmove", onPaint, false);
}, false);

function onPaint() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
}







/////images clothes

  const arrowLeftButtons = document.querySelectorAll('.grid__arrow--left');
  const arrowRightButtons = document.querySelectorAll('.grid__arrow--right');

  arrowLeftButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      changeImage(this.parentNode.parentNode.querySelector('.grid__item-images'), 'previous');
    });
  });

  arrowRightButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      changeImage(this.parentNode.parentNode.querySelector('.grid__item-images'), 'next');
    });
  });





/////images clothes
















/////slider recap



const images = document.querySelectorAll('.slider__image');
let currentIndex = 0;

function showImage(index) {
  images.forEach((image, i) => {
    if (i === index) {
      image.classList.add('active'); // Ajouter la classe active à l'image affichée
    } else {
      image.classList.remove('active'); // Retirer la classe active des autres images
    }
  });
}


showImage(currentIndex);

document.querySelector('.slider__btn--prev').addEventListener('click', function () {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

document.querySelector('.slider__btn--next').addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});








  



  // Charger le pseudo enregistré lorsque la page est chargée
  var pseudoEnregistre = localStorage.getItem("pseudo");
  if (pseudoEnregistre) {
    document.getElementById("pseudoAffiche").innerText = pseudoEnregistre;
  }




});


document.querySelector('.bouton__enregistrer').addEventListener('click', function () {
    sauvegarderPseudo();
})
function sauvegarderPseudo() {
    var pseudo = document.getElementById("pseudoInput").value;
    localStorage.setItem("pseudo", pseudo);
    document.getElementById("pseudoAffiche").innerText = pseudo;
  }












/////images clothes


  function changeImage(imageContainer, direction) {
    const images = Array.from(imageContainer.querySelectorAll('.grid__item-image'));
    const currentIndex = images.findIndex(image => image.classList.contains('active'));
    const imageCount = images.length;
  
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % imageCount;
    } else if (direction === 'previous') {
      newIndex = (currentIndex - 1 + imageCount) % imageCount;
    }
  
    images.forEach((image, index) => {
      image.classList.remove('active');
      if (index === newIndex) {
        image.classList.add('active');
      }
    });
  }


  /////images clothes