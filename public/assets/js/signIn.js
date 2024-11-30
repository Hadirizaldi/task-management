import { User } from './User.js';


$(function() {

  $('#userForm').submit(function(e) {    
    e.preventDefault();

    const username = $('#username').val().trim();
    if(!username) {
      alert("Please enter a username");
      return
    }

    const user = User.signIn(username);
    if(user.success) {
      window.location.href = "/public/tasks.html";
    } else {
      alert(user.message);
    }
  })
})