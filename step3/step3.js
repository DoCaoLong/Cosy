const btnNext = document.querySelector(".button-right");
const btnPre = document.querySelector(".button-left");

$(function () {
  if (btnNext) {
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "../step4/step4.html";
    });
  }
  if (btnPre) {
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Pre");
    });
  }
});
