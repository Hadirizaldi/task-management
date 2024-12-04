import { User } from '../User.js';
import { capitalize } from '../utils/function.js';

const username = capitalize(User.getCurrentUser().username) ?? "Guest";

// $(function () {
//   // Pastikan header sudah dimuat sebelum mengganti username
//   $('#header').on('load', function () {
//     // Ganti teks di username-show setelah header dimuat
//     $("#username-show").text(username);
//   });
// });

$(function () {
  $('#header').on('load', function() {
    $("#username-show").text(username);
  })
})