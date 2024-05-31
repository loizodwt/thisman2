"use strict";

document.addEventListener('DOMContentLoaded', function() {

    
    // Récupérer toutes les sections du rapport
    var sections = document.querySelectorAll(".report-section");

    // Cacher toutes les sections sauf la première
    for (var i = 1; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Récupérer les boutons "Next"
    var nextButtons = document.querySelectorAll(".thisman__button--next");

    // Ajouter un gestionnaire d'événement à chaque bouton "Next"
    nextButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            // Récupérer le texte du rapport et le sauvegarder dans le stockage local
            var reportText = document.getElementById('report-text').value;
            localStorage.setItem('reportText', reportText);

            // Récupérer les données du canvas et les sauvegarder dans le stockage local
            var canvas = document.getElementById('canvas');
            var canvasData = canvas.toDataURL();
            localStorage.setItem('canvasImage', canvasData);

            // Créer une image combinée et la sauvegarder dans le stockage local
            var combinedImage = createCombinedImage();
            localStorage.setItem('combinedImage', combinedImage);

            // Afficher les données sauvegardées dans la section de récapitulatif
            var recapSection = document.querySelector(".section_5_recap");
            if (recapSection) {
                recapSection.querySelector('.recap-image--testimony .content').textContent = reportText;

                var img1 = new Image();
                img1.src = canvasData;
                recapSection.querySelector('.recap-image--portrait .content').innerHTML = '';
                recapSection.querySelector('.recap-image--portrait .content').appendChild(img1);

                // Créer une grille pour les images de vêtements dans la section de récapitulatif
                var recapImages = recapSection.querySelector('.recap-image--appearance .content');
                recapImages.innerHTML = ''; // Clear the content
                
                var images = createGridImages();
                images.forEach(image => {
                    recapImages.appendChild(image);
                });
            }

            // Passer à la prochaine section
            sections[index].style.display = "none"; 
            if (index + 1 < sections.length) {
                sections[index + 1].style.display = "block"; 
            } else {
                console.log("End of sections reached.");
            }
        });
    });

    // Récupérer les données sauvegardées dans le stockage local et les afficher dans la section de récapitulatif
    var recapSection = document.querySelector(".section_5_recap");


    if (recapSection) {
        var savedReportText = localStorage.getItem('reportText');
        if (savedReportText) {
            recapSection.querySelector('.recap-image--testimony .content').textContent = savedReportText;
        }

        var savedCanvasImage = localStorage.getItem('canvasImage');
        if (savedCanvasImage) {
            var img = new Image();
            img.src = savedCanvasImage;
            recapSection.querySelector('.recap-image--portrait .content').appendChild(img);
        }

        // Créer une grille pour les images de vêtements dans la section de récapitulatif
        var recapImages = recapSection.querySelector('.recap-image--appearance .content');
        recapImages.innerHTML = ''; // Clear the content
        
        var images = createGridImages();
        images.forEach(image => {
            recapImages.appendChild(image);
        });
    }

    // Fonction pour créer une image combinée à partir du canvas et des vêtements sélectionnés
    function createCombinedImage() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const images = [];

        const bodyParts = ['tm_top', 'tm_bottom', 'tm_shoes', 'tm_accessoiries'];
        bodyParts.forEach(part => {
            const activeImage = document.querySelector(`.grid__item-images[data-target="${part}"] .grid__item-image.active`);
            if (activeImage) {
                images.push(activeImage);
            }
        });

        canvas.width = 400;
        canvas.height = 400;

        let yOffset = 0;
        images.forEach((image, index) => {
            ctx.drawImage(image, 0, yOffset, canvas.width, canvas.height / images.length);
            yOffset += canvas.height / images.length;
        });

        return canvas.toDataURL();
    }

    // Fonction pour créer une grille d'images de vêtements pour la section de récapitulatif
    function createGridImages() {
        const images = [];
        const bodyParts = ['tm_top', 'tm_bottom', 'tm_shoes', 'tm_accessoiries'];
        bodyParts.forEach(part => {
            const activeImage = document.querySelector(`.grid__item-images[data-target="${part}"] .grid__item-image.active`);
            if (activeImage) {
                const image = new Image();
                image.src = activeImage.src;
                if (part === 'tm_top' || part === 'tm_bottom') {
                    image.classList.add('left');
                } else {
                    image.classList.add('right');
                }
                images.push(image);
            }
        });
        return images;
    }

    
// canvas responsive
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        let newWidth, newHeight;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        if (isMobile) {
            newWidth = 250;
            newHeight = 300;
        } else {
            newWidth = 500;
            newHeight = 400;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
    }
    
// paint
    window.addEventListener("resize", resizeCanvas);

    const drawRadio = document.getElementById('drawRadio');
    const eraseRadio = document.getElementById('eraseRadio');
    const colorPicker = document.getElementById('colorPicker');
    const sizeSlider = document.getElementById('sizeSlider');
    const clearBtn = document.getElementById('clearBtn');
  

    let isDrawing = false;
    let mode = 'draw';
    let currentColor = '#000000';
    let currentSize = 3;

    function changeMode(newMode) {
        mode = newMode;
        if (mode === 'erase') {
            currentColor = '#ffffff';
        } else {
            currentColor = colorPicker.value;
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    clearBtn.addEventListener('click', clearCanvas);

    drawRadio.addEventListener('change', function() {
        changeMode('draw');
    });

    eraseRadio.addEventListener('change', function() {
        changeMode('erase');
    });

    colorPicker.addEventListener('change', function() {
        currentColor = colorPicker.value;
    });

    sizeSlider.addEventListener('input', function() {
        currentSize = parseInt(sizeSlider.value);
    });


    function onPaint(mouse) {
      if( isDrawing ){

        if (mode === 'erase') {
          ctx.globalCompositeOperation = 'destination-out';
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = currentColor;
          ctx.lineWidth = currentSize;
        }
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    resizeCanvas();

    const mouse = { x: 0, y: 0 };

    const updateMouse = ( e ) => {
        const isTouched = e.changedTouches !== undefined;

        if (isTouched) {
            mouse.x = e.changedTouches[0].clientX - canvas.offsetLeft;
            mouse.y = e.changedTouches[0].clientY - canvas.offsetTop;
        } else {
            mouse.x = e.pageX - canvas.offsetLeft;
            mouse.y = e.pageY - canvas.offsetTop;
        }
    
        if (e.type === "touchstart" || e.type === "mousedown") {
            isDrawing = true;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        } else if (e.type === 'touchend' || e.type === "mouseup") {
            isDrawing = false;
        } else if (e.type === 'touchmove' || e.type === "mousemove") {
            if (isDrawing) {
                onPaint(mouse);
            }
        }
    
        if (isTouched && isDrawing) {
            e.preventDefault();
        }
    };
// Fonction pour sauvegarder les données du canvas lors du mouvement ou de la levée du curseur/toucher
function saveCanvasDataOnMove() {
    // Sauvegarder les données du canvas dans le rapport
    saveCanvasDataToReport();
}

// Ajouter les gestionnaires d'événement pour sauvegarder les données du canvas lors du mouvement ou de la levée du curseur/toucher
canvas.addEventListener('mouseup', saveCanvasDataOnMove);
canvas.addEventListener('touchend', saveCanvasDataOnMove);
canvas.addEventListener('mousemove', saveCanvasDataOnMove);
canvas.addEventListener('touchmove', saveCanvasDataOnMove);

    canvas.addEventListener('mousedown', updateMouse );
    canvas.addEventListener('mousemove', updateMouse );
    canvas.addEventListener('mouseup', updateMouse );
    canvas.addEventListener('touchstart', updateMouse );
    canvas.addEventListener('touchmove', updateMouse );
    canvas.addEventListener('touchend', updateMouse );


canvas.addEventListener('touchend', saveCanvasDataOnMove);


function saveCanvasDataOnMove() {

    saveCanvasDataToReport();
}


canvas.addEventListener('mouseup', saveCanvasDataOnMove);
canvas.addEventListener('touchend', saveCanvasDataOnMove);
canvas.addEventListener('mousemove', saveCanvasDataOnMove);
canvas.addEventListener('touchmove', saveCanvasDataOnMove);


    // Images clothes
    const arrowLeftButtons = document.querySelectorAll('.grid__arrow--left');
    const arrowRightButtons = document.querySelectorAll('.grid__arrow--right');

    // Afficher les premiers vêtements actifs sur le corps
    const initialImageContainers = document.querySelectorAll('.grid__item-images');
    initialImageContainers.forEach(function(container) {
        const initialActiveImage = container.querySelector('.grid__item-image.active');
        if (initialActiveImage) {
            updateBodyWithImage(initialActiveImage, container);
        }
    });

    function updateBodyWithImage(image, container) {
        const bodyTarget = container.getAttribute("data-target");
        const bodyTargetElement = document.getElementById(bodyTarget);
        if (image && bodyTargetElement) {
            bodyTargetElement.style.backgroundImage = 'url(' + image.src + ')';
        }
    }

   arrowLeftButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            changeImage(this.parentNode.parentNode.querySelector('.grid__item-images'), 'previous');
        });
    });

    arrowRightButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            changeImage(this.parentNode.parentNode.querySelector('.grid__item-images'), 'next');
        });
    });

    function changeImage(imageContainer, direction) {
        const images = Array.from(imageContainer.querySelectorAll('.grid__item-image'));
        const currentIndex = images.findIndex(image => image.classList.contains('active'));
        const imageCount = images.length;

        let newIndex;
        let currentImage;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % imageCount;
        } else if (direction === 'previous') {
            newIndex = (currentIndex - 1 + imageCount) % imageCount;
        } else {
            return; 
        }

        images.forEach((image, index) => {
            image.classList.remove('active');
            if (index === newIndex) {
                image.classList.add('active');
                currentImage = image;
            }
        });

        updateBodyWithImage(currentImage, imageContainer);
    }





    
});

//deroulant

const dropdown = document.querySelector('.section1-contribution__dropdown-select');
const contents = document.querySelectorAll('.section1-contribution__content');

function updateContentVisibility() {
  const selectedValue = dropdown.value;

  contents.forEach(content => {
    if (content.classList.contains(`section1-contribution__content--${selectedValue}`)) {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  });
}

dropdown.addEventListener('change', updateContentVisibility);


updateContentVisibility();

