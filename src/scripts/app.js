

"use strict";


document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        let newWidth, newHeight;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile) {
            newWidth = 300;
            newHeight = 400;
        } else {
            newWidth = 500;
            newHeight = 400;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    const drawRadio = document.getElementById('drawRadio');
    const eraseRadio = document.getElementById('eraseRadio');
    const colorPicker = document.getElementById('colorPicker');
    const sizeSlider = document.getElementById('sizeSlider');
    const clearBtn = document.getElementById('clearBtn');

    let isDrawing = false;
    let mode = 'draw'; // Mode de dessin par défaut
    let currentColor = '#000000'; // Couleur de dessin par défaut
    let currentSize = 3; // Taille de dessin par défaut

    // Fonction pour changer le mode de dessin
    function changeMode(newMode) {
        mode = newMode;
        if (mode === 'erase') {
            currentColor = '#ffffff'; // Couleur d'effacement est blanche
        } else {
            currentColor = colorPicker.value; // Utilise la couleur choisie par l'utilisateur
        }
    }

    // Fonction pour effacer tout le contenu du canevas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Gestionnaire d'événement pour le bouton "Clear All"
    clearBtn.addEventListener('click', clearCanvas);

    // Gestionnaire d'événement pour le bouton radio Draw
    drawRadio.addEventListener('change', function() {
        changeMode('draw');
    });

    // Gestionnaire d'événement pour le bouton radio Erase
    eraseRadio.addEventListener('change', function() {
        changeMode('erase');
    });

    // Gestionnaire d'événement pour le sélecteur de couleur
    colorPicker.addEventListener('change', function() {
        currentColor = colorPicker.value;
    });

    // Gestionnaire d'événement pour le sélecteur de taille
    sizeSlider.addEventListener('input', function() {
        currentSize = parseInt(sizeSlider.value);
    });

    // Fonction pour dessiner ou effacer en fonction du mode
    function onPaint() {
        if (mode === 'erase') {
            ctx.globalCompositeOperation = 'destination-out'; // Utiliser la composition pour effacer
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Utiliser la composition pour dessiner
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = currentSize;
        }
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

    // Initialiser la taille du canevas
    resizeCanvas();

    // Coordonnées de la souris
    const mouse = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (isDrawing) {
            onPaint();
        }
    });

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint);
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
        canvas.removeEventListener('mousemove', onPaint);
    });

    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
        canvas.removeEventListener('mousemove', onPaint);
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