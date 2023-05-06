$(function () {
  const btnNext = document.querySelector(".button-right");
  const btnPre = document.querySelector(".button-left");
  const elmName = document.querySelector(".name-customer");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get("value");

  if (btnNext) {
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      var baseUrl = "../step4/step4.html?value=";
      var url = baseUrl + encodeURIComponent(name);
      window.location.href = url;
    });
  }
  if (btnPre) {
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Pre");
    });
  }

  elmName.innerText = name;
  if (name.length <= 1) {
    elmName.style.transform = "translate(130%, 80%) rotate(-3deg)";
    return;
  }
  if (name.length <= 2) {
    elmName.style.transform = "translate(40%, 80%) rotate(-3deg)";
    return;
  }
  if (name.length <= 4) {
    elmName.style.transform = "translate(3%, 105%) rotate(-6deg)";
    elmName.style.fontSize = "30px";
    return;
  }
  if (name.length <= 6) {
    elmName.style.transform = "translate(0%, 148%) rotate(-6deg)";
    elmName.style.fontSize = "20px";
    return;
  }
});
