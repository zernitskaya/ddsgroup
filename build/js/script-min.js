const input=document.getElementById("tel"),form=document.getElementById("form"),TRUE_NUMBER="+(381) 111-111-11",FALSE_NUMBER="+(381) 000-000-00";function validateNumber(e){const t=e.target.elements.tel;e.preventDefault(),t.value===FALSE_NUMBER?t.parentNode.classList.add("error"):t.value===TRUE_NUMBER?(t.parentNode.classList.remove("error"),location.href="pin.html"):t.parentNode.classList.remove("error")}input&&IMask(input,{mask:"+(000) 000-000-00",lazy:!1}),form&&form.addEventListener("submit",validateNumber);