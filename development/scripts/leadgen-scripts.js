function validateEmail(email) { 
  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

$(document).ready(function() {
  $("#contact").submit(function() { return false; });

  // Simple form validation
  $("#submit").on("click", function(){
    var nameval  = $("#name").val();
    var emailval  = $("#email").val();
    var mailvalid = validateEmail(emailval);
    
    if(mailvalid == false) {
      $("#email").addClass("error");
      $("#email").attr("placeholder", "Please enter a valid email");
    }
    else if(mailvalid == true){
      $("#email").removeClass("error");
    }
    
    else if(phonevalid == true){
      $("#phone").removeClass("error");
    }
    
    if(nameval < 4) {
      $("#name").addClass("error");
      $("#name").attr("placeholder", "Please enter your full name");
    }
    
  
    if(mailvalid == true) {
      // if both validate we attempt to send the e-mail
      // first we hide the submit btn so the user doesnt click twice
      $("#submit").replaceWith("<div style='color: white; font-size: 24px; text-align: center; padding-top: 15px;'>sending...</div>");
      
      $.ajax({
        type: 'POST',
        url: 'send.php',
        data: $("#contact").serialize(),
        success: function(data) {
          if(data == "true") {
            $("#contact").fadeOut("fast", function(){
              $(this).before("<p style='font-size: 25px; color: #9cffa4;'><strong>Success! Your Message has been sent. Thank you, we'll get back to you shortly.</strong></p>");
            });
          }
        },
        error: function() {
            alert("Bad submit");
        }
      });
    }
  });
});
