import { User } from './User.js';

$(function() {
  $("#btn-logout").click(function(e) {
    e.preventDefault();
    User.signOut();

    window.location.href = "/public/signin.html";
  })
})