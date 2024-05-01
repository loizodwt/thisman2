
/////pseudooooo



document.addEventListener('DOMContentLoaded', function() {
 
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
