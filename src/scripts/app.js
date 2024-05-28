"use strict";

document.addEventListener('DOMContentLoaded', function() {
    var sections = document.querySelectorAll(".report-section");
    for (var i = 1; i < sections.length; i++) {
        sections[i].style.display = "none";
    }

    var nextButtons = document.querySelectorAll(".thisman__button--next");
    nextButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            var reportText = document.getElementById('report-text').value;
            localStorage.setItem('reportText', reportText);

            var canvas = document.getElementById('canvas');
            var canvasData = canvas.toDataURL();
            localStorage.setItem('canvasImage', canvasData);

            var combinedImage = createCombinedImage();
            localStorage.setItem('combinedImage', combinedImage);

            var recapSection = document.querySelector(".section_5_recap");
            if (recapSection) {
                recapSection.querySelector('.recap-image--testimony .content').textContent = reportText;

                var img1 = new Image();
                img1.src = canvasData;
                recapSection.querySelector('.recap-image--portrait .content').innerHTML = '';
                recapSection.querySelector('.recap-image--portrait .content').appendChild(img1);

                var img2 = new Image();
                img2.src = combinedImage;
                recapSection.querySelector('.recap-image--appearance .content').innerHTML = '';
                recapSection.querySelector('.recap-image--appearance .content').appendChild(img2);
            }

            sections[index].style.display = "none"; 
            if (index + 1 < sections.length) {
                sections[index + 1].style.display = "block"; 
            } else {
                console.log("End of sections reached.");
            }
        });
    });

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

        var savedCombinedImage = localStorage.getItem('combinedImage');
        if (savedCombinedImage) {
            var img = new Image();
            img.src = savedCombinedImage;
            recapSection.querySelector('.recap-image--appearance .content').appendChild(img);
        }
    }

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

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
    });

    function onPaint(mouse) {
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

    resizeCanvas();

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

        // Update the body part's background image
        let bodyTarget = imageContainer.getAttribute("data-target");
        let bodyTargetElement = document.getElementById(bodyTarget);
        if (currentImage && bodyTargetElement) {
            bodyTargetElement.style.backgroundImage = 'url(' + currentImage.src + ')';
        }
    }








    
});

/////TESITONIES

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

/////TESITONIES
