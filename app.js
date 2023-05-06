let current_fs, next_fs, previous_fs; //fieldsets
let left, opacity, scale;
let animating;
var form_count = 1;
const usernameEle = document.getElementById("name");
const emailEle = document.getElementById("email");
const phoneEle = document.getElementById("phone");
const giftnameEle = document.getElementById("giftname");
const fileEle = document.getElementById("image");
const btnRegister = document.getElementById("btn-register");
const inputEles = document.querySelectorAll(".input-row");
const wraperImg = document.querySelector(".wraper");
const iconLogo = document.querySelector(".logo");
const cookie = document.querySelector(".cookie");
const containImage = document.querySelector(".container-cosy");
const btnLogout = document.querySelector("#btn-logout");
const btnSuccess = document.querySelector(".btn-success");
const noteCosy = document.querySelector(".note-cosy");

$(function () {
  function next(e) {
    e?.preventDefault();

    if (form_count === 2) {
      console.log("vào đây mấy lần");
      const isValid = btnRegisterrr();
      if (!isValid) return;
    }
    console.log("log");
    form_count++;

    if (form_count === 2 || form_count === 5) {
      noteCosy.style.display = "block";
    } else {
      noteCosy.style.display = "none";
    }
    if (form_count === 2 || form_count === 3) {
      if (window.innerHeight < window.innerWidth) {
        wraperImg.style.height = "fit-content";
      }
    } else {
      // wraperImg.style.height = "100%";
    }
    if (form_count === 5) {
      if (window.innerHeight < window.innerWidth) {
        wraperImg.style.backgroundImage =
          "url('./images/bg-final-landscape.png')";
        wraperImg.style.backgroundSize = "contain";
        cookie.style.width = "400px";
      } else {
        wraperImg.style.backgroundImage = "url('./images/bg-final.png')";
        cookie.style.width = "140%";
      }
      wraperImg.style.transition = "all 0.3s";
      wraperImg.style.height = "auto";
      iconLogo.style.display = "none";
      btnSuccess.style.display = "flex";
    } else if (form_count == 2) {
      wraperImg.style.backgroundImage = "url('./images/bg-main.png')";
      if (window.innerHeight > window.innerWidth) {
        containImage.style.position = "relative";
        containImage.style.height = "auto";
      }
    } else {
      wraperImg.style.backgroundImage = "url('./images/bg-step-1.png')";
      if (window.innerHeight > window.innerWidth) {
        containImage.style.position = "fixed";
        containImage.style.height = "100%";
      }
    }

    if (animating) return false;
    animating = true;
    current_fs = $(this).parent().parent();
    console.log("current_fs", current_fs);
    next_fs = $(this).parent().parent().next();
    console.log("next_fs", next_fs);

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = now * 50 + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            transform: "scale(" + scale + ")",
            position: "absolute",
          });
          next_fs.css({ left: left, opacity: opacity });
        },
        duration: 0,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
    console.log("vo", form_count);
  }

  $(".next").click(next);

  $(".previous").click((e) => {
    e.preventDefault();
    wraperImg.style.backgroundImage = "url('./images/bg-rectangle.jpeg')";
    if (animating) return false;
    animating = true;
    form_count--;
    console.log("previous", form_count);
    current_fs = $(this).parent().parent();
    previous_fs = $(this).parent().parent().prev();

    //show the previous fieldset
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = (1 - now) * 50 + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ left: left });
          previous_fs.css({
            transform: "scale(" + scale + ")",
            opacity: opacity,
          });
        },
        duration: 0,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });

  if (btnLogout) {
    btnLogout.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Logout");
    });
  }
});
