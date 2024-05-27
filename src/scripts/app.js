"use strict";

document.addEventListener('DOMContentLoaded', function() {
    // Hide all sections except the first one
    var sections = document.querySelectorAll(".report-section");
    for (var i = 1; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    // Show the next section when the "Next Step" button is clicked
    var nextButtons = document.querySelectorAll(".thisman__button--next");
    nextButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            // Save textarea content to local storage
            var reportText = document.getElementById('report-text').value;
            localStorage.setItem('reportText', reportText);

            // Save canvas content to local storage
            var canvas = document.getElementById('canvas');
            var canvasData = canvas.toDataURL();
            localStorage.setItem('canvasImage', canvasData);

            sections[index].style.display = "none"; // Hide current section
            if (index + 1 < sections.length) {
                sections[index + 1].style.display = "block"; // Show next section
            } else {
                // If it's the last section, show a message or perform any other action
                console.log("End of sections reached.");
            }
        });
    });

    // Display saved textarea content in the recap section
    var recapSection = document.querySelector(".section_5_recap");
    if (recapSection) {
        var savedReportText = localStorage.getItem('reportText');
        if (savedReportText) {
            recapSection.querySelector('.recap-image--testimony .content').textContent = savedReportText;
        }

        // Display saved canvas content in the recap section
        var savedCanvasImage = localStorage.getItem('canvasImage');
        if (savedCanvasImage) {
            var img = new Image();
            img.src = savedCanvasImage;
            recapSection.querySelector('.recap-image--portrait .content').appendChild(img);
        }
    }

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
    const fileInput = document.getElementById('fileInput');

    let isDrawing = false;
    let mode = 'draw'; // Default drawing mode
    let currentColor = '#000000'; // Default drawing color
    let currentSize = 3; // Default drawing size

    // Function to change the drawing mode
    function changeMode(newMode) {
        mode = newMode;
        if (mode === 'erase') {
            currentColor = '#ffffff'; // Erasing color is white
        } else {
            currentColor = colorPicker.value; // Use the user's chosen color
        }
    }

    // Function to clear the entire canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Event listener for the "Clear All" button
    clearBtn.addEventListener('click', clearCanvas);

    // Event listener for the Draw radio button
    drawRadio.addEventListener('change', function() {
        changeMode('draw');
    });

    // Event listener for the Erase radio button
    eraseRadio.addEventListener('change', function() {
        changeMode('erase');
    });

    // Event listener for the color picker
    colorPicker.addEventListener('change', function() {
        currentColor = colorPicker.value;
    });

    // Event listener for the size slider
    sizeSlider.addEventListener('input', function() {
        currentSize = parseInt(sizeSlider.value);
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0]; // Get the selected file

        // Handle the file here, e.g., display it in an image or process it in another way
    });

    // Function to draw or erase based on the mode
    function onPaint(mouse) {
        if (mode === 'erase') {
            ctx.globalCompositeOperation = 'destination-out'; // Use composition to erase
        } else {
            ctx.globalCompositeOperation = 'source-over'; // Use composition to draw
            ctx.strokeStyle = currentColor;
            ctx.lineWidth = currentSize;
        }
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

    // Initialize the canvas size
    resizeCanvas();

    // Mouse coordinates
    const mouse = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (isDrawing) {
            onPaint(mouse);
        }
    });

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', function() {
            onPaint(mouse);
        });
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
        canvas.removeEventListener('mousemove', function() {
            onPaint(mouse);
        });
    });

    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
        canvas.removeEventListener('mousemove', function() {
            onPaint(mouse);
        });
    });














     // Images clothes

     const arrowLeftButtons = document.querySelectorAll('.grid__arrow--left');
     const arrowRightButtons = document.querySelectorAll('.grid__arrow--right');
 
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
 
 /* 
     // Charger le pseudo enregistré lorsque la page est chargée
     var pseudoEnregistre = localStorage.getItem("pseudo");
     if (pseudoEnregistre) {
         document.getElementById("pseudoAffiche").innerText = pseudoEnregistre;
     }
 
     document.querySelector('.bouton__enregistrer').addEventListener('click', function() {
         sauvegarderPseudo();
     });
 
     function sauvegarderPseudo() {
         var pseudo = document.getElementById("pseudoInput").value;
         localStorage.setItem("pseudo", pseudo);
         document.getElementById("pseudoAffiche").innerText = pseudo;
     }
 */
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
         }
 
         images.forEach((image, index) => {
             image.classList.remove('active');
             if (index === newIndex) {
                 image.classList.add('active');
                 currentImage = image;
             }
         });
 
         // Mettre à jour le corps
         let bodyTarget = imageContainer.getAttribute("data-target");
         let bodyTargetElement = document.getElementById(bodyTarget);
         if (currentImage && bodyTargetElement) {
             bodyTargetElement.style.backgroundImage = 'url(' + currentImage.src + ')';
         }
     }
 
 
 
 
 
 
 
 
 
 
 

     
});