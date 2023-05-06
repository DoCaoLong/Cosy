const btnNext = document.querySelector(".button-right");

$(function () {
  if (btnNext) {
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "../step5/step5.html";
    });
  }
});
