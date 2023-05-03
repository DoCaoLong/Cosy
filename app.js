//jQuery time
let current_fs, next_fs, previous_fs; //fieldsets
let left, opacity, scale; //fieldset properties which we will animate
let animating; //flag to prevent quick multi-click glitches
var form_count = 1;
const usernameEle = document.getElementById("name");
const emailEle = document.getElementById("email");
const phoneEle = document.getElementById("phone");
const giftnameEle = document.getElementById("giftname");
const btnRegister = document.getElementById("btn-register");
const btnLogin = document.getElementById("btn-login");
const inputEles = document.querySelectorAll(".input-row");
const wraperImg = document.querySelector(".wraper");
const iconLogo = document.querySelector(".logo");
const cookie = document.querySelector(".cookie");
const btnLogout = document.querySelector("#btn-logout");

const btnSuccess = document.querySelector(".btn-success");

const noteCosy = document.querySelector(".note-cosy");

$(function () {
  $(".next").click(function (e) {
    e.preventDefault();
    form_count++;
    if (form_count === 2 || form_count === 4) {
      noteCosy.style.display = "block";
    } else {
      noteCosy.style.display = "none";
    }
    if (form_count === 2 || form_count === 3) {
      if (window.innerHeight < window.innerWidth) {
        wraperImg.style.height = "fit-content";
      }
    } else wraperImg.style.height = "100%";

    if (form_count === 4) {
      btnLogout.style.display = "block";
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
    } else {
      wraperImg.style.backgroundImage = "url('./images/bg-main.png')";
    }

    if (animating) return false;
    animating = true;
    current_fs = $(this).parent().parent();
    next_fs = $(this).parent().parent().next();

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
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });

  $(".previous").click(function (e) {
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
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: "easeInOutBack",
      }
    );
  });
  if (btnLogin) {
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      let username = document.getElementById("username");
      let password = document.getElementById("password");
      const errorUsername = document.querySelector(
        ".error-text-login-username"
      );
      const errorPassword = document.querySelector(
        ".error-text-login-password"
      );
      if (username.value == "") {
        errorUsername.style.display = "block";
        return;
      }
      if (password.value == "") {
        errorPassword.style.display = "block";
        return;
      }
      errorUsername.style.display = "none";
      errorPassword.style.display = "none";
      console.log({ username: username.value, password: password.value });
      window.location.href = "index.html";
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Logout");
    });
  }

  // validate form
  if (btnRegister) {
    btnRegister.addEventListener("click", function (e) {
      e.preventDefault();
      Array.from(inputEles).map((ele) =>
        ele.classList.remove("success", "error")
      );
      let isValid = checkValidate();
      if (isValid) {
        // handle submit
        console.log(isValid);
        alert("Gửi đăng ký thành công");
      }
    });
  }

  function checkValidate() {
    let usernameValue = usernameEle.value;
    let emailValue = emailEle.value;
    let phoneValue = phoneEle.value;
    let giftNameValue = phoneEle.value;
    let isCheck = true;
    form_count = 2;

    if (usernameValue == "") {
      setError(usernameEle, "Tên không được để trống");
      isCheck = false;
    } else {
      setSuccess(usernameEle);
    }

    if (giftNameValue == "") {
      setError(giftnameEle, "Tên quà tặng không được để trống");
      isCheck = false;
    } else {
      setSuccess(giftnameEle);
    }

    if (emailValue == "") {
      setError(emailEle, "Email không được để trống");
      isCheck = false;
    } else if (!isEmail(emailValue)) {
      setError(emailEle, "Email không đúng định dạng");
      isCheck = false;
    } else {
      setSuccess(emailEle);
    }

    if (phoneValue == "") {
      setError(phoneEle, "Số điện thoại không được để trống");
      isCheck = false;
    } else if (!isPhone(phoneValue)) {
      setError(phoneEle, "Số điện thoại không đúng định dạng");
      isCheck = false;
    } else {
      setSuccess(phoneEle);
    }

    if (isCheck) {
      let values = {
        name: usernameValue,
        giftname: giftNameValue,
        phone: phoneValue,
        email: emailValue,
      };
      return values;
    }

    // return isCheck;
  }

  function setSuccess(ele) {
    ele.parentNode.classList.add("success");
  }

  function setError(ele, message) {
    let parentEle = ele.parentNode;
    parentEle.classList.add("error");
    parentEle.querySelector("p").innerText = message;
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
  }
});

// animation
