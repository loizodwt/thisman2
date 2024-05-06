
/////pseudooooo
"use strict";


document.addEventListener('DOMContentLoaded', function() {
 
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // Taille initiale du canvas
  const initialWidth = 500;
  const initialHeight = 500; 

  // Définir la taille initiale du canvas
  canvas.width = initialWidth;
  canvas.height = initialHeight;

  let painting = false;
  let erasing = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function endPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;
    // Obtenir les coordonnées de la souris par rapport au canvas
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;
    ctx.lineWidth = document.getElementById('sizeSlider').value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? 'white' : document.getElementById('colorPicker').value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);

  document.getElementById('drawRadio').addEventListener('change', function() {
    erasing = false;
  });

  document.getElementById('eraseRadio').addEventListener('change', function() {
    erasing = true;
  });

  document.getElementById('clearBtn').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });










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
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
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