import { User } from './User.js';

$(function() {
  console.log("================== sign out =================");
  
  $("#btn-logout").click(function(e) {
    e.preventDefault();
    User.signOut();
    
    window.location.href = "/public/signin.html";
  })
})