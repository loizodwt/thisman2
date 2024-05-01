
"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.navbar__burger');
    const nav = document.querySelector('.navbar__nav');
  
    burger.addEventListener('click', function () {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  });
  