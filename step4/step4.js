const btnNext = document.querySelector(".button-right");

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
      var baseUrl = "../step5/step5.html?value=";
      var url = baseUrl + encodeURIComponent(name);
      window.location.href = url;
    });
  }

  elmName.innerText = name;
  if (name.length <= 1) {
    elmName.style.transform = "translate(130%, 80%) rotate(-3deg)";
    return;
  }
  if (name.length <= 2) {
    elmName.style.fontSize = "40px";
    elmName.style.transform = "translate(40%, 80%) rotate(-3deg)";
    return;
  }
  if (name.length <= 4) {
    console.log("VÀO nè");
    elmName.style.transform = "translate(3%, 100%) rotate(-6deg)";
    elmName.style.fontSize = "30px";
    return;
  }
  if (name.length <= 6) {
    elmName.style.transform = "translate(-5%, 150%) rotate(-6deg)";
    elmName.style.fontSize = "20px";
    return;
  }
});
