const btnNext = document.querySelector(".button-right");

$(function () {
  const btnNext = document.querySelector(".button-right");
  const elmName = document.querySelector(".name-customer");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const name = urlParams.get("value");

  if (btnNext) {
    btnNext.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("KẾT thúc");
    });
  }

  elmName.innerText = name;
  if (name.length <= 1) {
    elmName.style.transform = "translate(130%, 90%) rotate(-3deg)";
    return;
  }
  if (name.length <= 2) {
    elmName.style.transform = "translate(40%, 90%) rotate(-3deg)";
    return;
  }
  if (name.length <= 4) {
    elmName.style.transform = "translate(3%, 120%) rotate(-6deg)";
    elmName.style.fontSize = "30px";
    return;
  }
  if (name.length <= 6) {
    elmName.style.transform = "translate(0%, 170%) rotate(-6deg)";
    elmName.style.fontSize = "20px";
    return;
  }
});
