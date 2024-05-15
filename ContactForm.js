const scriptURL = 'https://script.google.com/macros/s/AKfycbx68KsqREjsFGbpSrr5FciT5wezKs-fgWnXSZm0Z88JmcIgAaOpJNGv_XLkjYkv9gxAOA/exec'

const form = document.forms['Customer Contact Database']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  Swal.fire({
    position: "center-center",
    title: "Please wait a few seconed",
    showConfirmButton: false,
    timer: 1500
}).then(response => 
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Your work has been submitted",
      showConfirmButton: false,
      timer: 1500
    }))
  .then(() => { window.location.reload(); })
  .catch(error =>  Swal.fire({
    position: "center-center",
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
    footer: '<a href="#">Why do I have this issue?</a>'
  }))
 
})

function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();