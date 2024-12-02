import { Task } from './Task.js';

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

      const task = new Task(taskName, priority, selectedProject);
      const result = Task.save(task);
      if(result.success) {
        alert(result.message);
      } else {
        console.log('gagal simpan task');
      }

    } catch (error) {
      alert(error.message);
    }
  });
});