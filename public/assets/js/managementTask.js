import { User } from './User.js';
import { Task } from './Task.js';
import { formatedDate, capitalize } from './utils/function.js';

const userId = User.getCurrentUser().id;

function renderTasks() {
  const tasks = Task.getAllByUserId(userId);
  
  $('#taskWrapper').empty();
  toggleEmptyState(tasks);

  const fragment = $(document.createDocumentFragment());
  tasks.forEach((task) => {
    const taskElement = getTaskElement(task);
    fragment.append(taskElement);
  });

  $('#taskWrapper').append(fragment);
}

function toggleEmptyState(tasks) {
  if (tasks.length === 0) {
    $('#taskWrapper').hide();
    $('#taskWrapperEmpty').show();
  } else {
    $('#taskWrapper').show();
    $('#taskWrapperEmpty').hide();
  }
}

function getTaskElement(task) {
  let iconSrc, iconAlt, backgroundColor;

  switch (task.project) {
    case 'sinaria':
      iconSrc = 'assets/img/icons/ghost.svg';
      iconAlt = 'ghost';
      backgroundColor = '#BDEBFF';
      break;
    case 'umbrella':
      iconSrc = 'assets/img/icons/code.svg';
      iconAlt = 'code';
      backgroundColor = '#CABDFF';
      break;
    case 'jupyter':
      iconSrc = 'assets/img/icons/bank.svg';
      iconAlt = 'bank';
      backgroundColor = '#FFD88D';
      break;
    default:
      iconSrc = 'assets/img/icons/default.svg';
      iconAlt = 'default';
      backgroundColor = '#BDEBFF';
  }

  return $(`
    <div class="flex justify-between bg-white p-5 w-full rounded-3xl" data-id="${task.id}">
      <div class="task-card flex flex-col gap-5">
        <div class="flex gap-3 items-center">
          <div class="w-[50px] h-[50px] flex shrink-0 items-center justify-center" style="background-color: ${backgroundColor}; border-radius: 50%;">
            <img src="${iconSrc}" alt="${iconAlt}">
          </div>
          <div class="flex flex-col">
            <p class="font-bold text-lg leading-[27px]">${task.name}</p>
            <p class="text-sm leading-[21px] text-taskia-grey">Created at ${formatedDate(task.createdAt)}</p>
          </div>
        </div>
        <div class="flex gap-4 font-semibold text-sm leading-[21px]">
          <div class="flex gap-1 items-center">
            <p>${task.priority}</p>
          </div>
          ${task.isCompleted 
            ? 
              `<div class="flex gap-1 items-center text-taskia-green">
                <p>Completed</p>
              </div>` 
            :
              `<div class="flex gap-1 items-center">
                <p>In Progress</p>
              </div>`
          }
        </div>
      </div>
      <div class="flex flex-row items-center gap-x-3">
        <a href="#" class="delete-task font-semibold text-taskia-red border border-taskia-red p-[12px_20px] h-12 rounded-full">Delete</a>
        <a href="#" 
          class="complete-task flex gap-[10px] 
                justify-center items-center text-white p-[12px_20px] 
                h-12 font-semibold bg-gradient-to-b from-[#977FFF] to-[#6F4FFF] 
                rounded-full w-full border border-taskia-background-grey \
                ${task.isCompleted ? 'disabled-button' : ''}" 
          ${task.isCompleted ? 'aria-disabled="true" tabindex="-1"' : ''}
        >
          Complete
        </a>
      </div>
    </div>
  `);
}

// DOM start
$(function () {
  renderTasks();

  $('#taskWrapper').on('click', '.complete-task', function (e) {
    e.preventDefault();
    
    const taskElement = $(this).closest('[data-id]');
    const taskId = taskElement.data('id');
  
    if (confirm('Are you sure you want to complete this task?')) {
      const result = Task.updateCompleted(taskId);
      if (result.success) { 
        alert(result.message);
        renderTasks(); 
      }
    }
  })

  $('#taskWrapper').on('click', '.delete-task', function (e) {
    e.preventDefault();
    const taskElement = $(this).closest('[data-id]');
    const taskId = taskElement.data('id');
  
    if (confirm('Are you sure you want to delete this task?')) {
      const result = Task.delete(taskId);
      if (result.success) {
        alert(result.message);
        renderTasks(); 
      }
    }
  })
})
