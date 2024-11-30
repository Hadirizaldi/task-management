import { User } from './User.js';

$(function() {
  $("#userForm").submit(function(e) {
    e.preventDefault();
    
    const inputUsername = $("#username").val().trim();
    if(!inputUsername) {
      alert("Please enter a username");
      return
    }

    let user = new User(inputUsername);
    user.save();
  });
})