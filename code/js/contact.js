window.onload = function () {
  emailjs.init("oPtiIEoFcRXhLYOGB");

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_dy2grqi", "template_5oyyll8", this).then(
        function () {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Failed to send message. Please try again.");
        }
      );
    });
};
