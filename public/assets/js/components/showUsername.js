import { User } from '../User.js';
import { capitalize } from '../utils/function.js';

const username = capitalize(User.getCurrentUser().username) ?? "Guest";

$(function () {
  $('#header').on('load', function() {
    $("#username-show").text(username);
  })
})