const input = document.getElementById("tel");
const form = document.getElementById("form");
const TRUE_NUMBER = "+(381) 111-111-11";
const FALSE_NUMBER = "+(381) 000-000-00";

if (input) {
  IMask(input, {
    mask: "+(000) 000-000-00",
    lazy: false,
  });
}

if (form) {
  form.addEventListener("submit", validateNumber);
}

function validateNumber(e) {
  const el = e.target.elements.tel;
  e.preventDefault();
  if (el.value === FALSE_NUMBER) {
    el.parentNode.classList.add("error");
  } else if (el.value === TRUE_NUMBER) {
    el.parentNode.classList.remove("error");
    location.href = 'pin.html';
  } else {
    el.parentNode.classList.remove("error");
  }
}

