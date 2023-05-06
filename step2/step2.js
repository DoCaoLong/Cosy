const usernameEle = document.getElementById("name");
const emailEle = document.getElementById("email");
const phoneEle = document.getElementById("phone");
const giftnameEle = document.getElementById("giftname");
const fileEle = document.getElementById("image");
const btnRegister = document.getElementById("btn-register");
const inputEles = document.querySelectorAll(".input-row");

// get the name of uploaded file
$('input[type="file"]').change(function () {
  var value = $("input[type='file']").val();
  $(".js-value").text(value);
});

// validate form
function btnRegisterrr() {
  Array.from(inputEles).map((ele) => ele.classList.remove("success", "error"));
  let isValid = checkValidate();
  return isValid;
}

if (btnRegister) {
  btnRegister.addEventListener("click", function (e) {
    e.preventDefault();
    Array.from(inputEles).map((ele) =>
      ele.classList.remove("success", "error")
    );
    let isValid = checkValidate();
    if (isValid && isValid !== undefined) {
      // handle submit
      var baseUrl = "http://127.0.0.1:5500/step3/step3.html?value=";
      var url = baseUrl + encodeURIComponent(isValid.giftname);
      window.location.href = url;
      console.log(isValid);
    }
  });
}

function checkValidate() {
  let usernameValue = usernameEle.value;
  let emailValue = emailEle.value;
  let phoneValue = phoneEle.value;
  let giftNameValue = giftnameEle.value;
  let fileValue = fileEle.value;
  let isCheck = true;

  if (usernameValue == "") {
    setError(usernameEle, "Tên không được để trống");
    isCheck = false;
  } else {
    setSuccess(usernameEle);
  }

  if (giftNameValue == "") {
    setError(giftnameEle, "Tên quà tặng không được để trống");
    isCheck = false;
  } else if (giftNameValue.length > 8) {
    setError(giftnameEle, "Tên hiển thị giới hạn 8 chữ cái");
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
      image: fileValue,
    };
    return values;
  }
}

function setSuccess(ele) {
  ele.parentNode.classList.add("success");
}

function setError(ele, message) {
  let parentEle = ele.parentNode;
  parentEle.classList.add("error");
  parentEle.querySelector(".input-cosy").placeholder = message;
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isPhone(number) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}
