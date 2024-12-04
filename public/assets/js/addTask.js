import { Task } from './Task.js';
import { User } from './User.js';

const userId = User.getCurrentUser().id;

const resetValue = () => {
  $('#taskName').val('');
  $('#taskPriority').val('');
}

$(function () {  
  $('#taskForm').submit(function (e) {
    e.preventDefault();

    try {
      const taskName = $('#taskName').val().trim();
      const priority = $('#taskPriority').val();
      const selectedProject = $('input[name="Projects"]').filter(':checked').attr('id');
  
      if (!taskName) {
        alert("Task name cannot be empty");
        return;
      }

      const task = new Task(taskName.toLowerCase(), priority, selectedProject, userId);
      const result = Task.save(task);
      if(result.success) {
        alert(result.message);
        resetValue()
        window.location.href = "/public/tasks.html";
      } else {
        console.log('gagal simpan task');
      }

    } catch (error) {
      alert(error.message);
    }
  });
});
