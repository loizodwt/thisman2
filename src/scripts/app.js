
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




