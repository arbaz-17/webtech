$(document).ready(function() {
    $('#product-carousel').carousel({
      interval: false
    });
  });

   

  function login1() {
  var unameinput=document.getElementById("u_name").value;
  var passinput=document.getElementById("password-field").value;
  
  if(unameinput == "arbaz" && passinput == "1122")
  {
    
    window.location.href="home.html";
    alert("Successfull");
    return true;
  }
  else{
    alert("Login Unsuccessful");

    return false;
  }


  }