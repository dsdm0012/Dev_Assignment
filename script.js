(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Check if the form is valid
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );

    // Real-time validation on keyup for all fields
    Array.from(form.elements).forEach((field) => {
      field.addEventListener("keyup", () => {
        if (field.checkValidity()) {
          field.classList.remove("is-invalid");
        } else {
          field.classList.add("is-invalid");
        }
      });
    });

    // Validate mobile number before enabling Send OTP button
    const mobileNumberField = form.querySelector("#validationCustom06");
    const sendOTPButton = form.querySelector("#sendOTPBtn");

    mobileNumberField.addEventListener("keyup", () => {
      if (mobileNumberField.checkValidity()) {
        sendOTPButton.disabled = false;
      } else {
        sendOTPButton.disabled = true;
      }
    });
  });
})();

// Function to send OTP
function sendOTP() {
  var mobileNumber = document.getElementById("validationCustom06").value;
  // Check if mobile number is valid
  if (!mobileNumber.match(/^\d{10}$/)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  // Generate a random OTP (for demonstration)
  var otp = Math.floor(100000 + Math.random() * 900000);
  alert("Use this OTP to fill the form: " + otp);

  // Hide the "Send OTP" button and show the "Resend OTP" button
  document.getElementById("sendOTPBtn").style.display = "none";
  document.getElementById("resendOTPBtn").style.display = "inline-block";

  // Show the timer text
  document.getElementById("timerText").style.display = "block";

  // Disable the "Resend OTP" button and start the timer
  disableButtonForDuration(180);
}

// Function to resend OTP
function resendOTP() {
  var mobileNumber = document.getElementById("validationCustom06").value;
  // Check if mobile number is valid
  if (!mobileNumber.match(/^\d{10}$/)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  // Generate a random OTP (for demonstration)
  var otp = Math.floor(100000 + Math.random() * 900000);
  alert("Your OTP is: " + otp);

  // Disable the "Resend OTP" button and start the timer
  disableButtonForDuration(180);
}

// Function to disable the button for a certain duration
function disableButtonForDuration(durationInSeconds) {
  var minutes = Math.floor(durationInSeconds / 60);
  var seconds = durationInSeconds % 60;

  // Ensure minutes are displayed with two digits
  var formattedMinutes = (minutes < 10 ? "0" : "") + minutes;

  var timerInterval = setInterval(function () {
    document.getElementById("timerText").textContent =
      "Resend in " +
      formattedMinutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;

    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    }
    if (minutes < 0) {
      clearInterval(timerInterval);
      document.getElementById("resendOTPBtn").disabled = false;
      document.getElementById("timerText").style.display = "none";
    }
  }, 1000);
}

// Function to handle OTP verification and enable/disable submit button
document
  .getElementById("validationCustom07")
  .addEventListener("input", function () {
    var otpInput = this.value;
    var submitButton = document.getElementById("submitButton");
    var submitButton1 = document.getElementById("submitButton1");
    var resendButton = document.getElementById("resendOTPBtn");
    var timerText = document.getElementById("timerText");
    var sendButton = document.getElementById("sendOTPBtn1");
    var invalidFeedback = document.querySelector(".invalid-feedback");

    // For demonstration, assuming OTP length is 6 characters
    if (otpInput.length === 6) {
      submitButton1.style.display = "none";
      resendButton.style.display = "none";
      timerText.style.display = "none";
      sendButton.style.display = "inline-block";
      // Show the submitButton only when correct OTP is entered
      submitButton.style.display = "inline-block";
      submitButton.disabled = false;
      invalidFeedback.style.display = "none";
    } else {
      submitButton1.style.display = "inline-block";
      submitButton1.disabled = true;
      submitButton.style.display = "none";
      invalidFeedback.style.display = "block";
    }
  });

// Function to handle form submission after OTP verification
document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const form = document.getElementById("franchiseForm");

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }
    // Proceed to thank you note if all conditions met
    document.getElementById("form").style.display = "none";
    document.querySelector(".thankyoufeedback").style.display = "block";
  });
